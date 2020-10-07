import { Injectable } from '@angular/core';
import { Computed, DataAction, StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsImmutableDataRepository } from '@ngxs-labs/data/repositories';
import { State } from '@ngxs/store';
import { VisibilityItem } from '../../models/visibility-item';
import { ExtractionSet } from '../../models/extraction-set';
import { combineLatest, Observable } from 'rxjs';
import { filter, pluck, switchMap } from 'rxjs/operators';
import { DataSourceService } from '../../services/data-source/data-source.service';
import { OrganInfo } from '../../../shared/components/organ-selector/organ-selector.component';


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
  /** Sex if applicable */
  sex?: 'male' | 'female';
  /** Side if applicable */
  side?: 'left' | 'right';
  /** Block size */
  blockSize: XYZTriplet;
  /** Model rotation */
  rotation: XYZTriplet;
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
    sex: 'male',
    side: 'left',
    blockSize: { x: 10, y: 10, z: 10 },
    rotation: { x: 0, y: 0, z: 0 },
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
  /** Slice configuration observable */
  readonly slicesConfig$ = this.state$.pipe(pluck('slicesConfig'));
  /** View type observable */
  readonly viewType$ = this.state$.pipe(pluck('viewType'));
  /** View side observable */
  readonly viewSide$ = this.state$.pipe(pluck('viewSide'));
  /** Organ observable */
  readonly organ$ = this.state$.pipe(pluck('organ'));
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

  constructor(private dataSourceService: DataSourceService) {
    super();
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

  /**
   * Gets the reference organ's IRI based on the current state
   */
  @Computed()
  get organIri$(): Observable<string> {
    return combineLatest([this.organ$, this.sex$, this.side$]).pipe(
      switchMap(([organ, sex, side]) =>
        this.dataSourceService.getReferenceOrganIri(organ?.name || '', sex, side) as Observable<string>
      ),
      filter((iri) => !!iri)
    );
  }

  private async onOrganIriChange(): Promise<void> {
    const iri = await this.dataSourceService.getReferenceOrganIri(
      this.snapshot.organ?.name || '', this.snapshot.sex, this.snapshot.side
    ).toPromise();

    if (iri) {
      const db = await this.dataSourceService.getDB();
      const structures = (db.anatomicalStructures[iri] || []).map((entity) => ({
        id: entity['@id'],
        name: entity.label,
        visible: true,
        opacity: 100,
        tooltip: entity.comment
      } as VisibilityItem));
      this.setAnatomicalStructures(structures);

      const sets = (db.extractionSets[iri] || []).map((set) => ({
        name: set.label,
        sites: set.extractionSites.map((entity) => ({
          id: entity['@id'],
          name: entity.label,
          visible: false,
          opacity: 100,
          tooltip: entity.comment
        } as VisibilityItem))
      } as ExtractionSet));
      this.setExtractionSets(sets);
      this.setExtractionSites(sets.length > 0 ? sets[0].sites : []);
    }
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
