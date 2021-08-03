import { Injectable } from '@angular/core';
import { StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsImmutableDataRepository } from '@ngxs-labs/data/repositories';
import { State } from '@ngxs/store';
import { SpatialSceneNode } from 'ccf-body-ui';
import { ExtractionSet, SpatialEntity } from 'ccf-database';
import { ALL_ORGANS, GlobalConfigState, GlobalsService, OrganInfo } from 'ccf-shared';
import { Observable } from 'rxjs';
import { map, pluck, switchMap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { GlobalConfig } from '../../services/config/config';

/* eslint-disable @typescript-eslint/member-ordering */

export interface ReferenceDataStateModel {
  organIRILookup: { [lookup: string]: string };
  organSpatialEntities: { [iri: string]: SpatialEntity };
  anatomicalStructures: { [iri: string]: SpatialEntity[] };
  extractionSets: { [iri: string]: ExtractionSet[] };
  sceneNodeLookup: { [iri: string]: SpatialSceneNode };
  simpleSceneNodeLookup: { [iri: string]: SpatialSceneNode };
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
    simpleSceneNodeLookup: {}
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
    return this.globalConfig.state$.pipe(
      pluck('baseHref'),
      map(baseHref => (baseHref ?? '') + 'assets/reference-organ-data.json'),
      switchMap(url => fetch(url)),
      switchMap(data => data.json())
    );
  }

  /**
   * Looks up an IRI for a potential reference organ.
   *
   * @param organ the organ
   * @param sex the sex: male, female, or undefined
   * @param side the side: left, right, or undefined
   * @returns An IRI if there is a reference organ for this state, otherwise undefined
   */
  getReferenceOrganIri(organ: string, sex?: 'Male' | 'Female' | string, side?: 'Left' | 'Right' | string): string | undefined {
    const db = this.snapshot;
    if (organ.toUpperCase() !== 'KIDNEY' && organ.toUpperCase() !== 'LYMPH NODE') {
      side = '';
    }
    if (organ.toUpperCase() === 'LARGE INTESTINE') {
      organ = 'Colon';
    }
    const lookup = [organ, sex, side].join('|').toUpperCase();
    const key = Object.keys(db.organIRILookup).find((code) => code.toUpperCase().endsWith(lookup));
    return key ? db.organIRILookup[key] : undefined;
  }

  /**
   * Looks up organ information from an IRI
   *
   * @param iri The IRI
   * @returns A populated organ data if the IRI is valid, otherwise undefined
   */
  getOrganData(iri: string): OrganData | undefined {
    const state = this.snapshot;
    const entity = state.organSpatialEntities[iri];
    if (!entity) {
      return undefined;
    }

    const name = entity.label || '';
    const organ = ALL_ORGANS.find(info => name.endsWith(info.organ));
    if (!organ) {
      return undefined;
    }

    return {
      organ,
      sex: entity.sex?.toLowerCase() as 'male' | 'female',
      side: entity.side?.toLowerCase() as 'left' | 'right'
    };
  }
}
