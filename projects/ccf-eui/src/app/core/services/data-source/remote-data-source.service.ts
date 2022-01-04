import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Matrix4 } from '@math.gl/core';
import {
  AggregateResult, Filter, OntologyTreeModel, SpatialEntity, SpatialSceneNode, TissueBlockResult,
} from 'ccf-database';
import { GlobalConfigState } from 'ccf-shared';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';


export interface RemoteDataSourceOptions {
  remoteApiEndpoint: string;
}


@Injectable({
  providedIn: 'root'
})
export class RemoteDataSourceService {
  constructor(
    private readonly globalConfig: GlobalConfigState<RemoteDataSourceOptions>,
    private readonly http: HttpClient
  ) { }

  getProviderNames(): Observable<string[]> {
    return this.doFetch('provider-names');
  }

  getDatasetTechnologyNames(): Observable<string[]> {
    return this.doFetch('technology-names');
  }

  getOntologyTreeModel(): Observable<OntologyTreeModel> {
    return this.doFetch('ontology-tree-model');
  }

  getReferenceOrgans(): Observable<SpatialEntity[]> {
    return this.doFetch('reference-organs');
  }

  getTissueBlockResults(filter?: Filter): Observable<TissueBlockResult[]> {
    return this.doFetch('tissue-blocks', filter);
  }

  getAggregateResults(filter?: Filter): Observable<AggregateResult[]> {
    return this.doFetch('aggregate-results', filter);
  }

  getOntologyTermOccurences(filter?: Filter): Observable<Record<string, number>> {
    return this.doFetch('ontology-term-occurences', filter);
  }

  getScene(filter?: Filter): Observable<SpatialSceneNode[]> {
    return this.doFetch<SpatialSceneNode[]>('scene', filter).pipe(
      map(nodes => nodes.map(node => ({
        ...node,
        transformMatrix: new Matrix4(node.transformMatrix)
      })))
    );
  }

  private doFetch<T>(dataset: string, filter?: Filter): Observable<T> {
    const { globalConfig, http } = this;
    const params = this.filterToParams(filter);

    return globalConfig.getOption('remoteApiEndpoint').pipe(
      map(endpoint => `${endpoint}/${dataset}`),
      switchMap(url => http.get<T>(url, { params, responseType: 'json' }))
    );
  }

  private filterToParams(filter: Partial<Filter> = {}): HttpParams {
    const keys = Object.keys(filter).sort();
    const isEmpty = (value: unknown) =>
      value == null || value === '' || (Array.isArray(value) && value.length === 0);
    const stringify = (value: unknown) =>
      Array.isArray(value) ? value.join(',') : `${value}`;

    return keys.reduce<HttpParams>((params, key) => {
      const value = filter[key];
      return !isEmpty(value) ? params.set(key, stringify(value)) : params;
    }, new HttpParams());
  }
}
