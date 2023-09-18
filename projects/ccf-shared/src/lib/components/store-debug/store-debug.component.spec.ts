import { NgxsModule, Store } from '@ngxs/store';
import { Shallow } from 'shallow-render';

import { StoreDebugComponent } from './store-debug.component';
import { StoreDebugModule } from './store-debug.module';


describe('StoreDebugComponent', () => {
  let shallow: Shallow<StoreDebugComponent>;

  beforeEach(() => {
    shallow = new Shallow(StoreDebugComponent, StoreDebugModule)
      // NOTE: When importing NgxsModule.forRoot() the returned module
      // is NOT NgxsModule but the internal NgxsRootModule!
      // Therefore .dontMock(NgxsModule) will NOT work as expected!
      // The following is a workaround.
      .import(NgxsModule)
      .replaceModule(NgxsModule, NgxsModule.forRoot());
  });

  it('should turn the state into flat key-value lists', async () => {
    const { instance, inject } = await shallow.render();
    inject(Store).reset({ test: { key: 'value' } });

    expect(instance.data).toEqual([['test', [['key', 'value']]]]);
  });

  it('excludes state with no data', async () => {
    const { instance, inject } = await shallow.render();
    inject(Store).reset({ test: { } });

    expect(instance.data).toEqual([]);
  });
});
