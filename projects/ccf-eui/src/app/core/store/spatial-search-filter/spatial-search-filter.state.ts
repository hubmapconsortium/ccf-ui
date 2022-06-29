import { Action, State, StateContext } from '@ngxs/store';
import { append, removeItem } from '@ngxs/store/operators';

import { AddSearch, RemoveSearch } from './spatial-search-filter.actions';
import { SpatialSearch } from './spatial-search-filter.models';


export type SpatialSearchFilterModel = SpatialSearch[];


@State<SpatialSearchFilterModel>({
  name: 'spatialSearchFilter',
  defaults: []
})
export class SpatialSearchFilterState {
  @Action(AddSearch)
  addSearch(ctx: StateContext<SpatialSearchFilterModel>, { search }: AddSearch): void {
    ctx.setState(append([search]));
  }

  @Action(RemoveSearch)
  removeSearch(ctx: StateContext<SpatialSearchFilterModel>, { search }: RemoveSearch): void {
    ctx.setState(removeItem(item => item === search));
  }
}
