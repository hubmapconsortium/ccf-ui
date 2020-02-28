import { OntologyNode } from './ontology-node.model';

export interface SearchResult {
  /** ensures order of search-results */
  index: number;
  /** label to be displayed in the view */
  displayLabel: string[];
  /**  instance of OntologyNode, provides data associated with a search result */
  node: OntologyNode;
}
