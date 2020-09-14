import { Injectable } from '@angular/core';
import { DataAction, StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsImmutableDataRepository } from '@ngxs-labs/data/repositories';
import { State } from '@ngxs/store';
import { pluck } from 'rxjs/operators';
import { VisibilityItem } from '../../models/visibility-item';


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
  organ: string;
  /** Gender if applicable */
  gender?: 'male' | 'female';
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
    organ: '',
    gender: undefined,
    side: undefined,
    blockSize: { x: 10, y: 10, z: 10 },
    rotation: { x: 0, y: 0, z: 0 },
    slicesConfig: { thickness: NaN, numSlices: NaN },
    viewType: 'register',
    viewSide: 'anterior',
    showPrevious: false,
    extractionSites: [
      {id: 1, name: 'Left atrium, appendage', visible: false},
      {id: 2, name: 'Left atrium, PV inflow', visible: false},
      {id: 3, name: 'Left ventricle, apex', visible: false},
      {id: 4, name: 'Left ventricle, free wall 3cm from apex', visible: false},
      {id: 5, name: 'Septum, 3cm from apex including LAD', visible: false},
      {id: 6, name: 'Posterior, adjacent to coronary sinus', visible: false},
      {id: 7, name: 'Right atrium appendage', visible: false},
      {id: 8, name: 'Right atrium, AV(atrioventricular) node', visible: false},
      {id: 9, name: 'Right atrium, SA(sinoatrial) node', visible: false},
      {id: 10, name: 'Right ventricle, free wall 3cm from apex', visible: false}
    ],
    anatomicalStructures: [
      {id: 1, name: 'Structure A', visible: false, opacity: 100},
      {id: 2, name: 'Structure B', visible: false, opacity: 100},
      {id: 3, name: 'Structure C', visible: false, opacity: 100}
    ]
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
  /** Gender observable */
  readonly gender$ = this.state$.pipe(pluck('gender'));
  /** Side observable */
  readonly side$ = this.state$.pipe(pluck('side'));
  /** Show previous observable */
  readonly showPrevious$ = this.state$.pipe(pluck('showPrevious'));
  /** Extraction sites observable */
  readonly extractionSites$ = this.state$.pipe(pluck('extractionSites'));
  /** Anatomical structures observable */
  readonly anatomicalStructures$ = this.state$.pipe(pluck('anatomicalStructures'));

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
   * Updates the organ
   *
   * @param organ Name of the organ
   */
  @DataAction()
  setOrgan(organ: string): void {
    this.ctx.patchState({ organ });
  }

  /**
   * Updates the gender
   *
   * @param [gender] The new gender
   */
  @DataAction()
  setGender(gender?: 'male' | 'female'): void {
    this.ctx.patchState({ gender });
  }

  /**
   * Updates the side
   *
   * @param [side] The new side
   */
  @DataAction()
  setSide(side?: 'left' | 'right'): void {
    this.ctx.patchState({ side });
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
    this.patchState({ extractionSites });
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
}
