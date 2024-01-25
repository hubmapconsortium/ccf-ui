import { Shallow } from 'shallow-render';

import { StageNavComponent } from './stage-nav.component';
import { StageNavModule } from './stage-nav.module';

describe('StageNavComponent', () => {
  let shallow: Shallow<StageNavComponent>;

  beforeEach(() => {
    shallow = new Shallow(StageNavComponent, StageNavModule);
  });

  it('should properly update the side variable when updateSide is called.', async () => {
    const { instance } = await shallow.render({ bind: { side: 'left' } });
    instance.updateSide('right');

    expect(instance.side).toEqual('right');
  });

  it('should emit the new side selection whenever updateSide is called.', async () => {
    const { instance, outputs } = await shallow.render();

    instance.updateSide('left');
    expect(outputs.sideChange.emit).toHaveBeenCalled();
  });

  it('should call updateView with true if 3D is selected.', async () => {
    const { instance } = await shallow.render();
    const spy = spyOn(instance, 'updateView');

    instance.updateSide('3D');
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should properly update the view3D variable when updateView is called.', async () => {
    const { instance } = await shallow.render({ bind: { view3D: true } });
    instance.updateView(false);

    expect(instance.view3D).toBeFalse();
  });

  it('should emit the new view selection when updateView is called', async () => {
    const { instance, outputs } = await shallow.render();
    instance.updateView(true);

    expect(outputs.view3DChange.emit).toHaveBeenCalled();
  });

  it('should toggle the stage nav menu when the label is clicked', async () => {
    const { instance, find } = await shallow.render();
    const el = find('.dropdown-label');
    instance.useDropdownMenu = true;
    instance.handleClick(el.nativeElement as HTMLElement);

    expect(instance.isDropdownHidden).toBeFalse();
  });

  it('should hide the stage nav menu if user clicks outside it', async () => {
    const { instance } = await shallow.render();
    instance.isDropdownActive = true;
    instance.isDropdownHidden = false;
    instance.handleClick(document.body);

    expect(instance.isDropdownHidden).toBeTrue();
  });

  it('should not hide the stage nav menu if user clicks inside it', async () => {
    const { instance, find } = await shallow.render();
    const el = find('.input-group');
    instance.isDropdownHidden = false;
    instance.handleClick(el.nativeElement as HTMLElement);

    expect(instance.isDropdownHidden).toBeFalse();
  });
});
