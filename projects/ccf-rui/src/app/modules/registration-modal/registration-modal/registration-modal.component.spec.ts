import { MatDialog } from '@angular/material/dialog';
import { GlobalConfigState, OrganInfo } from 'ccf-shared';
import { Subject } from 'rxjs';
import { Shallow } from 'shallow-render';

import { GlobalConfig } from '../../../core/services/config/config';
import { ModelState, ModelStateModel } from '../../../core/store/model/model.state';
import { PageState, PageStateModel } from '../../../core/store/page/page.state';
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

const initialModelState = {
  id: '',
  label: '',
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  organ: { src: '', name: '' } as OrganInfo,
  organIri: '',
  organDimensions: { x: 90, y: 90, z: 90 },
  sex: 'male',
  side: 'left',
  blockSize: { x: 10, y: 10, z: 10 },
  rotation: { x: 0, y: 0, z: 0 },
  position: { x: 0, y: 0, z: 0 },
  slicesConfig: { thickness: NaN, numSlices: NaN },
  viewType: 'register',
  viewSide: 'anterior',
  showPrevious: false,
  extractionSites: [],
  anatomicalStructures: [],
  extractionSets: []
};

const initialPageState: PageStateModel = {
  user: {
    firstName: '',
    lastName: ''
  },
  registrationStarted: false,
  useCancelRegistrationCallback: false,
  registrationCallbackSet: false,
  skipConfirmation: true,
  hasChanges: false,
  organOptions: [],
  orcidValid: true
};

describe('RegistrationModalComponent', () => {
  let shallow: Shallow<RegistrationModalComponent>;
  let pageSubject: Subject<PageStateModel>;
  let modelSubject: Subject<ModelStateModel>;
  let referenceSubject: Subject<ReferenceDataStateModel>;
  let globalConfigSubject: Subject<GlobalConfig>;

  beforeEach(() => {
    pageSubject = new Subject();
    modelSubject = new Subject();
    referenceSubject = new Subject();
    globalConfigSubject = new Subject();

    shallow = new Shallow(RegistrationModalComponent, RegistrationModalModule)
      .mock(MatDialog, {
        open: () => ({})
      })
      .mock(PageState, {
        state$: pageSubject
      })
      .mock(ModelState, {
        state$: modelSubject
      })
      .mock(ReferenceDataState, {
        state$: referenceSubject
      })
      .mock(GlobalConfigState, {
        state$: globalConfigSubject
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
    globalConfigSubject.next({});
    referenceSubject.next(updatedReferenceDataState);
    pageSubject.next(initialPageState);
    modelSubject.next(initialModelState as ModelStateModel);
    expect(spy).toHaveBeenCalled();
  });

  it('should not open the dialog on init if there is a user and organ', async () => {
    const { instance } = await shallow.render();
    const spy = spyOn(instance, 'openDialog');
    instance.ngOnInit();
    referenceSubject.next(updatedReferenceDataState);
    pageSubject.next({
      ...initialPageState,
      user: { firstName: 'John', lastName: 'Doe' }
    });
    modelSubject.next({
      ...initialModelState as ModelStateModel,
      organ: { src: 'areallygoodvalue', name: '', organ: '' }
    });
    expect(spy).not.toHaveBeenCalled();
  });

  it('should not open the dialog on init if reference data has not updated', async () => {
    const { instance } = await shallow.render();
    const spy = spyOn(instance, 'openDialog');
    instance.ngOnInit();
    referenceSubject.next(initialReferenceDataState);
    pageSubject.next({
      ...initialPageState,
      user: { firstName: 'John', lastName: 'Doe' }
    });
    modelSubject.next({
      ...initialModelState as ModelStateModel,
      organ: { src: 'areallygoodvalue', name: '', organ: '' }
    });
    expect(spy).not.toHaveBeenCalled();
  });
});
