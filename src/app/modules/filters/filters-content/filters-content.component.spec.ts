import { Shallow } from 'shallow-render';

import { FiltersContentComponent } from './filters-content.component';
import { FiltersContentModule } from './filters-content.module';

describe('FiltersContentComponent', () => {
  let shallow: Shallow<FiltersContentComponent>;

  beforeEach(() => {
    shallow = new Shallow(FiltersContentComponent, FiltersContentModule);
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
});
