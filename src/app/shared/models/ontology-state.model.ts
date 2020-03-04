import { OntologyNode } from './ontology-node.model';

export interface OntologyStateModel {
  /**
   * Identifier of the root node.
	  */
  root: string;

  /**
	  * Hash table of nodes.
	  */
  nodes: { [id: string]: OntologyNode };
  }
