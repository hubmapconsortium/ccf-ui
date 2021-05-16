import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Shallow } from 'shallow-render';

import { ModelState } from '../../../core/store/model/model.state';
import { PageState } from '../../../core/store/page/page.state';
import { RegistrationContentComponent } from './registration-content.component';
import { RegistrationContentModule } from './registration-content.module';
import { OrganInfo } from 'ccf-shared';

describe('RegistrationContentComponent', () => {
  let shallow: Shallow<RegistrationContentComponent>;

  beforeEach(() => {
    const mockModelState = jasmine.createSpyObj<ModelState>(
      'ModelState', ['setViewType', 'setViewSide', 'setSex', 'setOrgan']
    );

    const mockPageState = jasmine.createSpyObj<PageState>(
      'PageState', ['setEmbedded', 'setUserName', 'setTutorialMode', 'registrationStarted']
    );

    const mockMatDialog = jasmine.createSpyObj<MatDialogRef<unknown, boolean>>(
      'DialogRef', ['close']
    );

    shallow = new Shallow(RegistrationContentComponent, RegistrationContentModule)
      .mock(ModelState, {
        ...mockModelState,
        sex$: of('male' as 'male' | 'female'),
      })
      .mock(PageState, mockPageState)
      .mock(MatDialogRef, {
        ...mockMatDialog,
        disableClose: true
      })
  });

  it('should set the appropriate sex', async () => {
    const { instance } = await shallow.render();
    instance.setSexFromLabel('Female');
    expect(instance.currentSex).toBe('Female');
    expect(instance.sexSelected).toBeTrue();
  });

  it('should set the appropriate organ', async () => {
    const { instance } = await shallow.render();
    const testOrgan = { src: 'test', name: 'test', organ: 'test' } as OrganInfo;
    instance.organSelect(testOrgan);
    expect(instance.currentOrgan).toBe(testOrgan);
    expect(instance.organSelected).toBeTrue();
  });

  it('closes the dialog if button is clicked and organ is selected', async () => {
    const { find, instance } = await shallow.render();
    instance.organSelected = true;
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

  it('closeDialog closes the dialog', async () => {
    const { instance, get } = await shallow.render();
    instance.closeDialog();
    expect(get(MatDialogRef).close).toHaveBeenCalled();
  });
});
