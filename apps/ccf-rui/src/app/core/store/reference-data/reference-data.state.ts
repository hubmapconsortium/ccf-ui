import { Immutable } from '@angular-ru/common/typings';
import { Injectable } from '@angular/core';
import { Matrix4, toRadians } from '@math.gl/core';
import { StateRepository } from '@angular-ru/ngxs/decorators';
import { NgxsImmutableDataRepository } from '@angular-ru/ngxs/repositories';
import { State } from '@ngxs/store';
import { SpatialPlacementJsonLd, SpatialSceneNode } from 'ccf-body-ui';
import { ExtractionSet, SpatialEntity } from 'ccf-database';
import { ALL_ORGANS, GlobalConfigState, GlobalsService, OrganInfo } from 'ccf-shared';
import { EMPTY, from, Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { GlobalConfig } from '../../services/config/config';
import { XYZTriplet } from '../model/model.state';


/* eslint-disable @typescript-eslint/member-ordering */

export function applySpatialPlacement(tx: Matrix4, placement: Immutable<SpatialPlacementJsonLd>): Matrix4 {
  const p = placement;
  let factor: number;
  switch (p.translation_units) {
    case 'centimeter':
      factor = 1 / 100;
      break;
    case 'millimeter':
      factor = 1 / 1000;
      break;
    case 'meter':
    default:
      factor = 1;
      break;
  }
  const T = [p.x_translation, p.y_translation, p.z_translation].map(t => t * factor);
  const R = [p.x_rotation, p.y_rotation, p.z_rotation].map<number>(toRadians) as [number, number, number];
  const S = [p.x_scaling, p.y_scaling, p.z_scaling];

  return tx.translate(T).rotateXYZ(R).scale(S);
}

export interface ReferenceDataStateModel {
  organIRILookup: { [lookup: string]: string };
  organSpatialEntities: { [iri: string]: SpatialEntity };
  anatomicalStructures: { [iri: string]: SpatialEntity[] };
  extractionSets: { [iri: string]: ExtractionSet[] };
  sceneNodeLookup: { [iri: string]: SpatialSceneNode };
  simpleSceneNodeLookup: { [iri: string]: SpatialSceneNode };
  placementPatches: { [iri: string]: SpatialPlacementJsonLd };
}

export interface OrganData {
  organ: OrganInfo;
  sex?: 'male' | 'female';
  side?: 'left' | 'right';
}

/**
 * Data for the main 3d model display
 */
@StateRepository()
@State<ReferenceDataStateModel>({
  name: 'reference',
  defaults: {
    organIRILookup: {},
    organSpatialEntities: {},
    anatomicalStructures: {},
    extractionSets: {},
    sceneNodeLookup: {},
    simpleSceneNodeLookup: {},
    placementPatches: {}
  }
})
@Injectable()
export class ReferenceDataState extends NgxsImmutableDataRepository<ReferenceDataStateModel> {

  constructor(
    private readonly globals: GlobalsService,
    private globalConfig: GlobalConfigState<GlobalConfig>
  ) {
    super();
  }

  /**
   * Initializes this state service.
   */
  ngxsOnInit(): void {
    super.ngxsOnInit();

    this.getSourceDB().subscribe(db => {
      this.setState(db);

      // In development, make the db globally accessible
      if (!environment.production) {
        this.globals.set('db', db);
      }
    });
  }

  private getSourceDB(): Observable<ReferenceDataStateModel> {
    return this.globalConfig.getOption('baseHref').pipe(
      map(baseHref => (baseHref ?? '') + 'assets/reference-organ-data.json'),
      switchMap(url => from(fetch(url)).pipe(
        switchMap(data => data.json()),
        catchError(() => EMPTY)
      ))
    );
  }

  normalizePlacement(place: SpatialPlacementJsonLd): SpatialPlacementJsonLd {
    const db = this.snapshot;
    const patchPlacement = db.placementPatches[place?.target];
    if (patchPlacement) {
      const matrix = applySpatialPlacement(new Matrix4(Matrix4.IDENTITY), patchPlacement);
      const position: XYZTriplet = { x: place.x_translation, y: place.y_translation, z: place.z_translation };
      const [x, y, z] = matrix.transformAsPoint([ position.x, position.y, position.z ], []);
      const newPlacement = { ...place, target: patchPlacement.target };
      newPlacement.x_translation = x;
      newPlacement.y_translation = y;
      newPlacement.z_translation = z;
      return newPlacement;
    } else {
      return place;
    }
  }

  /**
   * Looks up an IRI for a potential reference organ.
   *
   * @param organ the organ
   * @param sex the sex: male, female, or undefined
   * @param side the side: left, right, or undefined
   * @returns An IRI if there is a reference organ for this state, otherwise undefined
   */
  getReferenceOrganIri(organ: string, sex?: 'Male' | 'Female' | string, side?: 'Left' | 'Right' | string, organInfo?: OrganInfo): string | undefined {
    const db = this.snapshot;
    if (organ.toUpperCase() !== 'KIDNEY') {
      side = '';
    }
    if (organInfo?.sex) {
      sex = organInfo.sex;
    }
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const lookup = [organ, sex, side || organInfo?.side].join('|').toUpperCase();
    const key = Object.keys(db.organIRILookup).find((code) => code.toUpperCase().endsWith(lookup));
    return this.getLatestIri(key ? db.organIRILookup[key] : undefined);
  }

  /**
   * Looks up organ information from an IRI
   *
   * @param iri The IRI
   * @returns A populated organ data if the IRI is valid, otherwise undefined
   */
  getOrganData(iri: string): OrganData | undefined {
    const updatedIri = this.getLatestIri(iri);
    const state = this.snapshot;
    const entity = state.organSpatialEntities[updatedIri];
    if (!entity) {
      return undefined;
    }

    const name = entity.label ?? '';
    const organ = ALL_ORGANS.find(info => name.endsWith(info.organ) && (!entity.side || entity.side.toLowerCase() === info.side));
    if (!organ) {
      return undefined;
    }

    return {
      organ,
      sex: entity.sex?.toLowerCase() as 'male' | 'female',
      side: entity.side?.toLowerCase() as 'left' | 'right'
    };
  }

  private getLatestIri(organ?: string): string {
    if (!organ) {
      return '';
    }
    const organEntry = this.snapshot.placementPatches[organ];
    return organEntry ? this.getLatestIri(organEntry.target) : organ;
  }
}
