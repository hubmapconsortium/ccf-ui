import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Shallow } from 'shallow-render';

import { FiltersContentComponent } from './filters-content.component';
import { FiltersContentModule } from './filters-content.module';


describe('FiltersContentComponent', () => {
  let shallow: Shallow<FiltersContentComponent>;

  const mockMatDialog = {
    open(..._args: unknown[]): MatDialogRef<unknown, unknown> {
      return undefined as unknown as MatDialogRef<unknown, unknown>;
    }
  };

  beforeEach(() => {
    shallow = new Shallow(FiltersContentComponent, FiltersContentModule)
      .provide({ provide: MatDialog, useValue: {} })
      .mock(MatDialog, mockMatDialog);
  });

  it('should update the filter object with the passed in filter and value', async () => {
    const { instance } = await shallow.render({ bind: {} });
    instance.filters = {};

    instance.updateFilter('value', 'test');
    expect(instance.filters.test).toBe('value');
  });

  it('should emit the filter change when updateFilter is called', async () => {
    const { instance, outputs } = await shallow.render({ bind: {} });
    instance.updateFilter('value', 'test');

    expect(outputs.filtersChange.emit).toHaveBeenCalled();
  });

  it('should call applyButtonClick when the apply button is clicked', async () => {
    const { find, instance } = await shallow.render({ bind: {} });
    const spy = spyOn(instance, 'applyButtonClick');
    const button = find('.outline-button');

    button.triggerEventHandler('click', {});
    expect(spy).toHaveBeenCalled();
  });

  it('should emit the filters when applyButtonClick is called', async () => {
    const { instance, outputs } = await shallow.render({ bind: {} });
    instance.applyButtonClick();

    expect(outputs.applyFilters.emit).toHaveBeenCalled();
  });

  it('should refresh all filter settings', async () => {
    const { instance } = await shallow.render({ bind: {} });
    instance.refreshFilters();
    expect(instance.filters.sex).toEqual('Both');
    expect(instance.filters.ageRange).toEqual([1, 110]);
    expect(instance.filters.bmiRange).toEqual([13, 83]);
    expect(instance.filters.technologies).toEqual([]);
    expect(instance.filters.tmc).toEqual([]);
  });
});
