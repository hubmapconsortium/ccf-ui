import { OntologyNode } from '../ontology/ontology.model';

/**
 * Set/Unset the searched gender.
 */
export class SetGenderFilter {
  /** Action type */
  static readonly type = '[Search API] Set Gender Filter';

  /**
   * Creates an instance of set gender filter.
   *
   * @param [gender] The gender male, female, or undefined for any gender.
   */
  constructor(readonly gender?: 'male' | 'female') { }
}

/**
 * Set/Unset the searched age range.
 */
export class SetAgeRangeFilter {
  /** Action type */
  static readonly type = '[Search API] Set Age Range Filter';

  /**
   * Creates an instance of set age range filter.
   *
   * @param [min] The minimum age (inclusive)
   * @param [max] The maximum age (inclusive)
   */
  constructor(readonly min?: number, readonly max?: number) { }
}

/**
 * Add a TMC to the search selection.
 */
export class SelectTMC {
  /** Action type */
  static readonly type = '[Search API] Select TMC';

  /**
   * Creates an instance of select tmc.
   *
   * @param tmc The TMC type to add.
   */
  constructor(readonly tmc: string) { }
}

/**
 * Remove a TMC from the search selection.
 */
export class UnselectTMC {
  /** Action type */
  static readonly type = '[Search API] Unselect TMC';

  /**
   * Creates an instance of unselect tmc.
   *
   * @param tmc The TMC type to remove.
   */
  constructor(readonly tmc: string) { }
}

/**
 * Add a technology to the search selection.
 */
export class SelectTechnology {
  /** Action type */
  static readonly type = '[Search API] Select Technology';

  /**
   * Creates an instance of select technology.
   *
   * @param technology The technology to add.
   */
  constructor(readonly technology: string) { }
}

/**
 * Remove a technology from the search selection.
 */
export class UnselectTechnology {
  /** Action type */
  static readonly type = '[Search API] Unselect Technology';

  /**
   * Creates an instance of unselect technology.
   *
   * @param technology The technology to remove.
   */
  constructor(readonly technology: string) { }
}

/**
 * Set the searched onotological location.
 */
export class SetLocation {
  /** Action type */
  static readonly type = '[Search API] Set Locations';

  /**
   * Creates an instance of set location.
   *
   * @param location The new location.
   */
  constructor(readonly location?: OntologyNode) { }
}
