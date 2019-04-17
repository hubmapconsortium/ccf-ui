import { Component, NgModule, Type } from '@angular/core';
import { Store } from '@ngxs/store';
import { Shallow } from 'shallow-render';

import { TissuesBrowserDataService } from './tissues-browser-data.service';
import { NavigationStateModel } from '../../state/navigation/navigation.model';
import { take } from 'rxjs/operators';

@Component({ selector: 'ccf-test', template: '' })
class TestComponent { }

@NgModule({ declarations: [TestComponent], exports: [TestComponent] })
class TestModule { }

describe('TissuesBrowserDataService', () => {
  let get: <T>(type: Type<T>) => T;
  let service: TissuesBrowserDataService;
  let shallow: Shallow<TestComponent>;
  let store: Store;

  beforeEach(async () => {
    shallow = new Shallow(TestComponent, TestModule)
      .provide(TissuesBrowserDataService)
      .dontMock(TissuesBrowserDataService);

    ({ get } = await shallow.render());
    store = get(Store);
    service = get(TissuesBrowserDataService);
  });

  describe('data', () => {
    const navigationState = { tissues: [{ id: '1' }, { id: '2' }, { id: '3' }] } as NavigationStateModel;
    beforeEach(() => store.reset({ navigation: navigationState }));

    it('produces the values from navigations state\'s tissues array', async () => {
      const result = await service.data.pipe(take(1)).toPromise();
      expect(result).toEqual(navigationState.tissues);
    });
  });
});
