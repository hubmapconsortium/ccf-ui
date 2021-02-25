import { Inject, Injectable } from '@angular/core';
import { StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsImmutableDataRepository } from '@ngxs-labs/data/repositories';
import { State } from '@ngxs/store';
import { SpatialSceneNode } from 'ccf-body-ui';
import { ExtractionSet, SpatialEntity } from 'ccf-database';
import { GlobalsService } from 'ccf-shared';

import { environment } from '../../../../environments/environment';
import { GlobalConfig, GLOBAL_CONFIG } from '../../services/config/config';


export interface ReferenceDataStateModel {
  organIRILookup: {[lookup: string]: string};
  organSpatialEntities: {[iri: string]: SpatialEntity};
  anatomicalStructures: {[iri: string]: SpatialEntity[]};
  extractionSets: {[iri: string]: ExtractionSet[]};
  sceneNodeLookup: {[iri: string]: SpatialSceneNode};
  simpleSceneNodeLookup: {[iri: string]: SpatialSceneNode};
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

  constructor(private readonly globals: GlobalsService,
              @Inject(GLOBAL_CONFIG) private readonly globalConfig: GlobalConfig) {
    super();
  }

  /**
   * Initializes this state service.
   */
  ngxsOnInit(): void {
    super.ngxsOnInit();

    this.getSourceDB().then((db) => {
      this.setState(db);

      // In development, make the db globally accessible
      if (!environment.production) {
        this.globals.set('db', db);
      }
    });
  }

  private getSourceDB(): Promise<ReferenceDataStateModel> {
    const baseHref = this.globalConfig.baseHref || '';
    return fetch(baseHref + 'assets/reference-organ-data.json').then(r => r.json());
  }

  /**
   * Looks up an IRI for a potential reference organ.
   *
   * @param organ the organ
   * @param sex the sex: male, female, or undefined
   * @param side the side: left, right, or undefined
   * @returns An IRI if there is a reference organ for this state, otherwise undefined
   */
  getReferenceOrganIri(organ: string, sex?: 'Male' | 'Female' | string, side?: 'Left' | 'Right' | string): string|undefined {
    const db = this.snapshot;
    if (organ.toUpperCase() !== 'KIDNEY') {
      side = '';
    }
    if (organ.toUpperCase() === 'LARGE INTESTINE') {
      organ = 'Colon';
    }
    const lookup = [organ, sex, side].join('|').toUpperCase();
    const key = Object.keys(db.organIRILookup).find((code) => code.toUpperCase().endsWith(lookup));
    return key ? db.organIRILookup[key] : undefined;
  }
}
