import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Shallow } from 'shallow-render';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { HeaderComponent } from './core/header/header.component';
import { FiltersPopoverComponent } from './modules/filters/filters-popover/filters-popover.component';
import { DrawerComponent } from './shared/components/drawer/drawer/drawer.component';


describe('AppComponent', () => {
  let shallow: Shallow<AppComponent>;
  let left: jasmine.SpyObj<DrawerComponent>;
  let right: jasmine.SpyObj<DrawerComponent>;
  let filterbox: jasmine.SpyObj<FiltersPopoverComponent>;

  beforeEach(() => {
    shallow = new Shallow(AppComponent, AppModule)
      .replaceModule(BrowserAnimationsModule, NoopAnimationsModule);
    left = jasmine.createSpyObj<DrawerComponent>('Drawer', ['open', 'closeExpanded', 'openExpanded']);
    right = jasmine.createSpyObj<DrawerComponent>('Drawer', ['open', 'closeExpanded', 'openExpanded']);
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

  it('should trigger the reset() method when the ccf-header is clicked', async () => {
    const { instance, findComponent } = await shallow.render();
    const header = findComponent(HeaderComponent);
    const spy = spyOn(instance, 'reset');

    header.logoClicked.emit();
    expect(spy).toHaveBeenCalled();
  });

  it('should expand the drawer if toggleFullScreen() is called', async () => {
    const { instance } = await shallow.render();
    instance.toggleFullScreen(right);
    expect(right.openExpanded).toHaveBeenCalled();
  });

  it('should return the drawer to normal state if toggleFullScreen() is called', async () => {
    const { instance } = await shallow.render();
    instance.fullscreenActive = true;
    instance.toggleFullScreen(right);
    expect(right.closeExpanded).toHaveBeenCalled();
  });
});
