import { Injectable } from '@angular/core';
import { AggregateResult, CCFDatabase, Filter, ImageViewerData, ListResult, CCFDatabaseOptions } from 'ccf-database';
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
  dataSource: Remote<CCFDatabase> | CCFDatabase;
  dbOptions: CCFDatabaseOptions;
  private _afterConnected: Promise<unknown>;

  constructor() {
    if (typeof Worker !== 'undefined') {
      const worker = new Worker('./data-source.worker', { type: 'module' });
      this.dataSource = wrap(worker);
    } else {
      this.dataSource = new CCFDatabase();
    }
    this.dbOptions = environment.dbOptions as CCFDatabaseOptions;

    if (!environment.production) {
      ((globalThis as unknown) as {db: Remote<CCFDatabase> | CCFDatabase}).db = this.dataSource;
    }
  }

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
