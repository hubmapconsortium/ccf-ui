import { TestBed } from '@angular/core/testing';
import { NgxsDataPluginModule } from '@ngxs-labs/data';
import { NgxsModule, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { ModelState, SlicesConfig, ViewSide, ViewType, XYZTriplet } from './model.state';


function nextValue<T>(obs: Observable<T>): Promise<T> {
  return obs.pipe(take(1)).toPromise();
}


describe('ModelState', () => {
  const initialXYZTriplet: XYZTriplet = { x: 0, y: 0, z: 0 };
  const initialSlicesConfig: SlicesConfig = { thickness: 0, numSlices: 1 };
  const initialViewType: ViewType = 'register';
  const initialViewSide: ViewSide = 'anterior';
  let state: ModelState;

  beforeEach(() => {
    // NOTE: No need for shallow-render since
    // the setup is so simple. It would also require
    // us to create both a fake component and module.
    TestBed.configureTestingModule({
      imports: [
        NgxsDataPluginModule.forRoot(),
        NgxsModule.forRoot([ModelState])
      ]
    });

    TestBed.inject(Store).reset({
      model: {
        blockSize: initialXYZTriplet,
        rotation: initialXYZTriplet,
        slicesConfig: initialSlicesConfig,
        viewType: initialViewType,
        viewSide: initialViewSide
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
});
