export class SetGenderFilter {
  static readonly type = '[Search API] Set Gender Filter';
  constructor(readonly gender: 'male' | 'female' | 'male-female') { }
}

export class SetAgeRangeFilter {
  static readonly type = '[Search API] Set Age Range Filter';
  constructor(readonly min?: number, readonly max?: number) { }
}

export class SelectTMC {
  static readonly type = '[Search API] Select TMC';
  constructor(readonly tmc: string) { }
}

export class UnselectTMC {
  static readonly type = '[Search API] Unselect TMC';
  constructor(readonly tmc: string) { }
}

export class SelectTechnology {
  static readonly type = '[Search API] Select Technology';
  constructor(readonly technology: string) { }
}

export class UnselectTechnology {
  static readonly type = '[Search API] Unselect Technology';
  constructor(readonly technology: string) { }
}
