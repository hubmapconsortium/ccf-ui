/**
 * Set/Unset the searched gender.
 */
export class SetGenderFilter {
  static readonly type = '[Search API] Set Gender Filter';
  constructor(readonly gender?: 'male' | 'female') { }
}

/**
 * Set/Unset the searched age range.
 */
export class SetAgeRangeFilter {
  static readonly type = '[Search API] Set Age Range Filter';
  constructor(readonly min?: number, readonly max?: number) { }
}

/**
 * Add a TMC to the search selection.
 */
export class SelectTMC {
  static readonly type = '[Search API] Select TMC';
  constructor(readonly tmc: string) { }
}

/**
 * Remove a TMC from the search selection.
 */
export class UnselectTMC {
  static readonly type = '[Search API] Unselect TMC';
  constructor(readonly tmc: string) { }
}

/**
 * Add a technology to the search selection.
 */
export class SelectTechnology {
  static readonly type = '[Search API] Select Technology';
  constructor(readonly technology: string) { }
}

/**
 * Remove a technology from the search selection.
 */
export class UnselectTechnology {
  static readonly type = '[Search API] Unselect Technology';
  constructor(readonly technology: string) { }
}
