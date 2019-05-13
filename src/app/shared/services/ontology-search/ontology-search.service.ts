import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { OntologyNode } from '../../state/ontology/ontology.model';
import { OntologyState } from '../../state/ontology/ontology.state';

export interface SearchResult {
  index: number;
  displayLabel: string[];
  node: OntologyNode;
}
@Injectable({
  providedIn: 'root'
})
export class OntologySearchService {
  /**
   * ontology state
   */
  @Select(OntologyState.nodes)
  stateObservable: Observable<OntologyNode[]>;
  private ontologyNodes: OntologyNode[] = [];

  constructor() {
    this.stateObservable.subscribe((ontologyNodes) => {
      this.ontologyNodes = ontologyNodes;
    });
  }

  filter(value: string): SearchResult[] {
    const filterValue = typeof value === 'string' && value.length && value.toLowerCase();
    const searchResults = new Map<string, SearchResult>();

    if (this.ontologyNodes) {
      this.ontologyNodes.forEach((node, index) => {
        const condition = node.label.toLowerCase().includes(filterValue);
        if (condition && !searchResults.get(node.id)) {
          searchResults.set(node.id, {
            index: index,
            displayLabel: this.formatLabel(node.label, filterValue),
            node: node
          });
        } else {
          const match = node.synonymLabels.find((label) => label.toLowerCase().includes(filterValue));
          if (match && !searchResults.get(node.id)) {
            searchResults.set(node.id, {
              index: index,
              displayLabel: this.formatLabel(node.label + ' (' + match + ')', filterValue),
              node: node
            });
          }
        }
      });
    }

    return Array.from(searchResults.values());
  }

  formatLabel(label: string, filterValue: string): string[] {
    const indexOfMatch = label.toLowerCase().indexOf(filterValue);
    return [
      label.substr(0, indexOfMatch),
      label.substr(indexOfMatch, filterValue.length),
      label.substr(indexOfMatch + filterValue.length, label.length)
    ];
  }

}
