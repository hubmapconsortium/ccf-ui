import { OntologyTreeNode } from 'ccf-database'; //TODO: replace with CellTypeTreeNode

export interface CellTypeSelection {
  location: OntologyTreeNode | undefined;
  id: string;
  label: string;
}
