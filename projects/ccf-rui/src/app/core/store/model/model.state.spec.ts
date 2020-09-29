import { TestBed } from '@angular/core/testing';
import { NgxsDataPluginModule } from '@ngxs-labs/data';
import { NgxsModule, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';

import { VisibilityItem } from '../../models/visibility-item';
import { DataSourceService } from '../../services/data-source/data-source.service';
import { ModelState, SlicesConfig, ViewSide, ViewType, XYZTriplet } from './model.state';


function nextValue<T>(obs: Observable<T>): Promise<T> {
  return obs.pipe(take(1)).toPromise();
}


describe('ModelState', () => {
  const initialXYZTriplet: XYZTriplet = { x: 0, y: 0, z: 0 };
  const initialSlicesConfig: SlicesConfig = { thickness: 0, numSlices: 1 };
  const initialViewType: ViewType = 'register';
  const initialViewSide: ViewSide = 'anterior';
  let mockDataSource: jasmine.SpyObj<DataSourceService>;
  let state: ModelState;

  beforeEach(() => {
    mockDataSource = jasmine.createSpyObj<DataSourceService>('DataSourceService', ['getReferenceOrgans']);
    mockDataSource.getReferenceOrgans.and.returnValue(of([]));

    // NOTE: No need for shallow-render since
    // the setup is so simple. It would also require
    // us to create both a fake component and module.
    TestBed.configureTestingModule({
      imports: [
        NgxsDataPluginModule.forRoot(),
        NgxsModule.forRoot([ModelState])
      ],
      providers: [
        { provide: DataSourceService, useValue: mockDataSource }
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
        organ: 'kidney',
        gender: undefined,
        side: 'left',
        showPrevious: false,
        extractionSites: [],
        anatomicalStructures: []
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
    const value = await nextValue(state.organ$);
    expect(value).toEqual('kidney');
  });

  it('has the latest gender', async () => {
    const value = await nextValue(state.gender$);
    expect(value).toEqual(undefined);
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
    const newBlockSize = { x: 1, y: 2, z: 3};
    state.setBlockSize(newBlockSize);

    const value = await nextValue(state.blockSize$);
    expect(value).toEqual(newBlockSize);
  });

  it('updates the rotation', async () => {
    const newRotation = { x: 1, y: 2, z: 3};
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
    const newOrgan = 'heart';
    state.setOrgan(newOrgan);

    const value = await nextValue(state.organ$);
    expect(value).toEqual(newOrgan);
  });

  it('updates the view side', async () => {
    const newGender = 'female';
    state.setGender(newGender);

    const value = await nextValue(state.gender$);
    expect(value).toEqual(newGender);
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
    const newSites = [{id: 2}] as VisibilityItem[];
    state.setExtractionSites(newSites);

    const value = await nextValue(state.extractionSites$);
    expect(value).toEqual(newSites);
  });

  it('updates anatomical structures', async () => {
    const newStructures = [{id: 3}] as VisibilityItem[];
    state.setAnatomicalStructures(newStructures);

    const value = await nextValue(state.anatomicalStructures$);
    expect(value).toEqual(newStructures);
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
});
