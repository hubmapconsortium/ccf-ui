import { Injectable } from '@angular/core';
import {
  AggregateResult, Filter, OntologyTreeModel, SpatialEntity, SpatialSceneNode, TissueBlockResult,
} from 'ccf-database';
import { Observable } from 'rxjs';

import { DataSource } from './data-source';


@Injectable()
export abstract class DataSourceService implements DataSource {
  abstract getProviderNames(): Observable<string[]>;
  abstract getDatasetTechnologyNames(): Observable<string[]>;
  abstract getOntologyTreeModel(): Observable<OntologyTreeModel>;
  abstract getReferenceOrgans(): Observable<SpatialEntity[]>;

  abstract getTissueBlockResults(filter?: Filter): Observable<TissueBlockResult[]>;
  abstract getAggregateResults(filter?: Filter): Observable<AggregateResult[]>;
  abstract getOntologyTermOccurences(filter?: Filter): Observable<Record<string, number>>;
  abstract getScene(filter?: Filter): Observable<SpatialSceneNode[]>;
  abstract getReferenceOrganScene(organIri: string, filter?: Filter): Observable<SpatialSceneNode[]>;
}
