import { Injectable } from '@angular/core';
import { action, NgxsDataRepository, StateRepository } from '@ngxs-labs/data';
import { State } from '@ngxs/store';
import { bind } from 'bind-decorator';
import { ObservableInput, ObservedValueOf, OperatorFunction } from 'rxjs';
import { pluck, publishReplay, refCount, switchMap } from 'rxjs/operators';

import { AggregateResult, Filter, ListResult } from '../../models/data';
import { DataSourceService } from '../../services/data-source/data-source.service';


/** Default values for filters. */
export const DEFAULT_FILTER: Filter = {
  sex: 'Both',
  ageRange: [1, 110],
  bmiRange: [13, 83],
  tmc: [],
  technologies: [],
  ontologyTerms: []
};

/**
 * Helper operator that combines querying with sharing and replay functionality.
 *
 * @param query The data query function.
 * @returns The combined pipe operator function.
 */
function queryData<T, O extends ObservableInput<unknown>>(
  query: (value: T, index: number) => O
): OperatorFunction<T, ObservedValueOf<O>> {
  return source => source.pipe(
    switchMap(query),
    publishReplay(1),
    refCount()
  );
}


/** Store data state. */
export interface DataStateModel {
  /** Current filter. */
  filter: Filter;
}


/**
 * Data state repository and service.
 */
@StateRepository()
@State<DataStateModel>({
  name: 'data',
  defaults: {
    filter: DEFAULT_FILTER
  }
})
@Injectable()
export class DataState extends NgxsDataRepository<DataStateModel> {
  /** Current filter. */
  readonly filter$ = this.state$.pipe(pluck('filter'));
  /** Latest list query data. */
  readonly listData$ = this.filter$.pipe(queryData(this.listData));
  /** Latest aggregate query data. */
  readonly aggregateData$ = this.filter$.pipe(queryData(this.aggregateData));

  /**
   * Creates an instance of data state.
   *
   * @param source Data query service.
   */
  constructor(private source: DataSourceService) {
    super();
  }

  /**
   * Updates the current filter.
   *
   * @param filter Changes to be made to the current filter.
   */
  @action()
  updateFilter(filter: Partial<Filter>): void {
    this.patchState({
      // Might need to do a deep compare of current and new filter
      filter: Object.assign({}, this.getState().filter, filter)
    });
  }

  /**
   * Queries for list data.
   *
   * @param filter The filter used during query.
   * @returns The result of the query.
   */
  @bind
  private listData(filter: Filter): ObservableInput<ListResult[]> {
    return this.source.getListResults(filter);
  }

  /**
   * Queries for aggregate data.
   *
   * @param filter The filter used during query.
   * @returns The result of the query.
   */
  @bind
  private aggregateData(filter: Filter): ObservableInput<AggregateResult[]> {
    return this.source.getAggregateResults(filter);
  }
}
