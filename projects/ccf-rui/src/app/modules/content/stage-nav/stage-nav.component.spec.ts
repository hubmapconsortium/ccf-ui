import { Shallow } from 'shallow-render';

import { StageNavComponent } from './stage-nav.component';
import { StageNavModule } from './stage-nav.module';

describe('StageNavComponent', () => {
  let shallow: Shallow<StageNavComponent>;

  beforeEach(() => {
    shallow = new Shallow(StageNavComponent, StageNavModule);
    const testTopBar = document.createElement('div');
    testTopBar.setAttribute('class', ('top-bar'));
    document.body.append(testTopBar);
  });

  it('should properly update the side variable when updateSide is called.', async () => {
    const { instance } = await shallow.render({ bind: { side: 'left' }});
    instance.updateSide('right');

    expect(instance.side).toEqual('right');
  });

  it('should emit the new side selection whenever updateSide is called.', async () => {
    const { instance, outputs } = await shallow.render();

    instance.updateSide('left');
    expect(outputs.sideChange.emit).toHaveBeenCalled();
  });

  it('should properly update the view3D variable when updateView is called.', async () => {
    const { instance } = await shallow.render({ bind: { view3D: true }});
    instance.updateView(false);

    expect(instance.view3D).toBeFalse();
  });

  it('should emit the new view selection when updateView is called', async () => {
    const { instance, outputs } = await shallow.render();
    instance.updateView(true);

    expect(outputs.view3DChange.emit).toHaveBeenCalled();
  });

  it('should hide the stage nav menu if user clicks outside it', async () => {
    const { instance } = await shallow.render();
    instance.stageNavHidden = false;

    const testHtmlElement: HTMLElement = document.createElement('div');
    instance.handleClick(testHtmlElement);

    expect(instance.stageNavHidden).toBeTrue();
  });

  it('should not hide the stage nav menu if user clicks inside it', async () => {
    const { instance } = await shallow.render();
    instance.stageNavHidden = false;

    const testHtmlElement: HTMLElement = document.createElement('div');
    instance.options.nativeElement.append(testHtmlElement);
    instance.handleClick(testHtmlElement);

    expect(instance.stageNavHidden).toBeFalse();
  });
});
