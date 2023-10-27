import { of } from 'rxjs';
import { Shallow } from 'shallow-render';

import { ModelState } from '../../../core/store/model/model.state';
import { PageState } from '../../../core/store/page/page.state';
import { RegistrationMetadataComponent } from './registration-metadata.component';
import { RegistrationMetadataModule } from './registration-metadata.module';
import { RegistrationState } from '../../../core/store/registration/registration.state';


describe('RegistrationMetadataComponent', () => {
  let shallow: Shallow<RegistrationMetadataComponent>;

  beforeEach(() => {
    const mockModelState = jasmine.createSpyObj<ModelState>(
      'ModelState', ['setViewType', 'setViewSide', 'setSex', 'setOrgan']
    );

    const mockRegistrationState = jasmine.createSpyObj<RegistrationState>(
      'RegistrationState', ['editRegistration']
    );

    const mockPageState = jasmine.createSpyObj<PageState>(
      'PageState', ['setUserName', 'registrationStarted', 'isOrcidValid']
    );

    shallow = new Shallow(RegistrationMetadataComponent, RegistrationMetadataModule)
      .mock(ModelState, {
        ...mockModelState,
        sex$: of('male' as 'male' | 'female'),
        organ$: of({ src: '' })
      })
      .mock(PageState, {
        ...mockPageState,
        user$: of({ firstName: '', lastName: '' }),
        organOptions$: of([]),
        uriToOrcid: () => '1234-1234-1234-1234'
      })
      .mock(RegistrationState, {
        ...mockRegistrationState,
        state$: of({})
      });
  });

  it('should exist', async () => {
    const { instance } = await shallow.render();
    expect(instance).toBeTruthy();
  });
});

