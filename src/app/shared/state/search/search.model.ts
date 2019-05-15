import { OntologyNode } from '../ontology/ontology.model';

/**
 * Search state model.
 */
export interface SearchStateModel {
  /**
   * The gender (or undefined for any gender).
   */
  gender: 'male'| 'female' | undefined;

  /**
   * The age range.
   * An undefined value in the tuple incicates no lower/upper boundary for the range.
   */
  ageRange: [number | undefined, number | undefined];

  /**
   * A list of active TMCs.
   */
  tmc: string[];

  /**
   * A list of active technologies.
   */
  technologies: string[];

  /**
   * The currently selected anatomical location.
   */
  location: OntologyNode | undefined;
}
