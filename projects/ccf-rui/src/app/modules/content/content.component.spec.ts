import * as resizeSensorModule from 'css-element-queries';
import { from, of } from 'rxjs';
import { Shallow } from 'shallow-render';

import { ModelState } from '../../core/store/model/model.state';
import { PageState } from '../../core/store/page/page.state';
import { RegistrationState } from '../../core/store/registration/registration.state';
import { SceneState } from '../../core/store/scene/scene.state';
import { ContentComponent } from './content.component';
import { ContentModule } from './content.module';


describe('ContentComponent', () => {
  let shallow: Shallow<ContentComponent>;

  beforeEach(() => {
    const mockModelState = jasmine.createSpyObj<ModelState>(
      'ModelState', ['setViewType', 'setViewSide']
    );

    const mockPageState = jasmine.createSpyObj<PageState>(
      'PageStage', ['setUserName']
    );

    const mockRegistrationState = jasmine.createSpyObj<RegistrationState>(
      'RegistrationState', ['register']
    );

    const mockSceneState = jasmine.createSpyObj<SceneState>(
      'SceneState', ['nodes$']
    );

    shallow = new Shallow(ContentComponent, ContentModule)
      .mock(ModelState, {
        ...mockModelState,
        viewType$: of('register'),
        viewSide$: of('anterior'),
        position$: of({ x: 0, y: 0, z: 0 }),
        organDimensions$: of({ x: 0, y: 0, z: 0 }),
        defaultPosition: { x: 0, y: 0, z: 0 }
      })
      .mock(PageState, mockPageState)
      .mock(RegistrationState, {
        ...mockRegistrationState
      })
      .mock(SceneState, {
        ...mockSceneState,
        nodes$: from([])
      });
  });

  it('should call the resetStage method when the reset button is clicked.', async () => {
    const { find, instance } = await shallow.render();
    const spy = spyOn(instance, 'resetStage');
    const resetButton = find('.icon.reset');

    resetButton.triggerEventHandler('click', {});
    expect(spy).toHaveBeenCalled();
  });

  describe('.setViewType(is3DView)', () => {
    it('set view type to 3d when is3DView is true', async () => {
      const { instance, inject } = await shallow.render();
      instance.setViewType(true);
      expect(inject(ModelState).setViewType).toHaveBeenCalledWith('3d');
    });

    it('set view type to register when is3DView is false', async () => {
      const { instance, inject } = await shallow.render();
      instance.setViewType(false);
      expect(inject(ModelState).setViewType).toHaveBeenCalledWith('register');
    });
  });

  describe('.isNarrowView', () => {
    let sensorCallback: (size: { width: number; height: number }) => void;

    beforeEach(() => {
      // Constructors can't be arrow functions
      spyOn(resizeSensorModule, 'ResizeSensor').and.callFake(function (_el, callback) {
        sensorCallback = callback;
        return jasmine.createSpyObj<resizeSensorModule.ResizeSensor>(
          'ResizeSensor', ['detach']
        );
      });
    });

    it('should be set when the view width is less than a predefined value', async () => {
      const { instance } = await shallow.render();
      sensorCallback({ width: 10, height: 10 });
      expect(instance.isNarrowView).toBeTrue();
    });

    it('should be unset when the view width is larger or equal to a predefined value', async () => {
      const { instance } = await shallow.render();
      sensorCallback({ width: 10000000, height: 10 });
      expect(instance.isNarrowView).toBeFalse();
    });
  });
});
