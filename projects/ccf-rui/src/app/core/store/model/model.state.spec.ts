import { NgxsDataPluginModule } from '@angular-ru/ngxs';
import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { GlobalConfigState, OrganInfo } from 'ccf-shared';
import { lastValueFrom, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';

import { ExtractionSet } from '../../models/extraction-set';
import { VisibilityItem } from '../../models/visibility-item';
import { PageState } from '../page/page.state';
import { ReferenceDataState } from '../reference-data/reference-data.state';
import { GLOBAL_CONFIG, GlobalConfig } from './../../services/config/config';
import { ModelState, SlicesConfig, ViewSide, ViewType, XYZTriplet } from './model.state';

const initialReferenceDataState = {
  organIRILookup: {},
  organSpatialEntities: {},
  anatomicalStructures: {},
  extractionSets: {},
  sceneNodeLookup: {},
  simpleSceneNodeLookup: {},
  placementPatches: {}
};

function nextValue<T>(obs: Observable<T>): Promise<T> {
  return lastValueFrom(obs.pipe(take(1)));
}

function wait(duration = 0): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
}


describe('ModelState', () => {
  const initialXYZTriplet: XYZTriplet = { x: 0, y: 0, z: 0 };
  const initialSlicesConfig: SlicesConfig = { thickness: 0, numSlices: 1 };
  const initialViewType: ViewType = 'register';
  const initialViewSide: ViewSide = 'anterior';
  let mockDataSource: jasmine.SpyObj<ReferenceDataState>;
  let state: ModelState;
  let mockGlobalConfig: jasmine.SpyObj<GlobalConfig>;

  beforeEach(async () => {
    mockDataSource = jasmine.createSpyObj<ReferenceDataState>('ReferenceDataState', ['getReferenceOrganIri']);
    mockDataSource.getReferenceOrganIri.and.returnValue(undefined);
    mockGlobalConfig = jasmine.createSpyObj<GlobalConfig>('GlobalConfig', ['organ']);
    mockGlobalConfig.organ = {
      name: 'kidney', ontologyId: 'http://purl.obolibrary.org/obo/UBERON_0004538',
      side: 'left', sex: 'female'
    };

    // NOTE: No need for shallow-render since
    // the setup is so simple. It would also require
    // us to create both a fake component and module.
    TestBed.configureTestingModule({
      imports: [
        NgxsDataPluginModule.forRoot(),
        NgxsModule.forRoot([ModelState, GlobalConfigState])
      ],
      providers: [
        GlobalConfigState,
        { provide: ReferenceDataState,
          useValue: {
            ...mockDataSource,
            state$: of(initialReferenceDataState)
          }
        },
        {
          provide: GLOBAL_CONFIG,
          useValue: mockGlobalConfig
        },
        {
          provide: PageState,
          useValue: {
            setHasChanges: () => undefined,
            registrationStarted$: of([])
          }
        }
      ]
    });

    TestBed.inject(Store).reset({
      model: {
        blockSize: initialXYZTriplet,
        rotation: initialXYZTriplet,
        slicesConfig: initialSlicesConfig,
        viewType: initialViewType,
        viewSide: initialViewSide,
        id: '',
        label: '',
        organ: { src: 'app:kidney', name: 'Kidney' },
        sex: undefined,
        side: 'left',
        showPrevious: false,
        extractionSites: [],
        anatomicalStructures: []
      },
      globalConfig: {
        organ: mockGlobalConfig.organ
      }
    });

    state = TestBed.inject(ModelState);
  });

  it('has the latest block size', async () => {
    const value = await nextValue(state.blockSize$);
    expect(value).toEqual(initialXYZTriplet);
  });

  it('has the latest rotation', async () => {
    const value = await nextValue(state.rotation$);
    expect(value).toEqual(initialXYZTriplet);
  });

  it('has the latest slices configuration', async () => {
    const value = await nextValue(state.slicesConfig$);
    expect(value).toEqual(initialSlicesConfig);
  });

  it('has the latest view type', async () => {
    const value = await nextValue(state.viewType$);
    expect(value).toEqual(initialViewType);
  });

  it('has the latest view side', async () => {
    const value = await nextValue(state.viewSide$);
    expect(value).toEqual(initialViewSide);
  });

  it('has the latest organ', async () => {
    state.ngxsOnInit();
    await wait(500);
    const value = await nextValue(state.organ$);
    expect(value?.src).toEqual('app:kidney-left');
  });

  it('has the latest sex', async () => {
    state.ngxsOnInit();
    await wait(500);
    const value = await nextValue(state.sex$);
    expect(value).toEqual('female');
  });

  it('has the latest side', async () => {
    const value = await nextValue(state.side$);
    expect(value).toEqual('left');
  });

  it('has the latest show previous', async () => {
    const value = await nextValue(state.showPrevious$);
    expect(value).toEqual(false);
  });

  it('has the latest extraction sites', async () => {
    const value = await nextValue(state.extractionSites$);
    expect(value).toEqual([]);
  });

  it('has the latest anatomical structures', async () => {
    const value = await nextValue(state.anatomicalStructures$);
    expect(value).toEqual([]);
  });

  it('updates the block size', async () => {
    const newBlockSize = { x: 1, y: 2, z: 3 };
    state.setBlockSize(newBlockSize);

    const value = await nextValue(state.blockSize$);
    expect(value).toEqual(newBlockSize);
  });

  it('updates the rotation', async () => {
    const newRotation = { x: 1, y: 2, z: 3 };
    state.setRotation(newRotation);

    const value = await nextValue(state.rotation$);
    expect(value).toEqual(newRotation);
  });

  it('updates the slices configuration', async () => {
    const newSlicesConfig = { thickness: 2, numSlices: 3 };
    state.setSlicesConfig(newSlicesConfig);

    const value = await nextValue(state.slicesConfig$);
    expect(value).toEqual(newSlicesConfig);
  });

  it('updates the view type', async () => {
    const newViewType = '3d';
    state.setViewType(newViewType);

    const value = await nextValue(state.viewType$);
    expect(value).toEqual(newViewType);
  });

  it('updates the view side', async () => {
    const newViewSide = 'left';
    state.setViewSide(newViewSide);

    const value = await nextValue(state.viewSide$);
    expect(value).toEqual(newViewSide);
  });

  it('updates the organ', async () => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const newOrgan = { src: 'app:heart', name: 'Heart' } as OrganInfo;
    state.setOrgan(newOrgan);

    const value = await nextValue(state.organ$);
    expect(value).toEqual(newOrgan);
  });

  it('updates the view side', async () => {
    const newSex = 'female';
    state.setSex(newSex);

    const value = await nextValue(state.sex$);
    expect(value).toEqual(newSex);
  });

  it('updates the side', async () => {
    const newSide = 'right';
    state.setSide(newSide);

    const value = await nextValue(state.side$);
    expect(value).toEqual(newSide);
  });

  it('updates show previous', async () => {
    state.setShowPrevious(true);

    const value = await nextValue(state.showPrevious$);
    expect(value).toEqual(true);
  });

  it('updates extraction sites', async () => {
    const newSites = [{ id: 2 }] as VisibilityItem[];
    state.setExtractionSites(newSites);

    const value = await nextValue(state.extractionSites$);
    expect(value).toEqual(newSites);
  });

  it('updates anatomical structures', async () => {
    const newStructures = [{ id: 3 }] as VisibilityItem[];
    state.setAnatomicalStructures(newStructures);

    const value = await nextValue(state.anatomicalStructures$);
    expect(value).toEqual(newStructures);
  });

  it('updates extraction sets', async () => {
    const newSets = [{ name: '', organ: '', sites: [{ id: 1 }] }] as ExtractionSet[];
    state.setExtractionSets(newSets);

    const value = await nextValue(state.extractionSets$);
    expect(value).toEqual(newSets);
  });

  it('should call setShowPrevious with visible boolean when toggleRegistrationBlocks is called', async () => {
    const spy = spyOn(state, 'setShowPrevious');
    state.toggleRegistrationBlocksVisibility(true, []);
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should call setAnatomicalStructures() with the passed in visibilityItems if visible is set to false', async () => {
    const spy = spyOn(state, 'setAnatomicalStructures');
    const testVisibilityItems: VisibilityItem[] = [{ id: 1, name: 'test', visible: true }];
    state.toggleRegistrationBlocksVisibility(false, testVisibilityItems);
    expect(spy).toHaveBeenCalledWith(testVisibilityItems);
  });

  it('should set anatomical structures opacity to 20 when visible is set to true', async () => {
    const testVisibilityItems: VisibilityItem[] = [{ id: 1, name: 'test', visible: true, opacity: 100 }];
    state.toggleRegistrationBlocksVisibility(true, testVisibilityItems);
    const value = await nextValue(state.anatomicalStructures$);
    expect(value).toEqual([{ id: 1, name: 'test', visible: true, opacity: 20 }]);
  });

  it('should keep the current opacity if the current opacity is less than 20', async () => {
    const testVisibilityItems: VisibilityItem[] = [{ id: 1, name: 'test', visible: true, opacity: 19 }];
    state.toggleRegistrationBlocksVisibility(true, testVisibilityItems);
    const value = await nextValue(state.anatomicalStructures$);
    expect(value[0].opacity).toEqual(19);
  });

  it('should successfully set opacity to 20 even if the visibilityObject does not have opacity property', async () => {
    const testVisibilityItems: VisibilityItem[] = [{ id: 1, name: 'test', visible: true }];
    state.toggleRegistrationBlocksVisibility(true, testVisibilityItems);
    const value = await nextValue(state.anatomicalStructures$);
    expect(value[0].opacity).toEqual(20);
  });

  it('should find a matching organ by id and side', async () => {
    expect(state.idMatches('http://purl.obolibrary.org/obo/UBERON_0004538', 'left')?.organ).toEqual('Kidney');
  });

  it('should find a matching organ by id only', async () => {
    expect(state.idMatches('http://purl.obolibrary.org/obo/UBERON_0000059')?.organ).toEqual('Large Intestine');
  });

  it('should find a matching organ by name', async () => {
    expect(state.nameMatches('kidney', 'left')?.organ).toEqual('Kidney');
  });
});
