/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { DataAction, Payload, StateRepository } from '@angular-ru/ngxs/decorators';
import { NgxsDataRepository } from '@angular-ru/ngxs/repositories';
import { Injectable } from '@angular/core';
import { Action, NgxsOnInit, State } from '@ngxs/store';
import { bind } from 'bind-decorator';
import { AggregateResult, DatabaseStatus, Filter, OntologyTreeModel, SpatialSceneNode, TissueBlockResult } from 'ccf-database';
import { DEFAULT_FILTER, DataSourceService } from 'ccf-shared';
import { ObservableInput, ObservedValueOf, OperatorFunction, ReplaySubject, Subject, combineLatest, defer } from 'rxjs';
import { delay, distinct, map, publishReplay, refCount, repeat, filter as rxjsFilter, switchMap, take, takeWhile, tap } from 'rxjs/operators';
import { UpdateFilter } from './data.actions';

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
  status: 'Loading' | 'Ready' | 'Error';
  statusMessage: string;
  anatomicalStructuresTreeModel?: OntologyTreeModel;
  cellTypesTreeModel?: OntologyTreeModel;
  biomarkersTreeModel?: OntologyTreeModel;
}

/**
 * Data state repository and service.
 */
@StateRepository()
@State<DataStateModel>({
  name: 'data',
  defaults: {
    filter: DEFAULT_FILTER,
    status: 'Loading',
    statusMessage: 'Loading database'
  }
})
@Injectable()
export class DataState extends NgxsDataRepository<DataStateModel> implements NgxsOnInit {
  /** Emits when the database is ready. */
  readonly databaseReady$ = this.state$.pipe(map(x => x?.status), distinct(), rxjsFilter((status) => status === 'Ready'));

  /** Implementation subject for tissueBlockDataQueryStatus$. */
  private readonly _tissueBlockDataQueryStatus$ = new ReplaySubject<DataQueryState>(1);
  /** Implementation subject for aggregateDataQueryStatus$. */
  private readonly _aggregateDataQueryStatus$ = new ReplaySubject<DataQueryState>(1);
  /** Implementation subject for ontologyTermOccurencesDataQueryStatus$. */
  private readonly _ontologyTermOccurencesDataQueryStatus$ = new ReplaySubject<DataQueryState>(1);
  /** Implementation subject for cellTypeTermOccurencesDataQueryStatus$. */
  private readonly _cellTypeTermOccurencesDataQueryStatus$ = new ReplaySubject<DataQueryState>(1);
  private readonly _biomarkerTermOccurencesDataQueryStatus$ = new ReplaySubject<DataQueryState>(1);

  /** Implementation subject for sceneDataQueryStatus$. */
  private readonly _sceneDataQueryStatus$ = new ReplaySubject<DataQueryState>(1);
  /** Implementation subject for technologyFilterQueryStatus$. */
  private readonly _technologyFilterQueryStatus$ = new ReplaySubject<DataQueryState>(1);
  /** Implementation subject for providerFilterQueryStatus$. */
  private readonly _providerFilterQueryStatus$ = new ReplaySubject<DataQueryState>(1);
  /** Keeping track of all ontology terms there is data for. */
  readonly ontologyTermsFullData$ = new ReplaySubject<Record<string, number>>(1);
  /** Keeping track of all cell type terms there is data for. */
  readonly cellTypeTermsFullData$ = new ReplaySubject<Record<string, number>>(1);
  readonly biomarkerTermsFullData$ = new ReplaySubject<Record<string, number>>(1);

  /** Current filter. */
  readonly filter$ = this.state$.pipe(map(x => x?.filter));
  /** Latest tissue block query data. */
  readonly tissueBlockData$ = this.filter$.pipe(queryData(
    this.tissueBlockData, sendCompletedTo(this._tissueBlockDataQueryStatus$)
  ));
  /** Latest aggregate query data. */
  readonly aggregateData$ = this.filter$.pipe(queryData(
    this.aggregateData, sendCompletedTo(this._aggregateDataQueryStatus$)
  ));
  /** Latest ontology term occurences query data. */
  readonly ontologyTermOccurencesData$ = this.filter$.pipe(queryData(
    this.ontologyTermOccurencesData, sendCompletedTo(this._ontologyTermOccurencesDataQueryStatus$)
  ));
  /** Latest ontology term occurences query data. */
  readonly biomarkerTermOccurencesData$ = this.filter$.pipe(queryData(
    this.biomarkerTermOccurencesData, sendCompletedTo(this._biomarkerTermOccurencesDataQueryStatus$)
  ));
  /** Latest cell type term occurences query data. */
  readonly cellTypeTermOccurencesData$ = this.filter$.pipe(queryData(
    this.cellTypeTermOccurencesData, sendCompletedTo(this._cellTypeTermOccurencesDataQueryStatus$)
  ));
  /** Latest scene query data. */
  readonly sceneData$ = this.filter$.pipe(queryData(
    this.sceneData, sendCompletedTo(this._sceneDataQueryStatus$)
  ));
  /** Latest technology filter label query data. */
  readonly technologyFilterData$ = this.filter$.pipe(queryData(
    this.technologyFilterData, sendCompletedTo(this._technologyFilterQueryStatus$)
  ));
  /** Latest provider filter label query data. */
  readonly providerFilterData$ = this.filter$.pipe(queryData(
    this.providerFilterData, sendCompletedTo(this._providerFilterQueryStatus$)
  ));

  /** Current status of queries in the tissueBlockData$ observable. */
  readonly tissueBlockDataQueryStatus$ = this._tissueBlockDataQueryStatus$.pipe(distinct());
  /** Current status of queries in the aggregateData$ observable. */
  readonly aggregateDataQueryStatus$ = this._aggregateDataQueryStatus$.pipe(distinct());
  /** Current status of queries in the ontologyTermOccurrences$ observable. */
  readonly ontologyTermOccurencesDataQueryStatus$ = this._ontologyTermOccurencesDataQueryStatus$.pipe(distinct());
  /** Current status of queries in the cellTypeTermOccurrences$ observable. */
  readonly cellTypeTermOccurencesDataQueryStatus$ = this._cellTypeTermOccurencesDataQueryStatus$.pipe(distinct());

  readonly biomarkerTermOccurencesDataQueryStatus$ = this._biomarkerTermOccurencesDataQueryStatus$.pipe(distinct());
  /** Current status of queries in the sceneData$ observable. */
  readonly sceneDataQueryStatus$ = this._sceneDataQueryStatus$.pipe(distinct());
  /** Current status of queries in the technologyFilter$ observable. */
  readonly technologyFilterQueryStatus$ = this._technologyFilterQueryStatus$.pipe(distinct());
  /** Current status of queries in the providerFilter$ observable. */
  readonly providerFilterQueryStatus$ = this._providerFilterQueryStatus$.pipe(distinct());

  /** Current status of all queries. */
  readonly queryStatus$ = combineLatest([
    this.tissueBlockDataQueryStatus$,
    this.aggregateDataQueryStatus$,
    this.ontologyTermOccurencesDataQueryStatus$,
    this.cellTypeTermOccurencesDataQueryStatus$,
    this.sceneDataQueryStatus$,
    this.technologyFilterQueryStatus$,
    this.providerFilterQueryStatus$
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
    this._ontologyTermOccurencesDataQueryStatus$.next(DataQueryState.Completed);
    this._cellTypeTermOccurencesDataQueryStatus$.next(DataQueryState.Completed);
    this._sceneDataQueryStatus$.next(DataQueryState.Completed);
    this._technologyFilterQueryStatus$.next(DataQueryState.Completed);
    this._providerFilterQueryStatus$.next(DataQueryState.Completed);
  }

  ngxsOnInit(): void {
    const { ontologyTermsFullData$, ontologyTermOccurencesData$, cellTypeTermsFullData$, biomarkerTermsFullData$, cellTypeTermOccurencesData$, biomarkerTermOccurencesData$, source, snapshot: { filter } } = this;
    if (filter === DEFAULT_FILTER) {
      // Common case - Reuse the result of the regular query
      ontologyTermOccurencesData$.pipe(take(1)).subscribe(ontologyTermsFullData$);
      cellTypeTermOccurencesData$.pipe(take(1)).subscribe(cellTypeTermsFullData$);
      biomarkerTermOccurencesData$.pipe(take(1)).subscribe(biomarkerTermsFullData$);

    } else {
      source.getOntologyTermOccurences().pipe(take(1)).subscribe(ontologyTermsFullData$);
      source.getCellTypeTermOccurences().pipe(take(1)).subscribe(cellTypeTermsFullData$);
      source.getBiomarkerTermOccurences().pipe(take(1)).subscribe(biomarkerTermsFullData$);

    }
    this.source.getOntologyTreeModel().pipe(take(1)).subscribe((model) => this.updateAnatomicalStructuresTreeModel(model));
    this.source.getCellTypeTreeModel().pipe(take(1)).subscribe((model) => this.updateCellTypesTreeModel(model));
    this.source.getBiomarkerTreeModel().pipe(take(1)).subscribe((model) => this.updateBiomarkersTreeModel(model));
    this.warmUpDatabase();
  }

  private warmUpDatabase(): void {
    defer(() => this.source.getDatabaseStatus()).pipe(
      tap((status) => this.updateStatus(status)),
      delay(2000),
      take(1)
    ).pipe(
      repeat(1000),
      takeWhile((status) => status.status === 'Loading')
    ).subscribe();

    this.databaseReady$.pipe(take(1), tap(() => {
      this.updateStatus({
        status: 'Ready',
        message: 'Loading HRA Exploration User Interface (EUI)'
      });
    })).subscribe();
  }

  @DataAction()
  updateAnatomicalStructuresTreeModel(@Payload('treeModel') model: OntologyTreeModel): void {
    this.ctx.patchState({
      anatomicalStructuresTreeModel: model
    });
  }

  @DataAction()
  updateCellTypesTreeModel(@Payload('treeModel') model: OntologyTreeModel): void {
    this.ctx.patchState({
      cellTypesTreeModel: model
    });
  }

  @DataAction()
  updateBiomarkersTreeModel(@Payload('treeModel') model: OntologyTreeModel): void {
    this.ctx.patchState({
      biomarkersTreeModel: model
    });
  }

  @DataAction()
  updateStatus(@Payload('status') status: DatabaseStatus): void {
    this.ctx.patchState({
      status: status.status,
      statusMessage: status.message
    });
  }

  /**
   * Updates the current filter.
   *
   * @param filter Changes to be made to the current filter.
   */
  @DataAction()
  updateFilter(@Payload('filter') filter: Partial<Filter>): void {
    this.ctx.patchState({
      // Might need to do a deep compare of current and new filter
      filter: { ...this.getState().filter, ...filter }
    });
  }

  @Action(UpdateFilter)
  updateFilterHandler(_ctx: unknown, { filter }: UpdateFilter): void {
    this.updateFilter(filter);
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
    return this.databaseReady$.pipe(switchMap(() => this.source.getTissueBlockResults(filter)));
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
    return this.databaseReady$.pipe(switchMap(() => this.source.getAggregateResults(filter)));
  }

  /**
   * Queries for ontology term occurences data.
   *
   * @param filter The filter used during query.
   * @returns The result of the query.
   */
  @bind
  private ontologyTermOccurencesData(filter: Filter): ObservableInput<Record<string, number>> {
    this._ontologyTermOccurencesDataQueryStatus$.next(DataQueryState.Running);
    return this.databaseReady$.pipe(switchMap(() => this.source.getOntologyTermOccurences(filter)));
  }

  /**
   * Queries for cell type term occurences data.
   *
   * @param filter The filter used during query.
   * @returns The result of the query.
   */
  @bind
  private cellTypeTermOccurencesData(filter: Filter): ObservableInput<Record<string, number>> {
    this._cellTypeTermOccurencesDataQueryStatus$.next(DataQueryState.Running);
    return this.databaseReady$.pipe(switchMap(() => this.source.getCellTypeTermOccurences(filter)));
  }
  @bind
  private biomarkerTermOccurencesData(filter: Filter): ObservableInput<Record<string, number>> {
    this._biomarkerTermOccurencesDataQueryStatus$.next(DataQueryState.Running);
    return this.databaseReady$.pipe(switchMap(() => this.source.getBiomarkerTermOccurences(filter)));
  }

  /**
   * Queries for scene data.
   *
   * @param filter The filter used during query.
   * @returns The result of the query.
   */
  @bind
  private sceneData(filter: Filter): ObservableInput<SpatialSceneNode[]> {
    this._sceneDataQueryStatus$.next(DataQueryState.Running);
    return this.databaseReady$.pipe(switchMap(() => this.source.getScene(filter)));
  }

  /**
   * Queries for technology filter data.
   *
   * @returns The result of the query.
   */
  @bind
  private technologyFilterData(): ObservableInput<string[]> {
    this._technologyFilterQueryStatus$.next(DataQueryState.Running);
    return this.databaseReady$.pipe(switchMap(() => this.source.getDatasetTechnologyNames()));
  }

  /**
   * Queries for provider filter data.
   *
   * @returns The result of the query.
   */
  @bind
  private providerFilterData(): ObservableInput<string[]> {
    this._providerFilterQueryStatus$.next(DataQueryState.Running);
    return this.databaseReady$.pipe(switchMap(() => this.source.getProviderNames()));
  }
}
