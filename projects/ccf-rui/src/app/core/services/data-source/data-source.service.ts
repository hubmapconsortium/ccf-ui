import { Injectable } from '@angular/core';
import { AggregateResult, CCFDatabase, CCFDatabaseOptions, ExtractionSet, SpatialEntity } from 'ccf-database';
import { Remote, wrap } from 'comlink';
import { from, Observable } from 'rxjs';

import { environment } from './../../../../environments/environment';


/**
 * Backend data queries.
 */
@Injectable({
  providedIn: 'root'
})
export class DataSourceService {
  /** The underlying database. */
  dataSource: Remote<CCFDatabase> | CCFDatabase;
  /** Database initialization options. */
  dbOptions: CCFDatabaseOptions;

  /**
   * Creates an instance of data source service.
   */
  constructor() {
    if (typeof Worker !== 'undefined' && !environment.disableDbWorker) {
      const worker = new Worker('./data-source.worker', { type: 'module' });
      this.dataSource = wrap(worker);
    } else {
      this.dataSource = new CCFDatabase();
    }
    this.dbOptions = environment.dbOptions as CCFDatabaseOptions;

    if (typeof globalThis === 'object') {
      // If a global dbOptions object is set, use this for connecting to the db
      if (globalThis.dbOptions) {
        this.dbOptions = { ...this.dbOptions, ...globalThis.dbOptions } as CCFDatabaseOptions;
      }

      // In development, make the db globally accessible
      if (!environment.production) {
        ((globalThis as unknown) as { db: Remote<CCFDatabase> | CCFDatabase }).db = this.dataSource;
      }
    }
  }

  /**
   * Gets a reference to the database.
   *
   * @returns A promise that resolves to the database when ready.
   */
  async getDB(): Promise<Remote<CCFDatabase> | CCFDatabase> {
    await this.dataSource.connect(this.dbOptions);
    return this.dataSource;
  }

  /**
   * Queries for all available Reference Organs.
   *
   * @returns An observable emitting the results.
   */
  getReferenceOrgans(): Observable<SpatialEntity[]> {
    return from(this.getDB().then((db: CCFDatabase) => db.scene.getReferenceOrgans()));
  }

  /**
   * Queries for all available Extraction Sets for a Reference Organ.
   *
   * @param [iri] The reference organ's id (iri/@id).
   * @returns An observable emitting the results.
   */
  getExtractionSets(iri: string): Observable<ExtractionSet[]> {
    return from(this.getDB().then((db: CCFDatabase) => db.scene.getExtractionSets(iri)));
  }

  /**
   * Queries for all available Anatomical Structures for a Reference Organ.
   *
   * @param [iri] The reference organ's id (iri/@id).
   * @returns An observable emitting the results.
   */
  getAnatomicalStructures(iri: string): Observable<SpatialEntity[]> {
    return from(this.getDB().then((db: CCFDatabase) => db.scene.getAnatomicalStructures(iri)));
  }
}
