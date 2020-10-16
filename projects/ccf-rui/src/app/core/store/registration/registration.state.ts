import { Inject, Injectable, Injector } from '@angular/core';
import { Computed, DataAction, StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsImmutableDataRepository } from '@ngxs-labs/data/repositories';
import { Immutable } from '@ngxs-labs/data/typings';
import { State } from '@ngxs/store';
import { insertItem, patch } from '@ngxs/store/operators';
import { saveAs } from 'file-saver';
import { combineLatest, Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { v4 as uuidV4 } from 'uuid';

import { Tag } from '../../models/anatomical-structure-tag';
import { MetaData } from '../../models/meta-data';
import { GlobalConfig, GLOBAL_CONFIG } from '../../services/config/config';
import { AnatomicalStructureTagState } from '../anatomical-structure-tags/anatomical-structure-tags.state';
import { ModelState, ModelStateModel, XYZTriplet } from '../model/model.state';
import { PageState, PageStateModel } from '../page/page.state';


/**
 * Registration state model
 */
export interface RegistrationStateModel {
  /** Whether to use the registration callback function */
  useRegistrationCallback: boolean;
  /** Whether or not to display user registration errors */
  displayErrors: boolean;
  /** Previous registrations */
  registrations: object[];
}


/**
 * Data for model registrations
 */
@StateRepository()
@State<RegistrationStateModel>({
  name: 'registration',
  defaults: {
    useRegistrationCallback: false,
    displayErrors: false,
    registrations: []
  }
})
@Injectable()
export class RegistrationState extends NgxsImmutableDataRepository<RegistrationStateModel> {
  readonly displayErrors$ = this.state$.pipe(pluck('displayErrors'));

  /** Observable of registration metadata */
  @Computed()
  get metadata$(): Observable<MetaData> {
    return combineLatest([this.page.state$, this.model.state$]).pipe(
      map(data => this.buildMetadata(...data))
    );
  }

  /** Observable of registration data in jsonld format */
  @Computed()
  get jsonld$(): Observable<object> {
    return combineLatest([this.page.state$, this.model.state$]).pipe(
      map(([page, model]) => this.buildJsonLd(page, model, this.tags.latestTags))
    );
  }

  @Computed()
  get valid$(): Observable<boolean> {
    return combineLatest([this.page.state$, this.model.state$]).pipe(
      map(data => this.isValid)
    );
  }

  /**
   * Observable of previous registrations
   */
  @Computed()
  get previousRegistrations$(): Observable<object[]> {
    const { globalConfig: { fetchPreviousRegistrations }, state$ } = this;
    return combineLatest([
      state$.pipe(pluck('registrations')),
      fetchPreviousRegistrations?.() ?? [[]]
    ]).pipe(
      map(([local, external]) => [...local, ...external])
    );
  }

  /** Current uuid identifier used when registering */
  @Computed()
  private get currentIdentifier(): string {
    return uuidV4();
  }

  /** Time of last modification to registration data */
  @Computed()
  private get currentDate(): string {
    return new Date().toISOString();
  }

  /** Reference to the page state */
  private page: PageState;

  /** Reference to the model state */
  private model: ModelState;

  /** Reference to the AS Tag state */
  private tags: AnatomicalStructureTagState;

  /**
   * Creates an instance of registration state.
   *
   * @param injector Injector service used to lazy load page and model state
   * @param globalConfig The global configuration
   */
  constructor(
    private readonly injector: Injector,
    @Inject(GLOBAL_CONFIG) private readonly globalConfig: GlobalConfig
  ) {
    super();
  }

  /**
   * Initializes this state service.
   */
  ngxsOnInit(): void {
    super.ngxsOnInit();

    // Injecting page and model states in the constructor breaks things!?
    // Lazy load here
    this.page = this.injector.get(PageState);
    this.model = this.injector.get(ModelState);
    this.tags = this.injector.get(AnatomicalStructureTagState);

    const { globalConfig: { useDownload, register } } = this;
    this.ctx.patchState({
      useRegistrationCallback: !!(!useDownload && register)
    });
  }

  /**
   * Sets whether to use the registration callback function or download.
   *
   * @param use True to use the callback, false to download
   */
  @DataAction()
  setUseRegistrationCallback(use: boolean): void {
    this.ctx.patchState({ useRegistrationCallback: use });
  }

  /**
   * Set's whether or not we should display the user's registration errors
   * @param displayErrors the value to set it to
   */
  @DataAction()
  setDisplayErrors(displayErrors: boolean): void {
    this.ctx.patchState({ displayErrors });
  }

  /**
   * Adds an entry to the previous registrations
   *
   * @param registration The new entry
   */
  @DataAction()
  addRegistration(registration: object): void {
    this.ctx.setState(patch<Immutable<RegistrationStateModel>>({
      registrations: insertItem(registration)
    }));
  }

  isDataValid(page: Immutable<PageStateModel>, model: Immutable<ModelStateModel>): boolean {
    const requiredValues = [
      page.user.firstName,
      page.user.lastName,
      model.organ.src,
      model.organ.name
    ];

    return requiredValues.every(value => !!value);
  }

  @Computed()
  get isValid(): boolean {
    return this.isDataValid(this.page.snapshot, this.model.snapshot);
  }

  /**
   * Registers or downloads json data.
   *
   * @param [useCallback] Explicit override selecting the register/download action
   */
  register(useCallback?: boolean): void {
    if (!this.isValid) {
      return;
    }

    const {
      globalConfig: { register: registrationCallback },
      page, model, snapshot
    } = this;
    const jsonObj = this.buildJsonLd(page.snapshot, model.snapshot, this.tags.latestTags);
    const json = JSON.stringify(jsonObj, undefined, 2);

    if (useCallback || (useCallback === undefined && snapshot.useRegistrationCallback)) {
      registrationCallback?.(json);
    } else {
      const data = new Blob([json], {
        type: 'application/json',
        endings: 'native'
      });

      saveAs(data, 'registration-data.json');
    }

    this.addRegistration(jsonObj);
    this.setDisplayErrors(false);
  }

  /**
   * Builds a metadata array from the specified data.
   *
   * @param page The current page state data
   * @param model The current model state data
   * @returns metadata An array of label-value objects
   */
  private buildMetadata(
    page: Immutable<PageStateModel>,
    model: Immutable<ModelStateModel>
  ): MetaData {
    const data: MetaData = [];

    if (!page.embedded) {
      data.push(
        { label: 'First Name', value: page.user.firstName },
        { label: 'Last Name', value: page.user.lastName }
      );
    }

    data.push(
      { label: 'Reference Organ Name', value: '' }, // FIXME: Is this the same as the jsonld label?
      { label: 'Tissue Block Size (mm)', value: this.xyzTripletToString(model.blockSize) },
      { label: 'Tissue Block Position (mm)', value: '' }, // TODO: Add when available
      { label: 'Tissue Block Rotation', value: this.xyzTripletToString(model.rotation) },
      { label: 'Extraction Site(s)', value: 'Bisection line' }, // TODO: Add to state
      { label: 'Anatomical Structure Tags', value: 'Tag 1, Tag 2, Tag 3' }, // TODO: Add to state
      { label: 'Time Stamp', value: this.currentDate },
      { label: 'Alignment ID', value: this.currentIdentifier }
    );

    return data;
  }

  /**
   * Converts the registration data into jsonld format.
   *
   * @param page The current page state data
   * @param model The current model state data
   * @returns A jsonld object
   */
  private buildJsonLd(
    page: Immutable<PageStateModel>,
    model: Immutable<ModelStateModel>,
    tags: Tag[]
  ): object {
    return {
      '@context': 'https://hubmapconsortium.github.io/hubmap-ontology/ccf-context.jsonld',
      '@id': `http://purl.org/ccf/0.5/${this.currentIdentifier}`,
      '@type': 'SpatialEntity',
      label: model.label || undefined,
      creator: `${page.user.firstName} ${page.user.lastName}`,
      creator_first_name: page.user.firstName,
      creator_last_name: page.user.lastName,
      // creator_orcid: data.alignment_operator_orcid,
      creation_date: this.currentDate,
      ccf_annotations: tags.map(tag => tag.id),

      x_dimension: model.blockSize.x,
      y_dimension: model.blockSize.y,
      z_dimension: model.blockSize.z,
      dimension_units: 'millimeter',

      placement: {
        '@context': 'https://hubmapconsortium.github.io/hubmap-ontology/ccf-context.jsonld',
        '@id': `http://purl.org/ccf/1.5/${this.currentIdentifier}_placement`,
        '@type': 'SpatialPlacement',
        target: model.organIri as string,
        placement_date: this.currentDate,

        x_scaling: 1, y_scaling: 1, z_scaling: 1, scaling_units: 'ratio',

        x_rotation: model.rotation.x,
        y_rotation: model.rotation.y,
        z_rotation: model.rotation.z,
        rotation_order: 'XYZ',
        rotation_units: 'degree',

        x_translation: model.position.x,
        y_translation: model.position.y,
        z_translation: model.position.z,
        translation_units: 'millimeter'
      }
    };
  }

  /**
   * Format a XYZTriplet as a string.
   *
   * @param xyz The triplet values
   * @returns The string representation
   */
  private xyzTripletToString(xyz: XYZTriplet): string {
    return `${xyz.x}, ${xyz.y}, ${xyz.z}`;
  }
}
