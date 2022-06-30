import { TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { Shallow } from 'shallow-render';

import { FiltersPopoverComponent } from './filters-popover.component';
import { FiltersPopoverModule } from './filters-popover.module';

describe('FiltersPopoverComponent', () => {
  let shallow: Shallow<FiltersPopoverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([], {})]
    });

    shallow = new Shallow(FiltersPopoverComponent, FiltersPopoverModule);
  });

  it('should toggle visibility', async () => {
    const { instance } = await shallow.render({ bind: {} });
    instance.filtersVisible = false;

    instance.toggleFilterVisible();
    expect(instance.filtersVisible).toBe(true);

    instance.toggleFilterVisible();
    expect(instance.filtersVisible).toBe(false);
  });

  it('should be able to set visibility to false', async () => {
    const { instance } = await shallow.render({ bind: {} });
    instance.filtersVisible = true;

    instance.removeBox();
    expect(instance.filtersVisible).toBe(false);
  });

  it('should set visibility to false when filters are applied', async () => {
    const { instance } = await shallow.render({ bind: {} });
    instance.filtersVisible = false;

    instance.applyFilters({});
    expect(instance.filtersVisible).toBe(false);
  });

  it('should emit filters when filters are applied', async () => {
    const { instance, outputs } = await shallow.render({ bind: {} });

    instance.applyFilters({});
    expect(outputs.filtersChange.emit).toHaveBeenCalled();
  });
});
