import { Immutable } from '@angular-ru/common/typings';
import { TestBed } from '@angular/core/testing';
import { NgxsDataPluginModule } from '@angular-ru/ngxs';
import { NgxsModule, Store } from '@ngxs/store';
import { GlobalConfigState, OrganInfo } from 'ccf-shared';
import * as fileSaver from 'file-saver';
import { lastValueFrom, Observable, of, ReplaySubject } from 'rxjs';
import { skip, take } from 'rxjs/operators';

import { ExtractionSet } from '../../models/extraction-set';
import { VisibilityItem } from '../../models/visibility-item';
import { GLOBAL_CONFIG } from '../../services/config/config';
import { ModelState, ModelStateModel } from '../model/model.state';
import { PageState, PageStateModel, Person } from '../page/page.state';
import { ReferenceDataState, ReferenceDataStateModel } from '../reference-data/reference-data.state';
import { AnatomicalStructureTagState } from './../anatomical-structure-tags/anatomical-structure-tags.state';
import { RegistrationState } from './registration.state';


const testVisibilityItems: VisibilityItem[] = [{ id: 0, name: 'test', visible: true }];
const testExtractionSets: ExtractionSet[] = [{ name: 'test', sites: [] }];
const testModel: Immutable<ModelStateModel> = {
  id: '0',
  label: 'test',
  organ: { name: 'test', src: 'test', organ: 'test' },
  organDimensions: { x: 0, y: 0, z: 0 },
  blockSize: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
  position: { x: 0, y: 0, z: 0 },
  slicesConfig: { thickness: 0, numSlices: 0 },
  viewType: '3d',
  viewSide: 'anterior',
  showPrevious: false,
  extractionSites: testVisibilityItems,
  anatomicalStructures: testVisibilityItems,
  extractionSets: testExtractionSets
};

const testPage: Immutable<PageStateModel> = {
  user: {
    firstName: 'John',
    lastName: 'Doe'
  },
  registrationStarted: false,
  useCancelRegistrationCallback: false,
  registrationCallbackSet: false,
  skipConfirmation: true,
  hasChanges: false,
  orcidValid: true
};

function nextValue<T>(obs: Observable<T>): Promise<T> {
  return lastValueFrom(obs.pipe(take(1)));
}

function patchStore(key: string, data: unknown): void {
  const store = TestBed.inject(Store);
  const current = store.snapshot();
  store.reset({
    ...current,
    [key]: data
  });
}

describe('RegistrationState', () => {
  const initialPageState: Partial<PageStateModel> = {
    user: {
      firstName: 'foo',
      lastName: 'bar',
      middleName: 'middle',
      orcidId: '1111-1111-1111-1111'
    }
  };
  const initialModelState: Partial<ModelStateModel> = {
    id: 'a-b-c',
    blockSize: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    position: { x: 0, y: 0, z: 0 },
    organ: {
      src: '',
      name: '',
      organ: ''
    }
  };
  const initialReferenceDataState: Partial<ReferenceDataStateModel> = {
    anatomicalStructures: {},
    extractionSets: {},
    organIRILookup: {},
    organSpatialEntities: {},
    sceneNodeLookup: {},
    simpleSceneNodeLookup: {}
  };

  let pageStateSubject: ReplaySubject<Partial<PageStateModel>>;
  let modelStateSubject: ReplaySubject<Partial<ModelStateModel>>;
  let referenceDataStateSubject: ReplaySubject<Partial<ReferenceDataStateModel>>;
  let state: RegistrationState;

  beforeEach(() => {
    pageStateSubject = new ReplaySubject();
    pageStateSubject.next(initialPageState);

    modelStateSubject = new ReplaySubject();
    modelStateSubject.next(initialModelState);

    referenceDataStateSubject = new ReplaySubject();
    referenceDataStateSubject.next(initialReferenceDataState);

    TestBed.configureTestingModule({
      imports: [
        NgxsDataPluginModule.forRoot(),
        NgxsModule.forRoot([RegistrationState, AnatomicalStructureTagState, ModelState, PageState, GlobalConfigState])
      ],
      providers: [
        GlobalConfigState,
        {
          provide: AnatomicalStructureTagState, useValue: {
            tags$: of([]),
            latestTags: [],
            addTags: () => undefined
          }
        },
        {
          provide: PageState, useValue: {
            state$: pageStateSubject,
            snapshot: initialPageState,
            clearHasChanges: () => undefined,
            patchState: () => undefined,
            setOrcidId: () => undefined,
            registrationStarted: () => undefined
          }
        },
        {
          provide: ModelState, useValue: {
            state$: modelStateSubject,
            snapshot: initialModelState,
            setOrganDefaults: () => undefined
          }
        },
        {
          provide: ReferenceDataState, useValue: {
            state$: referenceDataStateSubject,
            snapshot: initialReferenceDataState,
            getSourceDB: () => (
              {
                subscribe: () => undefined
              }
            )
          }
        },
        {
          provide: GLOBAL_CONFIG,
          useValue: {}
        }
      ]
    });

    TestBed.inject(Store).reset({
      registration: {
        useRegistrationCallback: false,
        displayErrors: false,
        registrations: []
      },
      globalConfig: {}
    });

    state = TestBed.inject(RegistrationState);
    state.ngxsOnInit();
  });

  describe('.metadata$', () => {
    it('is based on current state', async () => {
      const value = await nextValue(state.metadata$);
      expect(value).toContain({ label: 'Tissue Block Rotation', value: '0, 0, 0' });
    });

    it('has extra fields if cancel registration callback is set', async () => {
      pageStateSubject.next({ ...initialPageState, useCancelRegistrationCallback: false });

      const value = await nextValue(state.metadata$);
      expect(value).toContain({ label: 'First Name', value: 'foo' });
    });
  });

  describe('.valid$', () => {
    it('creates valid$ boolean', async () => {
      const value = await nextValue(state.valid$);
      expect(value).toBeInstanceOf(Boolean);
    });

    it('should consider isDataValid true if the user and organ are set', async () => {
      const result = state.isDataValid(testPage, testModel);
      expect(result).toBeTrue();
    });

    it('should consider isDataValid false if the organ is not set', async () => {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const invalidModel = { ...testModel, organ: {} as OrganInfo };
      const result = state.isDataValid(testPage, invalidModel);
      expect(result).toBeFalse();
    });

    it('should consider isDataValid false if the user is not set', async () => {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const invalidPage = { ...testPage, user: {} as Person };
      const result = state.isDataValid(invalidPage, testModel);
      expect(result).toBeFalse();
    });
  });

  describe('.jsonld$', () => {
    it('creates jsonld objects', async () => {
      const value = await nextValue(state.jsonld$);
      expect(value).toBeInstanceOf(Object);
    });
  });

  describe('.previousRegistrations$', () => {
    const reg1 = { id: 1 };
    const reg2 = { id: 2 };

    beforeEach(() => {
      TestBed.inject(Store).reset({
        registration: {
          registrations: [reg1]
        },
        globalConfig: {}
      });
    });

    it('emits arrays of previous registration objects', async () => {
      TestBed.inject(GlobalConfigState).setConfig({ fetchPreviousRegistrations: undefined });
      const value = await nextValue(state.previousRegistrations$);
      expect(value).toEqual([reg1]);
    });

    // it('calls fetchPreviousRegistrations if available', async () => {
    //   const spy = jasmine.createSpy().and.returnValue([[]]);
    //   TestBed.inject(GlobalConfigState).setConfig({ fetchPreviousRegistrations: spy });

    //   await nextValue(state.previousRegistrations$);
    //   expect(spy).toHaveBeenCalled();
    // });

    it('combines the results from fetchPreviousRegistrations and local registrations', async () => {
      const spy = jasmine.createSpy().and.returnValue([[reg2]]);
      TestBed.inject(GlobalConfigState).setConfig({ fetchPreviousRegistrations: spy });

      const value = await nextValue(state.previousRegistrations$.pipe(skip(1)));
      expect(value).toEqual(jasmine.arrayWithExactContents([reg1, reg2]));
    });
  });

  describe('setUseRegistrationCallback', () => {
    it('updates use registration callback', async () => {
      state.setUseRegistrationCallback(true);
      const value = await nextValue(state.state$);
      expect(value.useRegistrationCallback).toBeTrue();
    });
  });

  describe('setDisplayErrors', () => {
    it('updates displayErrors variable', async () => {
      state.setDisplayErrors(true);
      const value = await nextValue(state.state$);
      expect(value.displayErrors).toBeTrue();
    });
  });

  describe('register(useCallback)', () => {
    let callback: jasmine.Spy<(json: string) => void>;
    let download: jasmine.Spy;

    beforeEach(() => {
      callback = jasmine.createSpy();
      download = spyOn(fileSaver, 'saveAs');
      patchStore('globalConfig', { register: callback });
      spyOn(state, 'isDataValid').and.returnValue(true);
    });

    it('does nothing if isDataValid() is false', () => {
      (state.isDataValid as jasmine.Spy).and.returnValue(false);
      state.register();
      expect(callback).not.toHaveBeenCalled();
      expect(download).not.toHaveBeenCalled();
    });

    it('uses the callback when useCallback argument is true', () => {
      state.register(true);
      expect(callback).toHaveBeenCalled();
    });

    it('uses download when useCallback argument is false', () => {
      state.register(false);
      expect(download).toHaveBeenCalled();
    });

    it('uses the callback if the state useRegistrationCallback is true and no argument is provided', () => {
      patchStore('registration', { useRegistrationCallback: true });
      state.register();
      expect(callback).toHaveBeenCalled();
    });

    it('uses download when the state useRegistrationCallback is false and no argument is provided', async () => {
      patchStore('registration', { useRegistrationCallback: false });
      state.register();
      expect(download).toHaveBeenCalled();
    });

    it('does nothing if there is no callback and the registration method is selected', () => {
      patchStore('globalConfig', { register: undefined });
      state.register(true);
      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe('setToInitialRegistration', () => {
    it('reverts registration to initial state', async () => {
      const spy = spyOn(state, 'editRegistration');
      state.setToInitialRegistration();
      expect(spy).toHaveBeenCalled();
    });
  });

});
