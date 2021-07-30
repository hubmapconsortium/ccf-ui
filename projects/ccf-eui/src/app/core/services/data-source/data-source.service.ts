import { LocationStrategy } from '@angular/common';
import { Injectable } from '@angular/core';
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
import { Remote, wrap } from 'comlink';
import { from, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';


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

  /**
   * Creates an instance of data source service.
   */
  constructor(private readonly locator: LocationStrategy) {
    if (typeof Worker !== 'undefined' && !environment.disableDbWorker) {
      this.dataSource = this.getWebWorkerDataSource(true);
    } else {
      this.dataSource = new CCFDatabase();
    }
    this.dbOptions = environment.dbOptions as CCFDatabaseOptions;

    if (typeof globalThis === 'object') {
      // If a global dbOptions object is set, use this for connecting to the db
      if (globalThis.dbOptions) {
        this.dbOptions = { ...this.dbOptions, ...globalThis.dbOptions } as CCFDatabaseOptions;
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
  async getDB(): Promise<Remote<CCFDatabase> | CCFDatabase> {
    // When the db is running in the main thread, introduce some
    // delay to allow other parts of the UI to have time to run.
    if (environment.disableDbWorker) {
      await new Promise(r => setTimeout(r, 100));
    }
    await this.dataSource.connect(this.dbOptions);
    return this.dataSource;
  }

  /**
   * Queries for tissue block values.
   *
   * @param [filter] Currently applied filter.
   * @returns An observable emitting the results.
   */
   getTissueBlockResults(filter?: Filter): Observable<TissueBlockResult[]> {
    return from(this.getDB().then((db) => db.getTissueBlockResults(filter))).pipe(take(1));
  }

  /**
   * Queries for aggregate values.
   *
   * @param [filter] Currently applied filter.
   * @returns An observable emitting the results.
   */
  getAggregateResults(filter?: Filter): Observable<AggregateResult[]> {
    return from(this.getDB().then((db) => db.getAggregateResults(filter))).pipe(take(1));
  }

  /**
   * Queries for ontology term counts.
   *
   * @param [filter] Currently applied filter.
   * @returns An observable emitting the results.
   */
  getOntologyTermOccurences(filter?: Filter): Observable<Record<string, number>> {
    return from(this.getDB().then((db) => db.getOntologyTermOccurences(filter))).pipe(take(1));
  }

  /**
   * Get the ontology tree model.
   *
   * @returns An observable emitting the results.
   */
  getOntologyTreeModel(): Observable<OntologyTreeModel> {
    return from(this.getDB().then((db) => db.getOntologyTreeModel())).pipe(take(1));
  }

  /**
   * Get the reference organs.
   *
   * @returns An observable emitting the results.
   */
   getReferenceOrgans(): Observable<SpatialEntity[]> {
    return from(this.getDB().then((db) => db.getReferenceOrgans())).pipe(take(1));
  }

  /**
   * Queries for scene nodes to display.
   *
   * @param [filter] Currently applied filter.
   * @returns An observable emitting the results.
   */
   getScene(filter?: Filter): Observable<SpatialSceneNode[]> {
    return from(this.getDB().then((db) => db.getScene(filter))).pipe(take(1));
  }

  private getWebWorkerDataSource(directImport = false): Remote<CCFDatabase> {
    let worker: Worker;
    if (directImport) {
      worker = new Worker(new URL('./data-source.worker', import.meta.url), { type: 'module' });
    } else {
      const workerUrl = this.locator.prepareExternalUrl('0-es2015.worker.js');
      const workerBlob = new Blob([`importScripts('${workerUrl}')`,], {type: 'application/javascript'});
      worker = new Worker(URL.createObjectURL(workerBlob), { type: 'module' });
    }
    return wrap(worker);
  }
}
