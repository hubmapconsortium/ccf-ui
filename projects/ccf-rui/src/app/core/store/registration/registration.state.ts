import { Injectable, Injector } from '@angular/core';
import { Computed, StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsImmutableDataRepository } from '@ngxs-labs/data/repositories';
import { Immutable } from '@ngxs-labs/data/typings';
import { State } from '@ngxs/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { v4 as uuidV4 } from 'uuid';

import { MetaData } from '../../models/meta-data';
import { ModelState, ModelStateModel, XYZTriplet } from '../model/model.state';
import { PageState, PageStateModel } from '../page/page.state';


/**
 * Registration state model
 */
// tslint:disable-next-line: no-empty-interface
export interface RegistrationStateModel {
}


/**
 * Data for model registrations
 */
@StateRepository()
@State<RegistrationStateModel>({
  name: 'registration',
  defaults: {}
})
@Injectable()
export class RegistrationState extends NgxsImmutableDataRepository<RegistrationStateModel> {
  /** Reference to the page state */
  private page: PageState;

  /** Reference to the model state */
  private model: ModelState;

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
      map(data => this.buildJsonLd(...data))
    );
  }

  /**
   * Creates an instance of registration state.
   *
   * @param injector Injector service used to lazy load page and model state
   */
  constructor(private readonly injector: Injector) {
    super();
  }

  /**
   * Initializes this state service
   */
  ngxsOnInit(): void {
    super.ngxsOnInit();

    // Injecting page and model states in the constructor breaks things!?
    // Lazy load here
    this.page = this.injector.get(PageState);
    this.model = this.injector.get(ModelState);
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
    model: Immutable<ModelStateModel>
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
      ccf_annotations: [],

      x_dimension: model.blockSize.x,
      y_dimension: model.blockSize.y,
      z_dimension: model.blockSize.z,
      dimension_units: 'millimeter',

      placement: {
        '@context': 'https://hubmapconsortium.github.io/hubmap-ontology/ccf-context.jsonld',
        '@id': `http://purl.org/ccf/0.5/${this.currentIdentifier}_placement`,
        '@type': 'SpatialPlacement',
        target: model.id,
        placement_date: this.currentDate,

        // x_scaling: 1, y_scaling: 1, z_scaling: 1, scaling_units: 'ratio',

        x_rotation: model.rotation.x,
        y_rotation: model.rotation.y,
        z_rotation: model.rotation.z,
        rotation_order: 'XYZ',
        rotation_units: 'degree',

        // x_translation: T.x, y_translation: T.y, z_translation: T.z, translation_units: 'millimeter'
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
