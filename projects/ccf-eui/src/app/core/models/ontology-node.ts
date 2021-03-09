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
  parent: string;

  /**
   * An array of child identifiers.
   */
  children: string[];

  /**
   * Labels for the synonyms of the label of this node.
   */
  synonymLabels: string[];
}
