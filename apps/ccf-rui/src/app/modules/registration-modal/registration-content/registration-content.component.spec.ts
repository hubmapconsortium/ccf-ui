import { MatDialogRef } from '@angular/material/dialog';
import { OrganInfo } from 'ccf-shared';
import { of } from 'rxjs';
import { Shallow } from 'shallow-render';

import { Immutable } from '@angular-ru/common/typings';
import { ModelState } from '../../../core/store/model/model.state';
import { PageState } from '../../../core/store/page/page.state';
import { RegistrationContentComponent } from './registration-content.component';
import { RegistrationContentModule } from './registration-content.module';


describe('RegistrationContentComponent', () => {
  let shallow: Shallow<RegistrationContentComponent>;
  const mockModelState = jasmine.createSpyObj<ModelState>(
    'ModelState', ['setViewType', 'setViewSide', 'setSex', 'setOrgan', 'setOrganDefaults']
  );
  const mockPageState = jasmine.createSpyObj<PageState>(
    'PageState', ['setUserName', 'registrationStarted', 'isOrcidValid']
  );
  const mockMatDialog = jasmine.createSpyObj<MatDialogRef<unknown, unknown>>(
    'DialogRef', ['close']
  );

  beforeEach(() => {
    shallow = new Shallow(RegistrationContentComponent, RegistrationContentModule)
      .mock(ModelState, {
        ...mockModelState,
        sex$: of('male' as 'male' | 'female'),
        organ$: of({ src: '' } as Immutable<OrganInfo>)
      })
      .mock(PageState, {
        ...mockPageState,
        user$: of({ firstName: '', lastName: '' }),
        organOptions$: of([]),
        isOrcidValid: () => true
      })
      .mock(MatDialogRef, {
        ...mockMatDialog,
        disableClose: true
      });
  });

  it('should set the appropriate sex', async () => {
    const { instance } = await shallow.render();
    instance.setSexFromLabel('Female');
    expect(instance.currentSex).toBe('Female');
    expect(instance.sexSelected).toBeTrue();
  });

  it('checks to see if a name has been entered', async () => {
    const { instance } = await shallow.render();
    instance.checkNameValid({ firstName: '', lastName: '' });
    expect(instance.nameValid).toBeFalse();
    instance.checkNameValid({ firstName: 'test', lastName: 'test' });
    expect(instance.nameValid).toBeTrue();
  });

  it('should set the appropriate organ', async () => {
    const { instance } = await shallow.render();
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const testOrgan = { src: 'test', name: 'test', organ: 'test' } as OrganInfo;
    instance.organSelect(testOrgan);
    expect(instance.currentOrgan).toBe(testOrgan);
    expect(instance.organSelected).toBeTrue();
  });

  it('closes the dialog if button is clicked and organ is selected and a name has been entered', async () => {
    const { find, instance } = await shallow.render();
    instance.organSelected = true;
    instance.nameValid = true;
    const spy = spyOn(instance, 'closeDialog');
    find('.registration-button').triggerEventHandler('click', '');
    expect(spy).toHaveBeenCalled();
  });

  it('does not close the dialog if an organ has not been selected', async () => {
    const { find, instance } = await shallow.render();
    instance.organSelected = false;
    const spy = spyOn(instance, 'closeDialog');
    find('.registration-button').triggerEventHandler('click', '');
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('does not close the dialog if a name has not been entered', async () => {
    const { find, instance } = await shallow.render();
    instance.nameValid = true;
    const spy = spyOn(instance, 'closeDialog');
    find('.registration-button').triggerEventHandler('click', '');
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('closeDialog closes the dialog', async () => {
    const { instance, inject } = await shallow.render();
    instance.closeDialog();
    expect(inject(MatDialogRef).close).toHaveBeenCalled();
  });

  it('prevents default', async () => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const mockEvent = {
      preventDefault: () => undefined
    } as MouseEvent;
    const { instance } = await shallow.render();
    const spy = spyOn(mockEvent, 'preventDefault');
    instance.registerButtonClick(mockEvent);
    expect(spy).toHaveBeenCalled();
  });

  it('sets orcidValid to false if orcid not valid', async () => {
    const { instance } = await shallow.mock(PageState, {
      ...mockPageState,
      isOrcidValid: () => false
    }).render();
    expect(instance.orcidValid).toBeFalse();
  });

  it('handles registration select', async () => {
    const { instance } = await shallow.render();
    instance.handleRegistrationSelect();
    expect(instance.registrationSelected).toBeTrue();
  });
});
