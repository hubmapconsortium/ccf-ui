import { OntologyTreeNode } from 'ccf-database';

export interface OntologySelection {
  location: OntologyTreeNode | undefined;
  id: string;
  label: string;
}
