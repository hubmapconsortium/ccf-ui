
/**
 * Search state model.
 */
export interface SearchStateModel {
  /**
   * The id of the ontology node
   */
  ontologyNodeId: string | undefined;

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
}
