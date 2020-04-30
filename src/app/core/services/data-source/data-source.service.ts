import { Injectable } from '@angular/core';
import { ObservableInput, of } from 'rxjs';

import { AggregateResult, DataSource, Filter, ImageViewerData, ListResult } from '../../models/data';


/**
 * Backend data queries.
 */
@Injectable({
  providedIn: 'root'
})
export class DataSourceService implements DataSource {
  /**
   * Queries for list values.
   *
   * @param [filter] Currently applied filter.
   * @returns An observable emitting the results.
   */
  getListResults(filter?: Filter): ObservableInput<ListResult[]> {
    return of([]);
  }

  /**
   * Queries for aggregate values.
   *
   * @param [filter] Currently applied filter.
   * @returns An observable emitting the results.
   */
  getAggregateResults(filter?: Filter): ObservableInput<AggregateResult[]> {
    return of([]);
  }

  /**
   * Queries data for a specific image.
   *
   * @param id The image identifier.
   * @returns An observable emitting the result.
   */
  getImageViewerData(id: string): ObservableInput<ImageViewerData> {
    return of({ id, metadata: { } });
  }
}
