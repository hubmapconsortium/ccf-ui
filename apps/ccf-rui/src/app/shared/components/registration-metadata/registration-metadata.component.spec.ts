import { of } from 'rxjs';
import { Shallow } from 'shallow-render';

import { Immutable } from '@angular-ru/common/typings';
import { OrganInfo } from 'ccf-shared';
import { ModelState } from '../../../core/store/model/model.state';
import { PageState } from '../../../core/store/page/page.state';
import { RegistrationState, RegistrationStateModel } from '../../../core/store/registration/registration.state';
import { RegistrationMetadataComponent } from './registration-metadata.component';
import { RegistrationMetadataModule } from './registration-metadata.module';

describe('RegistrationMetadataComponent', () => {
  let shallow: Shallow<RegistrationMetadataComponent>;

  beforeEach(() => {
    const mockModelState = jasmine.createSpyObj<ModelState>('ModelState', [
      'setViewType',
      'setViewSide',
      'setSex',
      'setOrgan',
    ]);

    const mockRegistrationState = jasmine.createSpyObj<RegistrationState>('RegistrationState', ['editRegistration']);

    const mockPageState = jasmine.createSpyObj<PageState>('PageState', [
      'setUserName',
      'registrationStarted',
      'isOrcidValid',
    ]);

    shallow = new Shallow(RegistrationMetadataComponent, RegistrationMetadataModule)
      .mock(ModelState, {
        ...mockModelState,
        sex$: of('male' as 'male' | 'female'),
        organ$: of({ src: '' } as Immutable<OrganInfo>),
      })
      .mock(PageState, {
        ...mockPageState,
        user$: of({ firstName: '', lastName: '' }),
        organOptions$: of([]),
        uriToOrcid: () => '1234-1234-1234-1234',
      })
      .mock(RegistrationState, {
        ...mockRegistrationState,
        state$: of({} as Immutable<RegistrationStateModel>),
      });
  });

  it('should exist', async () => {
    const { instance } = await shallow.render();
    expect(instance).toBeTruthy();
  });
});
