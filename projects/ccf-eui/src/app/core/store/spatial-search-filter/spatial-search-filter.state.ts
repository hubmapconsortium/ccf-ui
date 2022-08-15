import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { append, removeItem } from '@ngxs/store/operators';
import { SpatialSearch } from 'ccf-database';
import { SpatialSearchListItem } from 'ccf-shared';

import { Sex } from '../../../shared/components/spatial-search-config/spatial-search-config.component';
import { AddSearch, RemoveSearch, SetSelectedSearches } from './spatial-search-filter.actions';


export interface SpatialSearchFilterItem extends SpatialSearchListItem {
  id: string;
  search: SpatialSearch;
  sex: Sex;
}

export type SpatialSearchFilterModel = SpatialSearchFilterItem[];


@State<SpatialSearchFilterModel>({
  name: 'spatialSearchFilter',
  defaults: []
})
@Injectable()
export class SpatialSearchFilterState {
  @Action(AddSearch)
  addSearch(ctx: StateContext<SpatialSearchFilterModel>, { sex, organName, search }: AddSearch): void {
    ctx.setState(append([this.createItem(sex, organName, search)]));
  }

  @Action(RemoveSearch)
  removeSearch(ctx: StateContext<SpatialSearchFilterModel>, { id }: RemoveSearch): void {
    ctx.setState(removeItem(item => item?.id === id));
  }

  @Action(SetSelectedSearches)
  setSelectedSearches(ctx: StateContext<SpatialSearchFilterModel>, { items }: SetSelectedSearches): void {
    const selectedByIds = new Map(items.map(item => [item.id, item]));
    const oldItems = ctx.getState();
    const newItems = oldItems.map(item =>
      selectedByIds.get(item.id) ??
      (item.selected ? { ...item, selected: false } : item)
    );

    ctx.setState(newItems);
  }

  private createItem(sex: Sex, name: string, search: SpatialSearch): SpatialSearchFilterItem {
    return {
      id: this.createItemId(search),
      selected: true,
      description: this.createItemDescription(sex, name, search),
      sex,
      search
    };
  }

  private createItemId(search: SpatialSearch): string {
    const { x, y, z, radius, target } = search;
    return `${target}-${radius}-${x},${y},${z}`;
  }

  private createItemDescription(sex: Sex, name: string, search: SpatialSearch): string {
    const capitalize = (value: string) => value.slice(0, 1).toUpperCase() + value.slice(1);
    const { x, y, z, radius } = search;

    return `${capitalize(sex)}, ${capitalize(name)}, ${radius.toFixed(1)} mm, X: ${x.toFixed(1)}, Y: ${y.toFixed(1)}, Z: ${z.toFixed(1)}`;
  }
}
