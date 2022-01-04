/* eslint-disable @typescript-eslint/no-shadow */
import { LocationStrategy } from '@angular/common';
import { Injectable, OnDestroy } from '@angular/core';
import {
  AggregateResult, CCFDatabase, CCFDatabaseOptions, Filter, OntologyTreeModel, SpatialEntity, SpatialSceneNode,
  TissueBlockResult,
} from 'ccf-database';
import { GlobalConfigState } from 'ccf-shared';
import { releaseProxy, Remote, wrap } from 'comlink';
import { Observable, Subscription, Unsubscribable, using } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay, switchMap, take } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { DataSourceService } from './data-source.service';


type DataSource = Remote<CCFDatabase> | CCFDatabase;


function compareConfig(previous: CCFDatabaseOptions, current: CCFDatabaseOptions): boolean {
  return previous === current;
}


/**
 * Backend data queries.
 */
@Injectable({
  providedIn: 'root'
})
export class LocalDataSourceService implements DataSourceService, OnDestroy {
  /** The underlying database. */
  dataSource: Observable<DataSource>;
  /** Database initialization options. */
  dbOptions: CCFDatabaseOptions;

  private readonly subscriptions = new Subscription();

  /**
   * Creates an instance of data source service.
   */
  constructor(
    globalConfig: GlobalConfigState<CCFDatabaseOptions>,
    private readonly locator: LocationStrategy
  ) {
    this.dataSource = globalConfig.config$.pipe(
      filter(config => Object.keys(config).length > 0),
      map((config) => config as unknown as CCFDatabaseOptions),
      distinctUntilChanged(compareConfig),
      switchMap(config => using(
        () => this.createDataSource(),
        (resource) => this.connectDataSource((resource as unknown as { source: DataSource }).source, config)
      )),
      shareReplay(1)
    );

    // this.subscriptions.add(this.dataSource.subscribe());

    // this.dbOptions = environment.dbOptions as CCFDatabaseOptions;

    // if (typeof globalThis === 'object') {
    //   // If a global dbOptions object is set, use this for connecting to the db
    //   if (globalThis.dbOptions) {
    //     this.dbOptions = { ...this.dbOptions, ...globalThis.dbOptions } as CCFDatabaseOptions;
    //   }

    //   // In development, make the db globally accessible
    //   if (!environment.production) {
    //     ((globalThis as unknown) as { db: Remote<CCFDatabase> | CCFDatabase }).db = this.dataSource;
    //   }
    // }
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
   * Queries for technology filters.
   *
   * @returns An observable emitting the results.
   */
  getDatasetTechnologyNames(): Observable<string[]> {
    return this.dataSource.pipe(
      switchMap(db => db.getDatasetTechnologyNames()),
      take(1)
    );
  }

  /**
   * Queries for provider filters.
   *
   * @returns An observable emitting the results.
   */
  getProviderNames(): Observable<string[]> {
    return this.dataSource.pipe(
      switchMap(db => db.getProviderNames()),
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
      switchMap(db => db.getScene(filter)),
      take(1)
    );
  }

  private createDataSource(): { source: DataSource } & Unsubscribable {
    let source: DataSource;
    let unsubscribe: () => void = () => undefined;

    if (typeof Worker !== 'undefined' && !environment.disableDbWorker) {
      let worker: Worker;
      ({ source, worker } = this.getWebWorkerDataSource(true));
      unsubscribe = async () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        await source[releaseProxy]();
        worker.terminate();
      };
    } else {
      source = new CCFDatabase();
    }

    return { source, unsubscribe };
  }

  private async connectDataSource(source: DataSource, config: CCFDatabaseOptions): Promise<DataSource> {
    if (environment.disableDbWorker) {
      await new Promise(r => {
        setTimeout(r, 100);
      });
    }
    const start = new Date().getTime();

    await source.connect(config, true);

    if (!environment.production) {
      console.info(`Loaded CCF database in ${ ((new Date()).getTime() - start) / 1000 }s`);
    }
    return source;
  }

  private getWebWorkerDataSource(directImport = false): { source: Remote<CCFDatabase>; worker: Worker } {
    let worker: Worker;
    if (directImport) {
      worker = new Worker(new URL('./data-source.worker', import.meta.url), { type: 'module' });
    } else {
      const workerUrl = this.locator.prepareExternalUrl('0-es2015.worker.js');
      const workerBlob = new Blob([`importScripts('${workerUrl}')`,], { type: 'application/javascript' });
      worker = new Worker(URL.createObjectURL(workerBlob), { type: 'module' });
    }
    return { source: wrap(worker), worker };
  }
}
