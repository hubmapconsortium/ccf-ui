import { Injectable } from '@angular/core';
import { SpatialSceneNode } from 'ccf-body-ui';
import { ExtractionSet, SpatialEntity } from 'ccf-database';
import { GlobalsService } from 'ccf-shared';
import { from, Observable, of } from 'rxjs';

import { environment } from '../../../../environments/environment';


export interface ReferenceOrganDatabase {
  organIRILookup: {[lookup: string]: string};
  anatomicalStructures: {[iri: string]: SpatialEntity[]};
  extractionSets: {[iri: string]: ExtractionSet[]};
  sceneNodeLookup: {[iri: string]: SpatialSceneNode};
}


/**
 * Backend data queries.
 */
@Injectable({
  providedIn: 'root'
})
export class DataSourceService {
  /** The underlying 'database'. */
  private dbPromise: Promise<ReferenceOrganDatabase>;

  /**
   * Creates an instance of data source service.
   */
  constructor(globals: GlobalsService) {
      // In development, make the db globally accessible
    if (!environment.production) {
      this.getDB().then(db => globals.set('db', db));
    }
  }

  /**
   * Gets a reference to the database.
   *
   * @returns A promise that resolves to the database when ready.
   */
  getDB(): Promise<ReferenceOrganDatabase> {
    if (!this.dbPromise) {
      this.dbPromise = fetch('assets/reference-organ-data.json').then(r => r.json());
    }
    return this.dbPromise;
  }

  /**
   * Looks up an IRI for a potential reference organ.
   *
   * @param organ the organ
   * @param sex the sex: male, female, or undefined
   * @param side the side: left, right, or undefined
   * @returns An IRI if there is a reference organ for this state, otherwise undefined
   */
  getReferenceOrganIri(organ: string, sex?: 'Male' | 'Female' | string, side?: 'Left' | 'Right' | string): Observable<string|undefined> {
    if (!organ || organ.length === 0) {
      return of(undefined);
    } else {
      return from(this.getDB().then((db: ReferenceOrganDatabase) => {
        if (organ.toUpperCase() !== 'KIDNEY') {
          side = '';
        }
        const lookup = [organ, sex, side].join('|').toUpperCase();
        const key = Object.keys(db.organIRILookup).find((code) => code.toUpperCase().endsWith(lookup));
        const iri = key ? db.organIRILookup[key] : undefined;
        return iri;
      }));
    }
  }

  /**
   * Queries for all available Extraction Sets for a Reference Organ.
   *
   * @param [iri] The reference organ's id (iri/@id).
   * @returns An observable emitting the results.
   */
  getExtractionSets(iri: string): Observable<ExtractionSet[]> {
    return from(this.getDB().then((db: ReferenceOrganDatabase) => db.extractionSets[iri]));
  }

  /**
   * Queries for all available Anatomical Structures for a Reference Organ.
   *
   * @param [iri] The reference organ's id (iri/@id).
   * @returns An observable emitting the results.
   */
  getAnatomicalStructures(iri: string): Observable<SpatialEntity[]> {
    return from(this.getDB().then((db: ReferenceOrganDatabase) => db.anatomicalStructures[iri]));
  }
}
