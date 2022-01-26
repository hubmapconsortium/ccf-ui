import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Matrix4 } from '@math.gl/core';
import { Filter, SpatialSceneNode } from 'ccf-database';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Cacheable } from 'ts-cacheable';

import { GlobalConfigState } from '../../config/global-config.state';
import { encodeArguments as defaultEncodeArguments } from './api-endpoint-argument-encoder';
import { DataSource, DataSourceDataType, DataSourceMethod, ForwardingDataSource } from './data-source';


type UnaryFunction<T> = (arg: T) => T;

export interface ApiEndpointDataSourceOptions {
  remoteApiEndpoint: string;
  hubmapToken?: string;
}

export type ApiEndpointDataReviver<K extends keyof DataSource> =
  UnaryFunction<DataSourceDataType<K>>;


const METHOD_TO_DATASET: Record<keyof DataSource, string> = {
  getProviderNames: 'provider-names',
  getDatasetTechnologyNames: 'technology-names',
  getOntologyTreeModel: 'ontology-tree-model',
  getReferenceOrgans: 'reference-organs',
  getTissueBlockResults: 'tissue-blocks',
  getAggregateResults: 'aggregate-results',
  getOntologyTermOccurences: 'ontology-term-occurences',
  getScene: 'scene',
  getReferenceOrganScene: 'reference-organ-scene'
};

const SPATIAL_SCENE_NODE_REVIVER = (nodes: SpatialSceneNode[]) => nodes.map(node => ({
  ...node,
  transformMatrix: new Matrix4(node.transformMatrix)
}));

const DATA_REVIVERS: { [K in keyof DataSource]?: ApiEndpointDataReviver<K> } = {
  getScene: SPATIAL_SCENE_NODE_REVIVER,
  getReferenceOrganScene: SPATIAL_SCENE_NODE_REVIVER
};


@Injectable({
  providedIn: 'root'
})
export class ApiEndpointDataSourceService extends ForwardingDataSource {
  constructor(
    private readonly globalConfig: GlobalConfigState<ApiEndpointDataSourceOptions>,
    private readonly http: HttpClient
  ) {
    super();
  }

  protected getDataset<K extends keyof DataSource>(method: K): string {
    return METHOD_TO_DATASET[method];
  }

  protected getReviver<K extends keyof DataSource>(
    method: K
  ): ApiEndpointDataReviver<K> | undefined {
    return DATA_REVIVERS[method] as ApiEndpointDataReviver<K>;
  }

  protected encodeArguments<K extends keyof DataSource>(
    _method: K, args: Parameters<DataSourceMethod<K>>
  ): HttpParams {
    if (args.length === 1) {
      return defaultEncodeArguments(args[0] as Filter ?? {});
    } else if (args.length === 2) {
      return defaultEncodeArguments({ ...args[1], organIri: args[0] });
    }

    return new HttpParams();
  }

  @Cacheable({ maxCacheCount: 16 })
  protected forwardCall<K extends keyof DataSource>(
    method: K, ...args: Parameters<DataSourceMethod<K>>
  ): Observable<DataSourceDataType<K>> {
    const { globalConfig, http } = this;
    const dataset = this.getDataset(method);
    const reviver = this.getReviver(method);
    const params = this.encodeArguments(method, args);

    return globalConfig.getOption('remoteApiEndpoint').pipe(
      map(endpoint => `${endpoint}/${dataset}`),
      switchMap(url => http.get<DataSourceDataType<K>>(url, {
        params: this.withToken(params),
        responseType: 'json'
      })),
      map(data => reviver?.(data) ?? data)
    );
  }

  private withToken(params: HttpParams): HttpParams {
    const { globalConfig: { snapshot: { hubmapToken } } } = this;
    return hubmapToken ? params.set('token', hubmapToken) : params;
  }
}
