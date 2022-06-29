import { SpatialSearch } from './spatial-search-filter.models';


export class AddSearch {
  static readonly type = '[Spatial Search Filter] Add';

  constructor(readonly search: SpatialSearch) { }
}

export class RemoveSearch {
  static readonly type = '[Spatial Search Filter] Remove';

  constructor(readonly search: SpatialSearch) { }
}
