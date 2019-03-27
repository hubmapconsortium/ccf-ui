export interface OntologyNode {
  id: string;
  parent: string;
  children: string[];
}

export interface OntologyStateModel {
  root: string;
  ids: string[];
  nodes: { [id: string]: OntologyNode };
}
