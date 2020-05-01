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

  constructor() {
    if (typeof Worker !== 'undefined') {
      const worker = new Worker('./data-source.worker', { type: 'module' });
      this.dataSource = wrap(worker);
    } else {
      this.dataSource = new CCFDatabase();
    }

    const db = this.dataSource;
    const options = environment.dbOptions as CCFDatabaseOptions;
    db.connect(options);

    if (!environment.production) {
      ((globalThis as unknown) as {db: Remote<CCFDatabase> | CCFDatabase}).db = db;
    }
  }

  /**
   * Queries for list values.
   *
   * @param [filter] Currently applied filter.
   * @returns An observable emitting the results.
   */
  getListResults(filter?: Filter): Observable<ListResult[]> {
    return from(this.dataSource.getListResults(filter));
  }

  /**
   * Queries for aggregate values.
   *
   * @param [filter] Currently applied filter.
   * @returns An observable emitting the results.
   */
  getAggregateResults(filter?: Filter): Observable<AggregateResult[]> {
    return from(this.dataSource.getAggregateResults(filter));
  }

  /**
   * Queries data for a specific image.
   *
   * @param iri The image identifier ('@id').
   * @returns An observable emitting the result.
   */
  getImageViewerData(iri: string): Observable<ImageViewerData> {
    return from(this.dataSource.getImageViewerData(iri));
  }
}
