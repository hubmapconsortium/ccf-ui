import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { safeLoad } from 'js-yaml';
import { map as rxMap, shareReplay, filter as rxFilter } from 'rxjs/operators';
import { get } from 'lodash';

import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

import { OntologySearchTrie } from './ontology-search-trie';

export interface Ontology {
  id: string;
  label: string;
  synonymLabels: string[];
  parent: string;
}

@Injectable()
export class OntologySearchService {
  private ontologyUrl = environment.ontologyUrl;

  constructor(private http: HttpClient) {
    this.getOntology().subscribe(console.log);
  }

  private getOntology(): Observable<OntologySearchTrie> {
    return this.http.get(this.ontologyUrl, { responseType: 'text' }).pipe(
      rxMap<string, string[]>(results => safeLoad(results)),
      rxMap<string[], Ontology[]>(results => {
        return results.map(result => {
          return {
            id: result['@id'],
            label: result['http://www.w3.org/2000/01/rdf-schema#label'],
            synonymLabels: result['http://www.geneontology.org/formats/oboInOwl#hasExactSynonym'],
            parent: result['parent']
          };
        });
      }),
      rxMap(this.getTrie),
      shareReplay(1)
    );
  }

  getTrie(results: Ontology[]): OntologySearchTrie {
    const ontologySearchTrie = new OntologySearchTrie();
    results.forEach(result => {
      ontologySearchTrie.insert(get(result, ['label', '0', '@value']), result);
      if (result.synonymLabels) {
        ontologySearchTrie.insert(get(result, ['synonymLabels', '0', '@value']), result);
      }
    });
    console.log(ontologySearchTrie.startsWith('thor'));
    return ontologySearchTrie;
  }
}
