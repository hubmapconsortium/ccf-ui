import { of } from 'rxjs';
import { Shallow } from 'shallow-render';

import { VisibilityItem } from '../../core/models/visibility-item';
import { ModelState } from '../../core/store/model/model.state';
import { PageState } from '../../core/store/page/page.state';
import { RegistrationState } from '../../core/store/registration/registration.state';
import { OrganInfo } from 'ccf-shared';
import { LeftSidebarComponent } from './left-sidebar.component';
import { LeftSidebarModule } from './left-sidebar.module';
import { SpatialEntityJsonLd } from 'ccf-body-ui';

const testVisibilityItems = [{ id: 1, name: 'test', opacity: 90 }] as VisibilityItem[];

describe('LeftSidebarComponent', () => {
  let shallow: Shallow<LeftSidebarComponent>;

  beforeEach(() => {
    const mockModelState = jasmine.createSpyObj<ModelState>(
      'ModelState', ['setViewType', 'setViewSide', 'toggleRegistrationBlocksVisibility', 'setSex', 'setSide']
    );

    const mockPageState = jasmine.createSpyObj<PageState>(
      'PageState', ['setUserName']
    );

    const mockRegistrationState = jasmine.createSpyObj<RegistrationState>(
      'RegistrationState', ['isValid', 'editRegistration']
    );

    shallow = new Shallow(LeftSidebarComponent, LeftSidebarModule)
      .mock(ModelState, {
        ...mockModelState,
        viewType$: of('register'),
        viewSide$: of('anterior'),
        sex$: of('male' as 'male' | 'female'),
        side$: of('left' as 'left' | 'right'),
        organ$: of({ src: 'app:heart', name: 'Heart' } as OrganInfo),
        anatomicalStructures$: of(testVisibilityItems),
        snapshot: { anatomicalStructures: testVisibilityItems }
      })
      .mock(PageState, mockPageState)
      .mock(RegistrationState, {
        ...mockRegistrationState,
        displayErrors$: of(false)
      });
  });

  it('should successfully set the extractionSiteTooltip to the VisibilityItem tooltip passed in', async () => {
    const { instance } = await shallow.render();
    const testVisibilityItem: VisibilityItem = {
      id: 1,
      name: 'test',
      visible: false,
      tooltip: 'test tooltip'
    };

    instance.updateExtractionSiteTooltip(testVisibilityItem);
    expect(instance.extractionSiteTooltip).toEqual('test tooltip');
  });

  it('should set the extractionSiteTooltip to empty string when no visibilityitem is passed in', async () => {
    const { instance } = await shallow.render();
    instance.updateExtractionSiteTooltip(undefined);
    expect(instance.extractionSiteTooltip).toEqual('');
  });

  it('should call model.toggleRegistrationBlocksVisibility whenever togglePreviousRegistrationBlocks is called', async () => {
    const { instance } = await shallow.render();
    instance.togglePreviousRegistrationBlocks(true);
    instance.togglePreviousRegistrationBlocks(false);
    expect(instance.model.toggleRegistrationBlocksVisibility).toHaveBeenCalledTimes(2);
  });

  it('should update the previousVisibilityItems variable if registrationBlocks are toggled to visible', async () => {
    const { instance } = await shallow.render();
    instance.togglePreviousRegistrationBlocks(true);
    expect(instance.previousVisibilityItems).toEqual(testVisibilityItems);
  });

  it('should set the sex from label', async () => {
    const { instance } = await shallow.render();
    instance.setSexFromLabel('Female');
    expect(instance.model.setSex).toHaveBeenCalledWith('female');
  });

  it('should set the side from label', async () => {
    const { instance } = await shallow.render();
    instance.setSideFromLabel('R');
    expect(instance.model.setSide).toHaveBeenCalledWith('right');
  });

  it('should call the registration state method whenever update registration is called', async () => {
    const { instance, get } = await shallow.render();
    const spy = get(RegistrationState).editRegistration;
    instance.updateRegistration({} as SpatialEntityJsonLd);
    expect(spy).toHaveBeenCalled();
  });
});
