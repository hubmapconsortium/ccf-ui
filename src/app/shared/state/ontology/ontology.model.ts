/**
 * A node in the ontology tree.
 */
export interface OntologyNode {
  /**
   * The unique identifier of this node.
   */
  id: string;

  /**
   * The identifier of the parent node. `undefined` if this is the root node.
   */
  parent: string | undefined;

  /**
   * An array of child identifiers.
   */
  children: string[];

  // Data

  /**
   * Description of this item.
   */
  description: string;

  /**
   * Url of the tile displayed in the tissues browser.
   */
  tileUrl: string;
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
