import { Inject, Injectable, Injector } from '@angular/core';
import { Computed, DataAction, StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsImmutableDataRepository } from '@ngxs-labs/data/repositories';
import { State } from '@ngxs/store';
import { sortBy } from 'lodash';
import { pluck } from 'rxjs/operators';

import { OrganInfo } from '../../../../../../ccf-shared/src/lib/components/organ-selector/organ-selector.component';
import { ExtractionSet } from '../../models/extraction-set';
import { VisibilityItem } from '../../models/visibility-item';
import { GlobalConfig, GLOBAL_CONFIG } from '../../services/config/config';
import { ReferenceDataState } from '../reference-data/reference-data.state';


/** A object with x, y, and z channels of the same type. */
export interface XYZTriplet<T = number> {
  /** X channel */
  x: T;
  /** Y channel */
  y: T;
  /** Z channel */
  z: T;
}

/** Slices configuration */
export interface SlicesConfig {
  /** Thickness of slice */
  thickness: number;
  /** Number of slices per block */
  numSlices: number;
}

/** Model view type */
export type ViewType = 'register' | '3d';

/** Side which the model is viewed from */
export type ViewSide = 'left' | 'right' | 'anterior' | 'posterior';

/** Data contained in the stage state. */
export interface ModelStateModel {
  /** Model identifier */
  id: string;
  /** Model label */
  label: string;
  /** Organ name */
  organ: OrganInfo;
  /** Reference Organ IRI */
  organIri?: string;
  /** Reference Organ Dimensions */
  organDimensions: XYZTriplet;
  /** Sex if applicable */
  sex?: 'male' | 'female';
  /** Side if applicable */
  side?: 'left' | 'right';
  /** Block size */
  blockSize: XYZTriplet;
  /** Model rotation */
  rotation: XYZTriplet;
  /** Model position */
  position: XYZTriplet;
  /** Slice configuration */
  slicesConfig: SlicesConfig;
  /** View type */
  viewType: ViewType;
  /** View side */
  viewSide: ViewSide;
  /** Whether previous registration blocks are visible */
  showPrevious: boolean;
  /** Possible extraction sites */
  extractionSites: VisibilityItem[];
  /** Anatomical structures for the organ */
  anatomicalStructures: VisibilityItem[];
  /** Extraction sets */
  extractionSets: ExtractionSet[];
}

// export const ALL_ORGANS: OrganInfo[] = [
//   { src: 'app:colon', name: 'Colon', hasSides: false, hasSex: true },
//   { src: 'app:heart', name: 'Heart', hasSides: false, hasSex: true },
//   { src: 'app:kidney', name: 'Kidney', hasSides: true, hasSex: true },
//   { src: 'app:spleen', name: 'Spleen', hasSides: false, hasSex: true },
//   { src: 'app:bladder', name: 'Bladder', disabled: true, hasSides: false, hasSex: true },
//   { src: 'app:brain', name: 'Brain', disabled: true, hasSides: false, hasSex: true },
//   { src: 'app:liver', name: 'Liver', disabled: true, hasSides: false, hasSex: true },
//   { src: 'app:lung', name: 'Lung', disabled: true, hasSides: true, hasSex: true },
//   { src: 'app:lymph_nodes', name: 'Lymph Nodes', disabled: true, hasSides: false, hasSex: true },
//   { src: 'app:ovaries', name: 'Ovaries', disabled: true, hasSides: true, hasSex: false },
//   { src: 'app:small_intestine', name: 'Small Intestine', disabled: true, hasSides: false, hasSex: true },
//   { src: 'app:stomach', name: 'Stomach', disabled: true, hasSides: false, hasSex: true },
//   { src: 'app:thymus', name: 'Thymus', disabled: true, hasSides: false, hasSex: true }
// ];

/**
 * Data for the main 3d model display
 */
@StateRepository()
@State<ModelStateModel>({
  name: 'model',
  defaults: {
    id: '',
    label: '',
    organ: { src: '', name: '' } as OrganInfo,
    organIri: '',
    organDimensions: { x: 90, y: 90, z: 90 },
    sex: 'male',
    side: 'left',
    blockSize: { x: 10, y: 10, z: 10 },
    rotation: { x: 0, y: 0, z: 0 },
    position: { x: 0, y: 0, z: 0 },
    slicesConfig: { thickness: NaN, numSlices: NaN },
    viewType: 'register',
    viewSide: 'anterior',
    showPrevious: false,
    extractionSites: [],
    anatomicalStructures: [],
    extractionSets: []
  }
})
@Injectable()
export class ModelState extends NgxsImmutableDataRepository<ModelStateModel> {
  /** Block size observable */
  readonly blockSize$ = this.state$.pipe(pluck('blockSize'));
  /** Rotation observable */
  readonly rotation$ = this.state$.pipe(pluck('rotation'));
  /** Position observable */
  readonly position$ = this.state$.pipe(pluck('position'));
  /** Slice configuration observable */
  readonly slicesConfig$ = this.state$.pipe(pluck('slicesConfig'));
  /** View type observable */
  readonly viewType$ = this.state$.pipe(pluck('viewType'));
  /** View side observable */
  readonly viewSide$ = this.state$.pipe(pluck('viewSide'));
  /** Organ observable */
  readonly organ$ = this.state$.pipe(pluck('organ'));
  /** Organ IRI observable */
  readonly organIri$ = this.state$.pipe(pluck('organIri'));
  /** Organ IRI observable */
  readonly organDimensions$ = this.state$.pipe(pluck('organDimensions'));
  /** Sex observable */
  readonly sex$ = this.state$.pipe(pluck('sex'));
  /** Side observable */
  readonly side$ = this.state$.pipe(pluck('side'));
  /** Show previous observable */
  readonly showPrevious$ = this.state$.pipe(pluck('showPrevious'));
  /** Extraction sites observable */
  readonly extractionSites$ = this.state$.pipe(pluck('extractionSites'));
  /** Anatomical structures observable */
  readonly anatomicalStructures$ = this.state$.pipe(pluck('anatomicalStructures'));
  /** Extraction sets observable */
  readonly extractionSets$ = this.state$.pipe(pluck('extractionSets'));

  /** Reference to the reference data state */
  private referenceData: ReferenceDataState;

  /**
   * Creates an instance of model state.
   *
   * @param injector Injector service used to lazy load reference data state
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

    this.referenceData = this.injector.get(ReferenceDataState);
  }

  ngxsAfterBootstrap(): void {
    super.ngxsAfterBootstrap();

    if (this.globalConfig.organ) {
      const organConfig = this.globalConfig.organ;
      let organName = organConfig.name.toLowerCase();
      if (organName === 'large intestine') {
        organName = 'colon';
      }
      const organInfo = ALL_ORGANS.find((o) => o.name.toLowerCase() === organName);
      if (organInfo) {
        setTimeout(() => {
          this.ctx.patchState({
            organ: organInfo,
            sex: organConfig.sex?.toLowerCase() as 'male' | 'female',
            side: organConfig.side?.toLowerCase() as 'left' | 'right'
          });
          this.onOrganIriChange();
        }, 1000);
      }
    }
  }

  /**
   * Updates the block size
   *
   * @param blockSize The new block size values
   */
  @DataAction()
  setBlockSize(blockSize: XYZTriplet): void {
    this.ctx.patchState({ blockSize });
  }

  /**
   * Updates the rotation
   *
   * @param rotation The new rotation values
   */
  @DataAction()
  setRotation(rotation: XYZTriplet): void {
    this.ctx.patchState({ rotation });
  }

  /**
   * Updates the position
   *
   * @param position The new position values
   */
  @DataAction()
  setPosition(position: XYZTriplet): void {
    this.ctx.patchState({ position });
  }

  /**
   * Updates the slice configuration
   *
   * @param slicesConfig The new slice configuration
   */
  @DataAction()
  setSlicesConfig(slicesConfig: SlicesConfig): void {
    this.ctx.patchState({ slicesConfig });
  }

  /**
   * Updates the view type
   *
   * @param viewType the new view type
   */
  @DataAction()
  setViewType(viewType: ViewType): void {
    this.ctx.patchState({ viewType });
  }

  /**
   * Updates the view side
   *
   * @param viewSide The side to view
   */
  @DataAction()
  setViewSide(viewSide: ViewSide): void {
    this.ctx.patchState({ viewSide });
  }

  @DataAction()
  private onOrganIriChange(): void {
    const organIri = this.referenceData.getReferenceOrganIri(
      this.snapshot.organ?.name || '', this.snapshot.sex, this.snapshot.side
    );
    const organDimensions: XYZTriplet = {x: 100, y: 100, z: 100};

    if (organIri) {
      const db = this.referenceData.snapshot;
      const asLookup: { [id: string]: VisibilityItem} = {};
      for (const entity of (db.anatomicalStructures[organIri] || [])) {
        const iri = entity.representation_of || entity['@id'];
        if (!asLookup[iri]) {
          asLookup[iri] = {
            id: entity.representation_of || entity['@id'],
            name: entity.label,
            visible: true,
            opacity: 100,
            tooltip: entity.comment
          } as VisibilityItem;
        }
      }
      this.setAnatomicalStructures(Object.values(asLookup));

      const sets = (db.extractionSets[organIri] || []).map((set) => ({
        name: set.label,
        sites: sortBy(set.extractionSites.map((entity) => ({
          id: entity['@id'],
          name: entity.label,
          visible: false,
          opacity: 100,
          tooltip: entity.comment
        } as VisibilityItem)), 'name')
      } as ExtractionSet));
      this.setExtractionSets(sets);
      this.setExtractionSites(sets.length > 0 ? sets[0].sites : []);

      const spatialEntity = db.organSpatialEntities[organIri];
      organDimensions.x = spatialEntity.x_dimension;
      organDimensions.y = spatialEntity.y_dimension;
      organDimensions.z = spatialEntity.z_dimension;
    }

    this.ctx.patchState({ organIri, organDimensions });
    this.ctx.patchState({ position: this.defaultPosition });
  }

  @Computed()
  get defaultPosition(): XYZTriplet {
    const dims = this.snapshot.organDimensions;
    const block = this.snapshot.blockSize;
    return {x: dims.x + 2 * block.x, y: dims.y / 2, z: dims.z / 2};
  }

  /**
   * Updates the organ
   *
   * @param organ Name of the organ
   */
  @DataAction()
  setOrgan(organ: OrganInfo): void {
    this.ctx.patchState({ organ });
    this.onOrganIriChange();
  }

  /**
   * Updates the sex
   *
   * @param [sex] The new sex
   */
  @DataAction()
  setSex(sex?: 'male' | 'female'): void {
    this.ctx.patchState({ sex });
    this.onOrganIriChange();
  }

  /**
   * Updates the side
   *
   * @param [side] The new side
   */
  @DataAction()
  setSide(side?: 'left' | 'right'): void {
    this.ctx.patchState({ side });
    this.onOrganIriChange();
  }

  /**
   * Updates show previous
   *
   * @param showPrevious Whether to show
   */
  @DataAction()
  setShowPrevious(showPrevious: boolean): void {
    this.ctx.patchState({ showPrevious });
  }

  /**
   * Updates extraction sites
   *
   * @param extractionSites New array of items
   */
  @DataAction()
  setExtractionSites(extractionSites: VisibilityItem[]): void {
    this.ctx.patchState({ extractionSites });
  }

  /**
   * Updates anatomical structures
   *
   * @param anatomicalStructures New array of items
   */
  @DataAction()
  setAnatomicalStructures(anatomicalStructures: VisibilityItem[]): void {
    this.ctx.patchState({ anatomicalStructures });
  }

  /**
   * Updates extraction sets
   *
   * @param extractionSets New array of extraction sets
   */
  @DataAction()
  setExtractionSets(extractionSets: ExtractionSet[]): void {
    this.ctx.patchState({ extractionSets });
  }

/**
 * Toggles registration blocks visibility and handles anatomical structures
 * opacity changes accordingly
 * @param visible the visible state to pass along to setShowPrevious()
 * @param previousItems visibilityItems to set anatomical structures
 */
toggleRegistrationBlocksVisibility(visible: boolean, previousItems: VisibilityItem[]): void {
    this.setShowPrevious(visible);

    if (!visible) {
      this.setAnatomicalStructures(previousItems);
    } else {
      const newStructures = previousItems.map(structure => {
        return { ...structure, opacity: Math.min(20, structure.opacity || 20) };
      });
      this.setAnatomicalStructures(newStructures);
    }
  }
}
