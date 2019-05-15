import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { OntologyNode } from '../../state/ontology/ontology.model';
import { OntologyState } from '../../state/ontology/ontology.state';

/**
 * Search result interface type for the search results
 */
export interface SearchResult {
  index: number; // ensures order of search-results
  displayLabel: string[]; // label to be displayed in the view
  node: OntologyNode; // instance of OntologyNode, provides data associated with a search result
}

/**
 * Injectable OntologySearchService responsible for search result computations
 */
@Injectable({
  providedIn: 'root'
})
export class OntologySearchService {
  /**
   * ontology state
   */
  @Select(OntologyState.nodes)
  stateObservable: Observable<OntologyNode[]>;
  /**
   * An array of all Ontology nodes fetched from the state
   */
  ontologyNodes: OntologyNode[] = [];

  /**
   * Creates an instance of ontology search service,
   * subscribes to the changes in the ontology state
   */
  constructor() {
    this.stateObservable.subscribe((ontologyNodes) => {
      this.ontologyNodes = ontologyNodes;
    });
  }

  /**
   * Searches the ontology with the search-term
   * @param value the search term
   * @returns an array of search-results
   */
  filter(value: string): SearchResult[] {
    const searchValue = typeof value === 'string' && value.length && value.toLowerCase();
    const searchResults = new Map<string, SearchResult>();

    if (this.ontologyNodes) {
      this.ontologyNodes.forEach((node) => {
        const condition = node.label.toLowerCase().includes(searchValue);

        if (condition && !searchResults.get(node.id)) {
          searchResults.set(node.id, {
            index: this.getIndexOfMatch(node.label, searchValue),
            displayLabel: this.formatLabel(node.label, searchValue),
            node: node
          });
        } else {
          const match = node.synonymLabels.find((label) => label.toLowerCase().includes(searchValue));

          if (match && !searchResults.get(node.id)) {
            searchResults.set(node.id, {
              index: this.getIndexOfMatch(node.label + ' (' + match + ')', searchValue),
              displayLabel: this.formatLabel(node.label + ' (' + match + ')', searchValue),
              node: node
            });
          }
        }
      });
    }

    return Array.from(searchResults.values());
  }


  getIndexOfMatch(label: string, searchValue: string) {
    return label.toLowerCase().indexOf(searchValue);
  }

  /**
   * Formats label based on where the search-term was found in the OntologyNode
   * @param label label or first synonym-label of OntologyNode which has the search-term
   * @param searchValue search-term
   * @returns an array in the form of [prefix, search-term, suffix]
   */
  formatLabel(label: string, searchValue: string): string[] {
    const index  = this.getIndexOfMatch(label, searchValue);
    return [
      label.substr(0, index),
      label.substr(index, searchValue.length),
      label.substr(index + searchValue.length, label.length)
    ];
  }
}
