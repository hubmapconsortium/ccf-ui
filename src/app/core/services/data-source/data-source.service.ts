import { Injectable } from '@angular/core';
import { AggregateResult, CCFDatabase, CCFDatabaseOptions, Filter, ImageViewerData, ListResult } from 'ccf-database';
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
  /** Indicator of when the database is ready. */
  private _afterConnected: Promise<unknown>;

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
        this.dbOptions = {...this.dbOptions, ...globalThis.dbOptions} as CCFDatabaseOptions;
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
  private async getDB(): Promise<Remote<CCFDatabase> | CCFDatabase> {
    if (!this._afterConnected) {
      this._afterConnected = this.dataSource.connect(this.dbOptions);
    }
    await this._afterConnected;
    return this.dataSource;
  }

  /**
   * Queries for list values.
   *
   * @param [filter] Currently applied filter.
   * @returns An observable emitting the results.
   */
  getListResults(filter?: Filter): Observable<ListResult[]> {
    return from(this.getDB().then((db) => db.getListResults(filter)));
  }

  /**
   * Queries for aggregate values.
   *
   * @param [filter] Currently applied filter.
   * @returns An observable emitting the results.
   */
  getAggregateResults(filter?: Filter): Observable<AggregateResult[]> {
    return from(this.getDB().then((db) => db.getAggregateResults(filter)));
  }

  /**
   * Queries data for a specific image.
   *
   * @param iri The image identifier ('@id').
   * @returns An observable emitting the result.
   */
  getImageViewerData(iri: string): Observable<ImageViewerData> {
    return from(this.getDB().then((db) => db.getImageViewerData(iri)));
  }
}
