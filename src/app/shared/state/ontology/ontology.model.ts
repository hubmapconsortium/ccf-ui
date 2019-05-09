/**
 * A node in the ontology tree.
 */
export interface OntologyNode {
  /**
   * The unique identifier of this node.
   */
  id: string;

  /**
   * Label for this ontology node.
   */
  label: string;

  /**
   * The identifier of the parent node. `undefined` if this is the root node.
   */
  parent: string | undefined;

  /**
   * An array of child identifiers.
   */
  children: string[];

  /**
   * Labels for the synonyms of the label of this node.
   */
  synonymLabels: string[];
}

/**
 * A flat representation of an ontology tree.
 */
export interface OntologyStateModel {
  /**
   * Identifier of the root node.
   */
  root: string;

  /**
   * Identifiers of all nodes in the hash table.
   */
  ids: string[];

  /**
   * Hash table of nodes.
   */
  nodes: { [id: string]: OntologyNode };
}
