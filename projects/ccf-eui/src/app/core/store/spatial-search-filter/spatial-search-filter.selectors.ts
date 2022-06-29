import { Selector } from '@ngxs/store';

import { SelectableSpatialSearch, SpatialSearch } from './spatial-search-filter.models';
import { SpatialSearchFilterModel, SpatialSearchFilterState } from './spatial-search-filter.state';


function capitalize(value: string): string {
  return value.slice(0, 1).toUpperCase() + value.slice(1);
}


export class SpatialSearchFilterSelectors {
  @Selector([SpatialSearchFilterState])
  static searches(state: SpatialSearchFilterModel): SpatialSearch[] {
    return state;
  }

  @Selector([SpatialSearchFilterSelectors.searches])
  static selectableSearches(searches: SpatialSearch[]): SelectableSpatialSearch[] {
    return searches.map(search => ({
      search,

      selected: false,
      description: this.createSearchDescription(search)
    }));
  }

  private static createSearchDescription(search: SpatialSearch): string {
    const { sex, organ: { name }, radius, position: { x, y, z } } = search;
    return `${capitalize(sex)}, ${capitalize(name)}, ${radius} mm, X: ${x}, Y: ${y}, Z: ${z}`;
  }
}
