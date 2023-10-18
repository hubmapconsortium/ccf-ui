import {
  AggregateResult, DatabaseStatus, Filter, OntologyTreeModel, SpatialEntity, SpatialSceneNode, TissueBlockResult
} from 'ccf-database';
import { Observable, ObservableInput, ObservedValueOf } from 'rxjs';
import { switchMap } from 'rxjs/operators';


export interface DataSource {
  getDatabaseStatus(): Observable<DatabaseStatus>;
  getProviderNames(): Observable<string[]>;
  getDatasetTechnologyNames(): Observable<string[]>;
  getOntologyTreeModel(): Observable<OntologyTreeModel>;
  getCellTypeTreeModel(): Observable<OntologyTreeModel>;
  getBiomarkerTreeModel(): Observable<OntologyTreeModel>;
  getReferenceOrgans(): Observable<SpatialEntity[]>;

  getTissueBlockResults(filter?: Filter): Observable<TissueBlockResult[]>;
  getAggregateResults(filter?: Filter): Observable<AggregateResult[]>;
  getOntologyTermOccurences(filter?: Filter): Observable<Record<string, number>>;
  getCellTypeTermOccurences(filter?: Filter): Observable<Record<string, number>>;
  getBiomarkerTermOccurences(filter?: Filter): Observable<Record<string, number>>;
  getScene(filter?: Filter): Observable<SpatialSceneNode[]>;
  getReferenceOrganScene(organIri: string, filter?: Filter): Observable<SpatialSceneNode[]>;
}

export type DataSourceLike = {
  [K in keyof DataSource]: DataSourceLikeMethod<K>;
};

export type DataSourceMethod<K extends keyof DataSource> = DataSource[K];
export type DataSourceLikeMethod<K extends keyof DataSource> =
  (...args: Parameters<DataSourceMethod<K>>) => ObservableInput<DataSourceDataType<K>>;
export type DataSourceDataType<K extends keyof DataSource> =
  ObservedValueOf<ReturnType<DataSourceMethod<K>>>;


export abstract class ForwardingDataSource implements DataSource {
  getDatabaseStatus(): Observable<DatabaseStatus> {
    return this.forwardCall('getDatabaseStatus');
  }

  getProviderNames(): Observable<string[]> {
    return this.forwardCall('getProviderNames');
  }

  getDatasetTechnologyNames(): Observable<string[]> {
    return this.forwardCall('getDatasetTechnologyNames');
  }

  getOntologyTreeModel(): Observable<OntologyTreeModel> {
    return this.forwardCall('getOntologyTreeModel');
  }

  getCellTypeTreeModel(): Observable<OntologyTreeModel> {
    return this.forwardCall('getCellTypeTreeModel');
  }

  getBiomarkerTreeModel(): Observable<OntologyTreeModel> {
    return this.forwardCall('getBiomarkerTreeModel');
  }

  getReferenceOrgans(): Observable<SpatialEntity[]> {
    return this.forwardCall('getReferenceOrgans');
  }

  getTissueBlockResults(filter?: Filter): Observable<TissueBlockResult[]> {
    return this.forwardCall('getTissueBlockResults', filter);
  }

  getAggregateResults(filter?: Filter): Observable<AggregateResult[]> {
    return this.forwardCall('getAggregateResults', filter);
  }

  getOntologyTermOccurences(filter?: Filter): Observable<Record<string, number>> {
    return this.forwardCall('getOntologyTermOccurences', filter);
  }

  getCellTypeTermOccurences(filter?: Filter): Observable<Record<string, number>> {
    return this.forwardCall('getCellTypeTermOccurences', filter);
  }

  getBiomarkerTermOccurences(filter?: Filter): Observable<Record<string, number>> {
    return this.forwardCall('getBiomarkerTermOccurences', filter);
  }

  getScene(filter?: Filter): Observable<SpatialSceneNode[]> {
    return this.forwardCall('getScene', filter);
  }

  getReferenceOrganScene(organIri: string, filter?: Filter): Observable<SpatialSceneNode[]> {
    return this.forwardCall('getReferenceOrganScene', organIri, filter);
  }

  protected abstract forwardCall<K extends keyof DataSource>(
    method: K, ...args: Parameters<DataSourceMethod<K>>
  ): Observable<DataSourceDataType<K>>;
}


export abstract class DelegateDataSource extends ForwardingDataSource {
  abstract readonly impl$: Observable<DataSourceLike>;

  protected forwardCall<K extends keyof DataSource>(
    method: K, ...args: Parameters<DataSourceMethod<K>>
  ): Observable<DataSourceDataType<K>> {
    type AnyFunction = (...rest: unknown[]) => ObservableInput<unknown>;

    return this.impl$.pipe(
      switchMap(impl => (impl[method] as AnyFunction)(...args))
    ) as Observable<DataSourceDataType<K>>;
  }
}
