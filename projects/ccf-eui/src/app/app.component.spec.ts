import { NgModule } from '@angular/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Shallow } from 'shallow-render';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { DataState } from './core/store/data/data.state';
import { StoreModule } from './core/store/store.module';
import { FiltersPopoverComponent } from './modules/filters/filters-popover/filters-popover.component';
import { DrawerComponent } from './shared/components/drawer/drawer/drawer.component';

import { ThemingService } from './core/services/theming/theming.service';
import { OrganInfo } from 'ccf-shared';

@NgModule({})
class EmptyModule {}


describe('AppComponent', () => {
  let shallow: Shallow<AppComponent>;
  let left: jasmine.SpyObj<DrawerComponent>;
  let right: jasmine.SpyObj<DrawerComponent>;
  let filterbox: jasmine.SpyObj<FiltersPopoverComponent>;
  const testFilter = { sex: 'Both', ageRange: [5, 99], bmiRange: [30, 80] };

  beforeEach(() => {
    shallow = new Shallow(AppComponent, AppModule)
      .replaceModule(BrowserAnimationsModule, NoopAnimationsModule)
      .replaceModule(StoreModule, EmptyModule)
      .mock(DataState, {
        filter$: of(testFilter),
        listData$: of(),
        aggregateData$: of(),
        queryStatus$: of(),
        termOccurencesData$: of(),
        sceneData$: of(),
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

  it('should change the selected organs', async () => {
    const { instance } = await shallow.render();
    const organ = {
      src: '',
      name: 'testOrgan',
    } as OrganInfo;
    instance.changeOrgans([organ]);
    expect(instance.selectedOrgans).toEqual([organ]);
  });

  it('should call reset when refresh button is clicked', async () => {
    const { find, instance } = await shallow.render();
    const spy = spyOn(instance, 'reset');
    const resetButton = find('.refresh');
    resetButton.triggerEventHandler('click', {});
    expect(spy).toHaveBeenCalled();
  });

  it('should display the current sex', async () => {
    const { find } = await shallow.render();
    const label = find('.filter-text .sex').nativeElement as HTMLElement;
    expect(label.textContent).toBe('Sex: Both');
  });

  it('should display the current age range', async () => {
    const { find } = await shallow.render();
    const label = find('.filter-text .age').nativeElement as HTMLElement;
    expect(label.textContent).toBe('Age: 5-99');
  });

  it('should display the current BMI range', async () => {
    const { find } = await shallow.render();
    const label = find('.filter-text .bmi').nativeElement as HTMLElement;
    expect(label.textContent).toBe('BMI: 30-80');
  });
});
