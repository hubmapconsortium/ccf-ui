import { of } from 'rxjs';
import { Shallow } from 'shallow-render';

import { ModelState } from '../../core/store/model/model.state';
import { ContentComponent } from './content.component';
import { ContentModule } from './content.module';
import { PageState } from '../../core/store/page/page.state';


describe('ContentComponent', () => {
  let shallow: Shallow<ContentComponent>;

  beforeEach(() => {
    const mockModelState = jasmine.createSpyObj<ModelState>(
      'ModelState', ['setViewType', 'setViewSide']
    );

    const mockPageState = jasmine.createSpyObj<PageState>(
      'PageStage', ['setEmbedded', 'setUserName', 'setTutorialMode']
    );

    shallow = new Shallow(ContentComponent, ContentModule)
      .mock(ModelState, {
        ...mockModelState,
        viewType$: of('register'),
        viewSide$: of('anterior')
      })
      .mock(PageState, {
        ...mockPageState,
        tutorialMode$: of(false)
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
      const { instance, get } = await shallow.render();
      instance.setViewType(true);
      expect(get(ModelState).setViewType).toHaveBeenCalledWith('3d');
    });

    it('set view type to register when is3DView is false', async () => {
      const { instance, get } = await shallow.render();
      instance.setViewType(false);
      expect(get(ModelState).setViewType).toHaveBeenCalledWith('register');
    });
  });
});
