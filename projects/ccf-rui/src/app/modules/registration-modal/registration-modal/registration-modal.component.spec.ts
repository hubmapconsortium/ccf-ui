import { MatDialog } from '@angular/material/dialog';
import { OrganInfo } from 'ccf-shared';
import { Subject } from 'rxjs';
import { Shallow } from 'shallow-render';

import { ModelState } from '../../../core/store/model/model.state';
import { PageState, Person } from '../../../core/store/page/page.state';
import { ReferenceDataState, ReferenceDataStateModel } from '../../../core/store/reference-data/reference-data.state';
import { RegistrationModalComponent } from './registration-modal.component';
import { RegistrationModalModule } from './registration-modal.module';

const initialReferenceDataState = {
  organIRILookup: {},
  organSpatialEntities: {},
  anatomicalStructures: {},
  extractionSets: {},
  sceneNodeLookup: {},
  simpleSceneNodeLookup: {},
  placementPatches: {}
};

const updatedReferenceDataState = {
  organIRILookup: { test: 'value' },
  organSpatialEntities: {},
  anatomicalStructures: {},
  extractionSets: {},
  sceneNodeLookup: {},
  simpleSceneNodeLookup: {},
  placementPatches: {}
};

function wait(duration = 0): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
}

describe('RegistrationModalComponent', () => {
  let shallow: Shallow<RegistrationModalComponent>;
  let userSubject: Subject<Person>;
  let organSubject: Subject<OrganInfo>;
  let referenceSubject: Subject<ReferenceDataStateModel>;

  beforeEach(() => {
    userSubject = new Subject();
    organSubject = new Subject();
    referenceSubject = new Subject();

    shallow = new Shallow(RegistrationModalComponent, RegistrationModalModule)
      .mock(MatDialog, {
        open: () => ({})
      })
      .mock(PageState, {
        user$: userSubject
      })
      .mock(ModelState, {
        organ$: organSubject
      })
      .mock(ReferenceDataState, {
        state$: referenceSubject
      });
  });

  it('should open the dialog when the openDialog() method is called', async () => {
    const { instance, inject } = await shallow.render();
    instance.openDialog();
    expect(inject(MatDialog).open).toHaveBeenCalled();
  });

  it('should open the dialog on init if there is no user or organ', async () => {
    const { instance } = await shallow.render();
    const spy = spyOn(instance, 'openDialog');
    instance.ngOnInit();
    referenceSubject.next(updatedReferenceDataState);
    userSubject.next({ firstName: '', lastName: '' });
    organSubject.next({ src: '', name: '', organ: '' });
    expect(spy).toHaveBeenCalled();
  });

  it('should not open the dialog on init if there is a user and organ', async () => {
    const { instance } = await shallow.render();
    const spy = spyOn(instance, 'openDialog');
    instance.ngOnInit();
    referenceSubject.next(updatedReferenceDataState);
    userSubject.next({ firstName: 'John', lastName: 'Doe' });
    organSubject.next({ src: 'areallygoodvalue', name: '', organ: '' });
    expect(spy).not.toHaveBeenCalled();
  });

  it('should not open the dialog on init if reference data has not updated', async () => {
    const { instance } = await shallow.render();
    const spy = spyOn(instance, 'openDialog');
    instance.ngOnInit();
    referenceSubject.next(initialReferenceDataState);
    userSubject.next({ firstName: 'John', lastName: 'Doe' });
    organSubject.next({ src: 'areallygoodvalue', name: '', organ: '' });
    await wait(700);
    expect(spy).not.toHaveBeenCalled();
  });
});
