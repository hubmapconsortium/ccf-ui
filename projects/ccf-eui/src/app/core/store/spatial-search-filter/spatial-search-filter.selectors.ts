import { Selector } from '@ngxs/store';
import { SpatialSearch } from 'ccf-database';
import { SpatialSearchFilterItem, SpatialSearchFilterModel, SpatialSearchFilterState } from './spatial-search-filter.state';


export class SpatialSearchFilterSelectors {
  @Selector([SpatialSearchFilterState])
  static items(state: SpatialSearchFilterModel): SpatialSearchFilterItem[] {
    return state;
  }

  @Selector([SpatialSearchFilterSelectors.items])
  static searches(items: SpatialSearchFilterItem[]): SpatialSearch[] {
    return items.map(item => item.search);
  }
}
