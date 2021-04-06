/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { DataAction, Payload, StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsDataRepository } from '@ngxs-labs/data/repositories';
import { NgxsOnInit, State } from '@ngxs/store';
import { bind } from 'bind-decorator';
import { AggregateResult, Filter, SpatialSceneNode, TissueBlockResult } from 'ccf-database';
import { combineLatest, ObservableInput, ObservedValueOf, OperatorFunction, ReplaySubject, Subject } from 'rxjs';
import { distinct, map, pluck, publishReplay, refCount, switchMap, take, tap } from 'rxjs/operators';

import { DataSourceService } from '../../services/data-source/data-source.service';


/** Default values for filters. */
export const DEFAULT_FILTER: Filter = {
  sex: 'Both',
  ageRange: [1, 110],
  bmiRange: [13, 83],
  tmc: [],
  technologies: [],
  ontologyTerms: ['http://purl.obolibrary.org/obo/UBERON_0013702']
};

/** Current state of data queries. */
// eslint-disable-next-line no-shadow
export enum DataQueryState {
  /** One or more queries are running. */
  Running = 'running',
  /** All queries have completed. */
  Completed = 'completed'
}

/**
 * Helper for testing that all states in an array are `DataQueryState.Completed`.
 *
 * @param states The array of states to test.
 * @returns true if all values in the array is `Completed`.
 */
function allCompleted(states: DataQueryState[]): boolean {
  return states.every(state => state === DataQueryState.Completed);
}

/**
 * Helper creating a function that sends a `DataQueryState.Completed` to
 * a subject whenever it is called.
 *
 * @param subject The subject to send completed messagess to.
 * @returns The function.
 */
function sendCompletedTo(subject: Subject<DataQueryState>): () => void {
  return () => subject.next(DataQueryState.Completed);
}

/**
 * Helper operator that combines querying with sharing and replay functionality.
 *
 * @param query The data query function.
 * @param [next] An optional listener on the values emitted by the latest query.
 * @returns The combined pipe operator function.
 */
function queryData<T, O extends ObservableInput<unknown>>(
  query: (value: T, index: number) => O,
  next?: (value: ObservedValueOf<O>) => void
): OperatorFunction<T, ObservedValueOf<O>> {
  return source => source.pipe(
    switchMap(query),
    tap(next),
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
export class DataState extends NgxsDataRepository<DataStateModel> implements NgxsOnInit {
  /** Implementation subject for tissueBlockDataQueryStatus$. */
  private readonly _tissueBlockDataQueryStatus$ = new ReplaySubject<DataQueryState>(1);
  /** Implementation subject for aggregateDataQueryStatus$. */
  private readonly _aggregateDataQueryStatus$ = new ReplaySubject<DataQueryState>(1);
  /** Implementation subject for termOccurencesDataQueryStatus$. */
  private readonly _termOccurencesDataQueryStatus$ = new ReplaySubject<DataQueryState>(1);
  /** Implementation subject for sceneDataQueryStatus$. */
  private readonly _sceneDataQueryStatus$ = new ReplaySubject<DataQueryState>(1);
  /** Keeping track of all ontology terms there is data for. */
  readonly ontologyTermsFullData$ = new ReplaySubject<Record<string, number>>(1);

  /** Current filter. */
  readonly filter$ = this.state$.pipe(pluck('filter'));
  /** Latest tissue block query data. */
  readonly tissueBlockData$ = this.filter$.pipe(queryData(
    this.tissueBlockData, sendCompletedTo(this._tissueBlockDataQueryStatus$)
  ));
  /** Latest aggregate query data. */
  readonly aggregateData$ = this.filter$.pipe(queryData(
    this.aggregateData, sendCompletedTo(this._aggregateDataQueryStatus$)
  ));
  /** Latest term occurences query data. */
  readonly termOccurencesData$ = this.filter$.pipe(queryData(
    this.termOccurencesData, sendCompletedTo(this._termOccurencesDataQueryStatus$)
  ));
  /** Latest scene query data. */
  readonly sceneData$ = this.filter$.pipe(queryData(
    this.sceneData, sendCompletedTo(this._sceneDataQueryStatus$)
  ));

  /** Current status of queries in the tissueBlockData$ observable. */
  readonly tissueBlockDataQueryStatus$ = this._tissueBlockDataQueryStatus$.pipe(distinct());
  /** Current status of queries in the aggregateData$ observable. */
  readonly aggregateDataQueryStatus$ = this._aggregateDataQueryStatus$.pipe(distinct());
  /** Current status of queries in the aggregateData$ observable. */
  readonly termOccurencesDataQueryStatus$ = this._termOccurencesDataQueryStatus$.pipe(distinct());
  /** Current status of queries in the sceneData$ observable. */
  readonly sceneDataQueryStatus$ = this._sceneDataQueryStatus$.pipe(distinct());

  /** Current status of all queries. */
  readonly queryStatus$ = combineLatest([
    this.tissueBlockDataQueryStatus$,
    this.aggregateDataQueryStatus$,
    this.termOccurencesDataQueryStatus$,
    this.sceneDataQueryStatus$
  ]).pipe(
    map(states => allCompleted(states) ? DataQueryState.Completed : DataQueryState.Running),
    distinct()
  );

  /**
   * Creates an instance of data state.
   *
   * @param source Data query service.
   */
  constructor(private readonly source: DataSourceService) {
    super();
    // Start everything in the completed state
    this._tissueBlockDataQueryStatus$.next(DataQueryState.Completed);
    this._aggregateDataQueryStatus$.next(DataQueryState.Completed);
    this._termOccurencesDataQueryStatus$.next(DataQueryState.Completed);
    this._sceneDataQueryStatus$.next(DataQueryState.Completed);
  }

  ngxsOnInit(): void {
    const { ontologyTermsFullData$, termOccurencesData$, source, snapshot: { filter } } = this;
    if (filter === DEFAULT_FILTER) {
      // Common case - Reuse the result of the regular query
      termOccurencesData$.pipe(take(1)).subscribe(ontologyTermsFullData$);
    } else {
      source.getOntologyTermOccurences().pipe(take(1)).subscribe(ontologyTermsFullData$);
    }
  }

  /**
   * Updates the current filter.
   *
   * @param filter Changes to be made to the current filter.
   */
  @DataAction()
  updateFilter(@Payload('filter') filter: Partial<Filter>): void {
    this.patchState({
      // Might need to do a deep compare of current and new filter
      filter: Object.assign({}, this.getState().filter, filter)
    });
  }

  /**
   * Queries for tissue block data.
   *
   * @param filter The filter used during query.
   * @returns The result of the query.
   */
   @bind
   private tissueBlockData(filter: Filter): ObservableInput<TissueBlockResult[]> {
     this._tissueBlockDataQueryStatus$.next(DataQueryState.Running);
     return this.source.getTissueBlockResults(filter);
   }

  /**
   * Queries for aggregate data.
   *
   * @param filter The filter used during query.
   * @returns The result of the query.
   */
  @bind
  private aggregateData(filter: Filter): ObservableInput<AggregateResult[]> {
    this._aggregateDataQueryStatus$.next(DataQueryState.Running);
    return this.source.getAggregateResults(filter);
  }

  /**
   * Queries for term occurences data.
   *
   * @param filter The filter used during query.
   * @returns The result of the query.
   */
  @bind
  private termOccurencesData(filter: Filter): ObservableInput<Record<string, number>> {
    this._termOccurencesDataQueryStatus$.next(DataQueryState.Running);
    return this.source.getOntologyTermOccurences(filter);
  }

  /**
   * Queries for term occurences data.
   *
   * @param filter The filter used during query.
   * @returns The result of the query.
   */
   @bind
   private sceneData(filter: Filter): ObservableInput<SpatialSceneNode[]> {
     this._sceneDataQueryStatus$.next(DataQueryState.Running);
     return this.source.getScene(filter);
   }
}
