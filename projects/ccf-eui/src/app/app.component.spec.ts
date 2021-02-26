import { NgModule } from '@angular/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Shallow } from 'shallow-render';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { HeaderComponent } from './core/header/header.component';
import { DataState } from './core/store/data/data.state';
import { StoreModule } from './core/store/store.module';
import { FiltersPopoverComponent } from './modules/filters/filters-popover/filters-popover.component';
import { DrawerComponent } from './shared/components/drawer/drawer/drawer.component';

import { ThemingService } from './core/services/theming/theming.service';

@NgModule({})
class EmptyModule {}


describe('AppComponent', () => {
  let shallow: Shallow<AppComponent>;
  let left: jasmine.SpyObj<DrawerComponent>;
  let right: jasmine.SpyObj<DrawerComponent>;
  let filterbox: jasmine.SpyObj<FiltersPopoverComponent>;

  beforeEach(() => {
    shallow = new Shallow(AppComponent, AppModule)
      .replaceModule(BrowserAnimationsModule, NoopAnimationsModule)
      .replaceModule(StoreModule, EmptyModule)
      .mock(DataState, {
        filter$: of(),
        listData$: of(),
        aggregateData$: of(),
        queryStatus$: of(),
        termOccurencesData$: of(),
        updateFilter: () => undefined
      })
      .mock(ThemingService, {
        getTheme: () => 'theme'
      });

    left = jasmine.createSpyObj<DrawerComponent>('Drawer', ['open', 'closeExpanded']);
    right = jasmine.createSpyObj<DrawerComponent>('Drawer', ['open', 'closeExpanded']);
    filterbox = jasmine.createSpyObj<FiltersPopoverComponent>('FiltersPopover', ['removeBox']);
  });

  it('should close the left drawer when reset() is called', async () => {
    const { instance } = await shallow.render();
    instance.reset(left, right, filterbox);

    expect(left.open).toHaveBeenCalled();
    expect(left.closeExpanded).toHaveBeenCalled();
  });

  it('should close the right drawer when reset() is called', async () => {
    const { instance } = await shallow.render();
    instance.reset(left, right, filterbox);

    expect(right.open).toHaveBeenCalled();
    expect(right.closeExpanded).toHaveBeenCalled();
  });

  it('should close the filters box when reset() is called', async () => {
    const { instance } = await shallow.render();
    instance.reset(left, right, filterbox);

    expect(filterbox.removeBox).toHaveBeenCalled();
  });

  it('should trigger the reset() method when the refresh button is clicked', async () => {
    const { instance, findComponent } = await shallow.render();
    const header = findComponent(HeaderComponent);
    const spy = spyOn(instance, 'reset');

    header.refreshClicked.emit();
    expect(spy).toHaveBeenCalled();
  });
});
