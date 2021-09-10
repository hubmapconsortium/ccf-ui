import { Injectable } from '@angular/core';
import { AggregateResult, Filter } from 'ccf-database';
import { ALL_ORGANS, OrganInfo } from 'ccf-shared';
import { Observable, of } from 'rxjs';

import { DataSourceService } from '../data-source/data-source.service';


@Injectable({
  providedIn: 'root'
})
export class OrganLookupService {
  private readonly organs = ALL_ORGANS;

  constructor(private readonly source: DataSourceService) { }

  getOrganInfo(iri: string, side?: OrganInfo['side'], _sex: Filter['sex'] = 'Female'): Observable<OrganInfo | undefined> {
    let info = this.organs.find(item => item.id === iri);
    if (!info) {
      return of(undefined);
    }

    if (info.side && side && info.side !== side) {
      const organ = info.organ;
      info = this.organs.find(item => item.organ === organ && item.side === side);
    }

    return of(info);
  }

  getOrganStats(info: OrganInfo, sex: Filter['sex'] = 'Female'): Observable<AggregateResult[]> {
    const filter: Partial<Filter> = { ontologyTerms: [info.id!], sex };
    return this.source.getAggregateResults(filter as Filter);
  }
}
