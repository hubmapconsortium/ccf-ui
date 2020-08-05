import { OntologyNode } from './ontology-node';

export interface OntologySelection {
  location: OntologyNode | undefined;
  id: string;
  label: string;
}
