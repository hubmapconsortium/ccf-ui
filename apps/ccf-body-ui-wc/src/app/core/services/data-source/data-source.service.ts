import { DEFAULT_CCF_DB_OPTIONS } from './../../../../../../ccf-database/src/lib/ccf-database';
/* eslint-disable @typescript-eslint/no-shadow */
import { LocationStrategy } from '@angular/common';
import { Injectable, OnDestroy } from '@angular/core';
import {
  AggregateResult,
  CCFDatabase,
  CCFDatabaseOptions,
  Filter,
  OntologyTreeModel,
  SpatialEntity,
  SpatialSceneNode,
  TissueBlockResult,
} from 'ccf-database';
import { GlobalConfigState } from 'ccf-shared';
import { Remote } from 'comlink';
import { Observable, Subscription, Unsubscribable, using } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
  switchMap,
  take,
} from 'rxjs/operators';

import { environment } from '../../../../environments/environment';

type DataSource = Remote<CCFDatabase> | CCFDatabase;

function compareConfig(
  previous: CCFDatabaseOptions,
  current: CCFDatabaseOptions
): boolean {
  return previous === current;
}

/**
 * Backend data queries.
 */
@Injectable({
  providedIn: 'root',
})
export class DataSourceService implements OnDestroy {
  /** The underlying database. */
  dataSource: Observable<DataSource>;
  /** Database initialization options. */
  dbOptions: CCFDatabaseOptions;

  private readonly subscriptions = new Subscription();

  /**
   * Creates an instance of data source service.
   */
  constructor(
    private readonly locator: LocationStrategy,
    private readonly globalConfig: GlobalConfigState<CCFDatabaseOptions>
  ) {
    this.dataSource = globalConfig.getOption('data').pipe(
      map((data) => ({ ...DEFAULT_CCF_DB_OPTIONS, dataSources: data })),
      filter((config) => Object.keys(config).length > 0),
      map((config) => config as unknown as CCFDatabaseOptions),
      distinctUntilChanged(compareConfig),
      switchMap((config) =>
        using(
          () => this.createDataSource(),
          (resource) =>
            this.connectDataSource(
              (resource as unknown as { source: DataSource }).source,
              config
            )
        )
      ),
      shareReplay(1)
    );

    this.subscriptions.add(this.dataSource.subscribe());
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  /**
   * Queries for tissue block values.
   *
   * @param [filter] Currently applied filter.
   * @returns An observable emitting the results.
   */
  getTissueBlockResults(filter?: Filter): Observable<TissueBlockResult[]> {
    return this.dataSource.pipe(
      switchMap((db) => db.getTissueBlockResults(filter)),
      take(1)
    );
  }

  /**
   * Queries for aggregate values.
   *
   * @param [filter] Currently applied filter.
   * @returns An observable emitting the results.
   */
  getAggregateResults(filter?: Filter): Observable<AggregateResult[]> {
    return this.dataSource.pipe(
      switchMap((db) => db.getAggregateResults(filter)),
      take(1)
    );
  }

  /**
   * Queries for ontology term counts.
   *
   * @param [filter] Currently applied filter.
   * @returns An observable emitting the results.
   */
  getOntologyTermOccurences(
    filter?: Filter
  ): Observable<Record<string, number>> {
    return this.dataSource.pipe(
      switchMap((db) => db.getOntologyTermOccurences(filter)),
      take(1)
    );
  }

  /**
   * Queries for cell type term counts.
   *
   * @param [filter] Currently applied filter.
   * @returns An observable emitting the results.
   */
  getCellTypeTermOccurences(
    filter?: Filter
  ): Observable<Record<string, number>> {
    return this.dataSource.pipe(
      switchMap((db) => db.getCellTypeTermOccurences(filter)),
      take(1)
    );
  }

  /**
   * Get the ontology tree model.
   *
   * @returns An observable emitting the results.
   */
  getOntologyTreeModel(): Observable<OntologyTreeModel> {
    return this.dataSource.pipe(
      switchMap((db) => db.getOntologyTreeModel()),
      take(1)
    );
  }

  /**
   * Get the cell type tree model.
   *
   * @returns An observable emitting the results.
   */
  getCellTypeTreeModel(): Observable<OntologyTreeModel> {
    return this.dataSource.pipe(
      switchMap((db) => db.getCellTypeTreeModel()),
      take(1)
    );
  }

  /**
   * Get the reference organs.
   *
   * @returns An observable emitting the results.
   */
  getReferenceOrgans(): Observable<SpatialEntity[]> {
    return this.dataSource.pipe(
      switchMap((db) => db.getReferenceOrgans()),
      take(1)
    );
  }

  /**
   * Queries for scene nodes to display.
   *
   * @param [filter] Currently applied filter.
   * @returns An observable emitting the results.
   */
  getScene(filter?: Filter): Observable<SpatialSceneNode[]> {
    return this.dataSource.pipe(
      switchMap((db) => db.getScene(filter)),
      take(1)
    );
  }

  getOrganScene(
    organ: string,
    filter?: Filter
  ): Observable<SpatialSceneNode[]> {
    return this.dataSource.pipe(
      switchMap((db) => db.getReferenceOrganScene(organ, filter)),
      take(1)
    );
  }

  private createDataSource(): { source: DataSource } & Unsubscribable {
    const unsubscribe: () => void = () => undefined;
    const source = new CCFDatabase();

    return { source, unsubscribe };
  }

  private async connectDataSource(
    source: DataSource,
    config: CCFDatabaseOptions
  ): Promise<DataSource> {
    const start = new Date().getTime();

    await source.connect(config, false);

    if (!environment.production) {
      // eslint-disable-next-line no-console
      console.info(
        `Loaded CCF database in ${(new Date().getTime() - start) / 1000}s`
      );
      // eslint-disable-next-line no-console
      console.log(source);
    }
    return source;
  }
}
