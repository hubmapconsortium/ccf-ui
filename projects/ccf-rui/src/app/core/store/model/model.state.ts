import { Computed, DataAction, StateRepository } from '@angular-ru/ngxs/decorators';
import { NgxsImmutableDataRepository } from '@angular-ru/ngxs/repositories';
import { Injectable, Injector } from '@angular/core';
import { State } from '@ngxs/store';
import { ALL_ORGANS, GlobalConfigState, OrganInfo } from 'ccf-shared';
import { filterNulls } from 'ccf-shared/rxjs-ext/operators';
import { sortBy } from 'lodash';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { EMPTY, Observable } from 'rxjs';
import { delay, distinct, distinctUntilChanged, filter, map, skipUntil, switchMap, tap, throttleTime } from 'rxjs/operators';

import { ExtractionSet } from '../../models/extraction-set';
import { VisibilityItem } from '../../models/visibility-item';
import { GlobalConfig, OrganConfig } from '../../services/config/config';
import { PageState } from '../page/page.state';
import { ReferenceDataState } from '../reference-data/reference-data.state';


/* eslint-disable @typescript-eslint/member-ordering */

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

/**
 * All organs to be displayed
 */
export const RUI_ORGANS = ALL_ORGANS;

/**
 * Data for the main 3d model display
 */
@StateRepository()
@State<ModelStateModel>({
  name: 'model',
  defaults: {
    id: '',
    label: '',
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    organ: { src: '', name: '' } as OrganInfo,
    organIri: '',
    organDimensions: { x: 90, y: 90, z: 90 },
    sex: 'male',
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
  /** Identifier observable */
  readonly id$ = this.state$.pipe(map(x => x?.id), distinct());
  /** Block size observable */
  readonly blockSize$ = this.state$.pipe(map(x => x?.blockSize), distinct());
  /** Rotation observable */
  readonly rotation$ = this.state$.pipe(map(x => x?.rotation), distinct());
  /** Position observable */
  readonly position$ = this.state$.pipe(map(x => x?.position), distinct());
  /** Slice configuration observable */
  readonly slicesConfig$ = this.state$.pipe(map(x => x?.slicesConfig), distinct());
  /** View type observable */
  readonly viewType$ = this.state$.pipe(map(x => x?.viewType), distinct());
  /** View side observable */
  readonly viewSide$ = this.state$.pipe(map(x => x?.viewSide), distinct());
  /** Organ observable */
  readonly organ$ = this.state$.pipe(map(x => x?.organ), distinct());
  /** Organ IRI observable */
  readonly organIri$ = this.state$.pipe(map(x => x?.organIri), distinct());
  /** Organ IRI observable */
  readonly organDimensions$ = this.state$.pipe(map(x => x?.organDimensions), distinct());
  /** Sex observable */
  readonly sex$ = this.state$.pipe(map(x => x?.sex), distinct());
  /** Side observable */
  readonly side$ = this.state$.pipe(map(x => x?.side), distinct());
  /** Show previous observable */
  readonly showPrevious$ = this.state$.pipe(map(x => x?.showPrevious), distinct());
  /** Extraction sites observable */
  readonly extractionSites$ = this.state$.pipe(map(x => x?.extractionSites), distinct());
  /** Anatomical structures observable */
  readonly anatomicalStructures$ = this.state$.pipe(map(x => x?.anatomicalStructures), distinct());
  /** Extraction sets observable */
  readonly extractionSets$ = this.state$.pipe(map(x => x?.extractionSets), distinct());

  @Computed()
  get modelChanged$(): Observable<void> {
    const ignoredKeys = ['viewType', 'viewSide', 'showPrevious'];
    const keys = Object.keys(this.initialState)
      .filter(key => !ignoredKeys.includes(key));

    return this.state$.pipe(
      throttleTime(0, undefined, { leading: false, trailing: true }),
      distinctUntilChanged((v1, v2) => {
        for (const key of keys) {
          if (v1[key] !== v2[key]) {
            return false;
          }
        }

        return true;
      }),
      map(() => undefined)
    );
  }

  /** Reference to the reference data state */
  private referenceData: ReferenceDataState;

  private page: PageState;

  /**
   * Creates an instance of model state.
   *
   * @param injector Injector service used to lazy load reference data state
   */
  constructor(
    private readonly ga: GoogleAnalyticsService,
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

    this.referenceData = this.injector.get(ReferenceDataState);
    this.page = this.injector.get(PageState);

    this.referenceData.state$.subscribe(() => this.onReferenceDataChange());
  }

  idMatches(ontologyId?: string, organSide?: string): OrganInfo | undefined {
    return ALL_ORGANS.find((o) =>
      ontologyId && o.id === ontologyId ? (o.side ? o.side === organSide : true) : false
    );
  }

  nameMatches(organName: string, organSide?: string): OrganInfo | undefined {
    return ALL_ORGANS.find((o) =>
      o.side ? o.organ.toLowerCase() === organName && o.side === organSide : o.organ.toLowerCase() === organName
    );
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
    this.ga.event('placement', `${this.snapshot.organ?.name}_placement`, `${position.x.toFixed(1)}_${position.y.toFixed(1)}_${position.z.toFixed(1)}`);
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

  @Computed()
  get defaultPosition(): XYZTriplet {
    const dims = this.snapshot.organDimensions;
    const block = this.snapshot.blockSize;
    return { x: dims.x + 2 * block.x, y: dims.y / 2, z: dims.z / 2 };
  }

  /**
   * Updates the organ
   *
   * @param organ Name of the organ
   */
  @DataAction()
  setOrgan(organ: OrganInfo): void {
    if (organ) {
      this.ga.event('organ_select', 'organ', organ.name);
      this.ctx.patchState({ organ });
      if (organ.side) {
        this.ctx.patchState({ side: organ.side });
      } else {
        this.ctx.patchState({ side: undefined });
      }
      this.onOrganIriChange();
    }
  }

  /**
   * Sets position and rotation to default
   */
  @DataAction()
  setOrganDefaults(): void {
    this.ctx.patchState({
      position: this.defaultPosition,
      rotation: { x: 0, y: 0, z: 0 }
    });
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
   *
   * @param visible the visible state to pass along to setShowPrevious()
   * @param previousItems visibilityItems to set anatomical structures
   */
  toggleRegistrationBlocksVisibility(visible: boolean, previousItems: VisibilityItem[]): void {
    this.setShowPrevious(visible);

    if (!visible) {
      this.setAnatomicalStructures(previousItems);
    } else {
      const newStructures = previousItems.map(structure => ({
        ...structure, opacity: Math.min(20, structure.opacity ?? 20)
      }));
      this.setAnatomicalStructures(newStructures);
    }
  }

  private onOrganIriChange(): void {
    const organIri = this.referenceData.getReferenceOrganIri(
      this.snapshot.organ?.organ || '', this.snapshot.sex, this.snapshot.side, this.snapshot.organ
    );
    const organDimensions: XYZTriplet = { x: 100, y: 100, z: 100 };

    if (this.snapshot.organ?.sex) {
      this.ctx.patchState({ sex: this.snapshot.organ?.sex });
    }

    if (organIri) {
      const db = this.referenceData.snapshot;
      const asLookup: { [id: string]: VisibilityItem } = {};
      for (const entity of (db.anatomicalStructures[organIri] || [])) {
        const iri = entity.representation_of ?? entity['@id'];
        if (!asLookup[iri]) {
          asLookup[iri] = {
            id: entity.representation_of ?? entity['@id'],
            name: entity.label!,
            visible: true,
            opacity: 20,
            tooltip: entity.comment
          };
        }
      }
      this.ctx.patchState({ anatomicalStructures: [{ id: 'all', name: 'all anatomical structures', opacity: 20, visible: true }, ...Object.values(asLookup)] });

      const sets: ExtractionSet[] = (db.extractionSets[organIri] || []).map((set) => ({
        name: set.label,
        sites: [{ id: 'all', name: 'all landmarks', visible: true, opacity: 0 }].concat(sortBy(set.extractionSites.map((entity) => ({
          id: entity['@id'],
          name: entity.label!,
          visible: true,
          opacity: 0,
          tooltip: entity.comment
        })), 'name'))
      }));
      this.ctx.patchState({ extractionSets: sets });
      this.ctx.patchState({ extractionSites: sets.length > 0 ? sets[0].sites : [] });

      const spatialEntity = db.organSpatialEntities[organIri];
      organDimensions.x = spatialEntity.x_dimension;
      organDimensions.y = spatialEntity.y_dimension;
      organDimensions.z = spatialEntity.z_dimension;
    }

    this.ctx.patchState({ organIri, organDimensions });
  }

  private onReferenceDataChange(): void {
    this.globalConfig.getOption('organ').pipe(
      filterNulls(),
      delay(0),
      switchMap(organ => this.onOrganChange(organ))
    ).subscribe();

    this.modelChanged$.pipe(
      skipUntil(this.page.registrationStarted$.pipe(
        filter(started => started),
      ))
    ).subscribe(() => this.page.setHasChanges());
  }

  private onOrganChange(organ: string | OrganConfig): Observable<unknown> {
    let organInfo: OrganInfo | undefined;
    let organSex: 'male' | 'female';
    if (typeof organ === 'string') {
      const organData = this.referenceData.getOrganData(organ);
      organSex = organData?.sex?.toLowerCase() as 'male' | 'female';
      organInfo = organData?.organ;
    } else {
      const organName = organ.name.toLowerCase();
      const organSide = organ.side;
      const ontologyId = organ.ontologyId;
      organSex = organ.sex?.toLowerCase() as 'male' | 'female';
      // check for an id match
      organInfo = this.idMatches(ontologyId, organSide);
      // if no id matches, check for a name match
      if (!organInfo) {
        organInfo = this.nameMatches(organName, organSide);
      }
    }

    if (organInfo) {
      this.ctx.patchState({
        organ: organInfo,
        sex: organSex,
        side: organInfo?.side?.toLowerCase() as 'left' | 'right'
      });
      return this.referenceData.state$.pipe(
        tap(() => this.onOrganIriChange())
      );
    }

    return EMPTY;
  }
}
