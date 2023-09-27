import { Injectable } from '@angular/core';
import { Matrix4 } from '@math.gl/core';
import {
  AggregateResult, Filter, OntologyTreeModel, OntologyTreeNode, SpatialEntity, SpatialSceneNode, TissueBlockResult,
} from 'ccf-database';
import { DatabaseStatus, DefaultService, MinMax, SpatialSearch, SpatialSceneNode as RawSpatialSceneNode } from 'ccf-openapi/angular-client';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Cacheable } from 'ts-cacheable';

import { GlobalConfigState } from '../../config/global-config.state';
import { DataSource } from './data-source';


export interface ApiEndpointDataSourceOptions {
  remoteApiEndpoint: string;
  hubmapToken?: string;
}

// Not exported from ts-cacheable!?
type IObservableCacheConfig = NonNullable<Parameters<typeof Cacheable>[0]>;

type RequestMethod<P, T> = (params: P) => Observable<T>;
type DataReviver<T, U> = (data: T) => U;

interface DefaultParams {
  token?: string;
}

interface FilterParams {
  age?: MinMax;
  ageRange?: string;
  bmi?: MinMax;
  bmiRange?: string;
  ontologyTerms?: string[];
  cellTypeTerms?: string[];
  providers?: string[];
  sex?: 'both' | 'female' | 'male';
  technologies?: string[];
  spatial?: SpatialSearch[];
}


// Cache config
const buster$ = new Subject<unknown>();

const CACHE_CONFIG_NO_PARAMS: IObservableCacheConfig = {
  cacheBusterObserver: buster$
};

const CACHE_CONFIG_PARAMS: IObservableCacheConfig = {
  cacheBusterObserver: buster$,
  maxCacheCount: 4
};


// Utility
function cast<T>(): (data: unknown) => T {
  return data => data as T;
}

function rangeToMinMax(
  range: [number, number] | undefined,
  low: number, high: number
): MinMax | undefined {
  return range ? {
    min: range[0] > low ? range[0] : undefined,
    max: range[1] < high ? range[1] : undefined
  } : undefined;
}

function filterToParams(filter?: Filter): FilterParams {
  return {
    age: rangeToMinMax(filter?.ageRange, 1, 110),
    bmi: rangeToMinMax(filter?.bmiRange, 13, 83),
    sex: filter?.sex?.toLowerCase?.() as FilterParams['sex'],
    ontologyTerms: filter?.ontologyTerms,
    cellTypeTerms: filter?.cellTypeTerms,
    providers: filter?.tmc,
    technologies: filter?.technologies,
    spatial: filter?.spatialSearches
  };
}

function spatialSceneNodeReviver(nodes: RawSpatialSceneNode[]): SpatialSceneNode[] {
  return nodes.map(node => ({
    ...(node as SpatialSceneNode),
    transformMatrix: new Matrix4(node.transformMatrix ?? [])
  }));
}


@Injectable({
  providedIn: 'root'
})
export class ApiEndpointDataSourceService implements DataSource {
  constructor(
    private readonly api: DefaultService,
    private readonly globalConfig: GlobalConfigState<ApiEndpointDataSourceOptions>
  ) {
    globalConfig.getOption('hubmapToken').subscribe(buster$);
  }

  getDatabaseStatus(): Observable<DatabaseStatus> {
    return this.doRequest(params => this.api.dbStatus(params));
  }

  @Cacheable(CACHE_CONFIG_NO_PARAMS)
  getProviderNames(): Observable<string[]> {
    return this.doRequest(params => this.api.providerNames(params));
  }

  @Cacheable(CACHE_CONFIG_NO_PARAMS)
  getDatasetTechnologyNames(): Observable<string[]> {
    return this.doRequest(params => this.api.technologyNames(params));
  }

  @Cacheable(CACHE_CONFIG_NO_PARAMS)
  getOntologyTreeModel(): Observable<OntologyTreeModel> {
    return this.doRequest(
      params => this.api.ontologyTreeModel(params),
      undefined, {}, cast<OntologyTreeModel>()
    );
  }

  @Cacheable(CACHE_CONFIG_NO_PARAMS)
  getCellTypeTreeModel(): Observable<OntologyTreeModel> {
    return this.doRequest(
      params => this.api.cellTypeTreeModel(params),
      undefined, {}, cast<OntologyTreeModel>()
    );
  }

  // TODO: Remove mock code when this.api.biomarkerTreeModel is available
  formBiomarkerNode(id,parent,children,nodeType=''): OntologyTreeNode {
    return {
      ['@id']: id,
      id: id,
      label: id,
      parent: parent??'',
      children: children??[],
      synonymLabels: [],
      ['@type']: 'OntologyTreeNode',
      nodeType: nodeType
    };
  }

  /**
   * Get the cell type tree model.
   *
   * @returns An observable emitting the results.
   */
  @Cacheable(CACHE_CONFIG_NO_PARAMS)
  getBiomarkersTreeModel(): Observable<OntologyTreeModel> {
    const a= {
      root:'biomarkers',
      nodes: {
        'biomarker1' : this.formBiomarkerNode('biomarker1','biomarkers',[],'gene'),
        'biomarker2' : this.formBiomarkerNode('biomarker2','biomarkers',[],'gene'),
        'biomarker3' : this.formBiomarkerNode('biomarker3','biomarkers',[],'protein'),
        'biomarker4' : this.formBiomarkerNode('biomarker4','biomarkers',[],'protein'),
        'biomarker5' : this.formBiomarkerNode('biomarker5','biomarkers',[],'lipid'),
        'biomarker6' : this.formBiomarkerNode('biomarker6','biomarkers',[],'lipid'),
        'biomarkers' : this.formBiomarkerNode('biomarkers','',['biomarker1','biomarker2','biomarker3','biomarker4','biomarker5','biomarker6']),
      }
    };
    return of(a as OntologyTreeModel);
  }

  // TODO: Use this code when this.api.biomarkerTreeModel is available
  // @Cacheable(CACHE_CONFIG_NO_PARAMS)
  // getBiomarkersTreeModel(): Observable<OntologyTreeModel> {
  //   return this.doRequest(
  //     params => this.api.biomarkerTreeModel(params),
  //     undefined, {}, cast<OntologyTreeModel>()
  //   );
  // }

  @Cacheable(CACHE_CONFIG_NO_PARAMS)
  getReferenceOrgans(): Observable<SpatialEntity[]> {
    return this.doRequest(
      params => this.api.referenceOrgans(params),
      undefined, {}, cast<SpatialEntity[]>()
    );
  }

  @Cacheable(CACHE_CONFIG_PARAMS)
  getTissueBlockResults(filter?: Filter): Observable<TissueBlockResult[]> {
    return this.doRequest(
      params => this.api.tissueBlocks(params),
      filter, {}, cast<TissueBlockResult[]>()
    );
  }

  @Cacheable(CACHE_CONFIG_PARAMS)
  getAggregateResults(filter?: Filter): Observable<AggregateResult[]> {
    return this.doRequest(
      params => this.api.aggregateResults(params),
      filter
    );
  }

  @Cacheable(CACHE_CONFIG_PARAMS)
  getOntologyTermOccurences(filter?: Filter): Observable<Record<string, number>> {
    return this.doRequest(
      params => this.api.ontologyTermOccurences(params),
      filter
    );
  }

  @Cacheable(CACHE_CONFIG_PARAMS)
  getCellTypeTermOccurences(filter?: Filter): Observable<Record<string, number>> {
    return this.doRequest(
      params => this.api.cellTypeTermOccurences(params),
      filter
    );
  }

  @Cacheable(CACHE_CONFIG_PARAMS)
  getBiomarkersTermOccurences(_filter?: Filter): Observable<Record<string, number>> {
    return of({
      'biomarkers': 6,
      'biomarker1' : 1,
      'biomarker2' : 1,
      'biomarker3' :1,
      'biomarker4' : 1,
      'biomarker5' : 1,
      'biomarker6': 1
    });
    // return this.doRequest(
    //   params => this.api.biomarkerTermOccurences(params),
    //   filter
    // );
  }

  @Cacheable(CACHE_CONFIG_PARAMS)
  getScene(filter?: Filter): Observable<SpatialSceneNode[]> {
    return this.doRequest(
      params => this.api.scene(params),
      filter, {}, spatialSceneNodeReviver
    );
  }

  @Cacheable(CACHE_CONFIG_PARAMS)
  getReferenceOrganScene(organIri: string, filter?: Filter): Observable<SpatialSceneNode[]> {
    return this.doRequest(
      params => this.api.referenceOrganScene(params),
      filter, { organIri }, spatialSceneNodeReviver
    );
  }

  private doRequest<T, P>(
    method: RequestMethod<DefaultParams & FilterParams & P, T>,
    filter?: Filter | undefined,
    params?: P
  ): Observable<T>;
  private doRequest<T, P, U>(
    method: RequestMethod<DefaultParams & FilterParams & P, T>,
    filter: Filter | undefined,
    params: P | undefined,
    reviver: DataReviver<T, U>
  ): Observable<U>;
  private doRequest<P>(
    method: RequestMethod<unknown, unknown>,
    filter: Filter | undefined,
    params?: P,
    reviver?: DataReviver<unknown, unknown>
  ): Observable<unknown> {
    const { api, globalConfig } = this;
    const requestParams = { ...filterToParams(filter), ...params };

    return combineLatest([
      globalConfig.getOption('remoteApiEndpoint'),
      globalConfig.getOption('hubmapToken')
    ]).pipe(
      take(1),
      tap(([endpoint, token]) => {
        api.configuration.basePath = endpoint;
        if (token) {
          requestParams['token'] = token;
        }
      }),
      switchMap(() => method(requestParams)),
      map(data => reviver ? reviver(data) : data)
    );
  }
}
