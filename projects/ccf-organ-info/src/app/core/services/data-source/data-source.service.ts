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
  TissueBlockResult
} from 'ccf-database';
import { Remote } from 'comlink';
import { Observable, Subscription, Unsubscribable, using } from 'rxjs';
import { shareReplay, switchMap, take } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

type DataSource = Remote<CCFDatabase> | CCFDatabase;

/**
 * Backend data queries.
 */
@Injectable({
  providedIn: 'root'
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
  constructor(private readonly locator: LocationStrategy) {
    this.dbOptions = environment.dbOptions as CCFDatabaseOptions;

    this.dataSource = using(
      () => this.createDataSource(),
      (resource) => this.connectDataSource((resource as unknown as { source: DataSource }).source, this.dbOptions)
    ).pipe(shareReplay(1));

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
      switchMap(db => db.getTissueBlockResults(filter)),
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
      switchMap(db => db.getAggregateResults(filter)),
      take(1)
    );
  }

  /**
   * Queries for ontology term counts.
   *
   * @param [filter] Currently applied filter.
   * @returns An observable emitting the results.
   */
  getOntologyTermOccurences(filter?: Filter): Observable<Record<string, number>> {
    return this.dataSource.pipe(
      switchMap(db => db.getOntologyTermOccurences(filter)),
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
      switchMap(db => db.getOntologyTreeModel()),
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
      switchMap(db => db.getReferenceOrgans()),
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
      switchMap(db => db.getScene(filter)
        .then(value => value.filter(node => filter!.ontologyTerms.includes(node.representation_of!)))
      ),
      take(1)
    );
  }

  private createDataSource(): { source: DataSource } & Unsubscribable {
    const source: DataSource = new CCFDatabase(this.dbOptions);
    const unsubscribe: () => void = () => undefined;

    return { source, unsubscribe };
  }

  private async connectDataSource(source: DataSource, config: CCFDatabaseOptions): Promise<DataSource> {
    if (environment.disableDbWorker) {
      await new Promise(r => setTimeout(r, 100));
    }

    await source.connect(config);
    return source;
  }
}
