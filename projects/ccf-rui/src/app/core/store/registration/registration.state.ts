import { Immutable } from '@angular-ru/common/typings';
import { Injectable, Injector } from '@angular/core';
import { Computed, DataAction, StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsImmutableDataRepository } from '@ngxs-labs/data/repositories';
import { State } from '@ngxs/store';
import { insertItem, patch } from '@ngxs/store/operators';
import { SpatialEntityJsonLd, SpatialPlacementJsonLd } from 'ccf-body-ui';
import { GlobalConfigState } from 'ccf-shared';
import { saveAs } from 'file-saver';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, pluck, switchMap, take, tap, timeoutWith } from 'rxjs/operators';
import { v4 as uuidV4 } from 'uuid';

import { Tag } from '../../models/anatomical-structure-tag';
import { MetaData } from '../../models/meta-data';
import { GlobalConfig } from '../../services/config/config';
import { AnatomicalStructureTagState } from '../anatomical-structure-tags/anatomical-structure-tags.state';
import { ModelState, ModelStateModel, XYZTriplet } from '../model/model.state';
import { PageState, PageStateModel } from '../page/page.state';
import { ReferenceDataState } from '../reference-data/reference-data.state';

/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */

/**
 * Registration state model
 */
export interface RegistrationStateModel {
  /** Whether to use the registration callback function */
  useRegistrationCallback: boolean;
  /** Whether or not to display user registration errors */
  displayErrors: boolean;
  /** Previous registrations */
  registrations: Record<string, unknown>[];
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
      map(([page, model]) => this.buildMetadata(page, model, this.tags.latestTags))
    );
  }

  /** Observable of registration data in jsonld format */
  @Computed()
  get jsonld$(): Observable<Record<string, unknown>> {
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
  get previousRegistrations$(): Observable<Record<string, unknown>[]> {
    const { globalConfig, state$ } = this;
    const regs = state$.pipe(pluck('registrations'));
    const fetched = globalConfig.config$.pipe(
      pluck('fetchPreviousRegistrations'),
      timeoutWith(1000, of(undefined)),
      switchMap(fetch => fetch?.() ?? [[]])
    );

    return combineLatest([regs, fetched]).pipe(
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
    return new Date().toISOString().split('T')[0];
  }

  /** Reference to the page state */
  private page: PageState;

  /** Reference to the model state */
  private model: ModelState;

  /** Reference to the AS Tag state */
  private tags: AnatomicalStructureTagState;

  /** Reference to the reference data state */
  private refData: ReferenceDataState;

  /**
   * Creates an instance of registration state.
   *
   * @param injector Injector service used to lazy load page and model state
   * @param globalConfig The global configuration
   */
  constructor(
    private readonly injector: Injector,
    private readonly globalConfig: GlobalConfigState<GlobalConfig>
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
    this.refData = this.injector.get(ReferenceDataState);

    this.globalConfig.config$.pipe(
      take(1),
      tap(({ useDownload, register }) => this.ctx.patchState({
        useRegistrationCallback: !!(!useDownload && register)
      }))
    ).subscribe();
  }

  ngxsAfterBootstrap(): void {
    super.ngxsAfterBootstrap();

    this.globalConfig.getProperty(['editRegistration']).pipe(
      take(1),
      filter(reg => !!reg),
      tap(reg => this.editRegistration(reg as SpatialEntityJsonLd))
    ).subscribe();
  }

  async editRegistration(reg: SpatialEntityJsonLd): Promise<void> {
    const place = Array.isArray(reg.placement) ? reg.placement[0] : reg.placement as SpatialPlacementJsonLd;
    const data = this.refData.getOrganData(place.target);

    this.page.setUserName({firstName: reg.creator_first_name, lastName: reg.creator_last_name});

    if (data) {
      this.model.setOrgan(data.organ);
      if (data.sex) {
        this.model.setSex(data.sex);
      }
      if (data.side) {
        this.model.setSide(data.side);
      }
    }

    this.model.setBlockSize({x: reg.x_dimension, y: reg.y_dimension, z: reg.z_dimension});
    this.model.setRotation({x: place.x_rotation, y: place.y_rotation, z: place.z_rotation});
    this.model.setSlicesConfig({thickness: reg.slice_thickness || NaN, numSlices: reg.slice_count || NaN});

    await new Promise(r => setTimeout(r, 1000));

    this.model.setPosition({x: place.x_translation, y: place.y_translation, z: place.z_translation});
    const iris = new Set<string>(reg.ccf_annotations);
    this.tags.addTags(
      this.model.snapshot.anatomicalStructures
      .filter(item => iris.has(item.id as string))
      .map((item) => ({id: item.id, label: item.name, type: 'added'}))
    );
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
   *
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
  addRegistration(registration: Record<string, unknown>): void {
    this.ctx.setState(patch<Immutable<RegistrationStateModel>>({
      registrations: insertItem(registration as Immutable<Record<string, unknown>>)
    }));
  }

  isDataValid(page: Immutable<PageStateModel>, model: Immutable<ModelStateModel>): boolean {
    const requiredValues = [
      page.user.firstName,
      page.user.lastName,
      model.organ.src,
      model.organ.name,
      model.organ.organ
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
      globalConfig: { snapshot: { register: registrationCallback } },
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
    model: Immutable<ModelStateModel>,
    tags: Tag[]
  ): MetaData {
    const data: MetaData = [];

    if (!page.registrationCallbackSet) {
      data.push(
        { label: 'First Name', value: page.user.firstName },
        { label: 'Last Name', value: page.user.lastName }
      );
    }

    data.push(
      { label: 'Reference Organ Name', value: model.organ.name },
      { label: 'Tissue Block Dimensions (mm)', value: this.xyzTripletToString(model.blockSize) },
      { label: 'Tissue Block Position (mm)', value: this.xyzTripletToString(model.position) },
      { label: 'Tissue Block Rotation', value: this.xyzTripletToString(model.rotation) },
      { label: 'Anatomical Structure Tags', value: tags.map(t => t.label).join(', ') },
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
  ): Record<string, unknown> {
    return {
      '@context': 'https://hubmapconsortium.github.io/hubmap-ontology/ccf-context.jsonld',
      '@id': `http://purl.org/ccf/1.5/${this.currentIdentifier}`,
      '@type': 'SpatialEntity',
      label: model.label || undefined,
      creator: `${page.user.firstName} ${page.user.lastName}`,
      creator_first_name: page.user.firstName,
      creator_last_name: page.user.lastName,
      // creator_orcid: data.alignment_operator_orcid,
      creation_date: this.currentDate,
      ccf_annotations: tags.map(tag => tag.id),
      slice_thickness: model.slicesConfig?.thickness || undefined,
      slice_count: model.slicesConfig?.numSlices || undefined,

      x_dimension: +model.blockSize.x.toFixed(3),
      y_dimension: +model.blockSize.y.toFixed(3),
      z_dimension: +model.blockSize.z.toFixed(3),
      dimension_units: 'millimeter',

      placement: {
        '@context': 'https://hubmapconsortium.github.io/hubmap-ontology/ccf-context.jsonld',
        '@id': `http://purl.org/ccf/1.5/${this.currentIdentifier}_placement`,
        '@type': 'SpatialPlacement',
        target: model.organIri as string,
        placement_date: this.currentDate,

        x_scaling: 1, y_scaling: 1, z_scaling: 1, scaling_units: 'ratio',

        x_rotation: +model.rotation.x.toFixed(3),
        y_rotation: +model.rotation.y.toFixed(3),
        z_rotation: +model.rotation.z.toFixed(3),
        rotation_order: 'XYZ',
        rotation_units: 'degree',

        x_translation: +model.position.x.toFixed(3),
        y_translation: +model.position.y.toFixed(3),
        z_translation: +model.position.z.toFixed(3),
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
    return `${Math.round(xyz.x)}, ${Math.round(xyz.y)}, ${Math.round(xyz.z)}`;
  }
}
