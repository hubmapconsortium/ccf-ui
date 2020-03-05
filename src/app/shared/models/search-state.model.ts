import { OntologyNode } from './ontology-node.model';

/**
 * Search state model.
 */
export interface SearchStateModel {
  /**
   * The currently selected anatomical location.
   */
  location: OntologyNode | undefined;
}
