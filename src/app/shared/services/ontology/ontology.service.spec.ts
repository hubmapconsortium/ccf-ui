import { Component, NgModule, Type } from '@angular/core';
import { Store } from '@ngxs/store';
import { Shallow } from 'shallow-render';

import { OntologyService } from './ontology.service';

@Component({ selector: 'ccf-test', template: '' })
class TestComponent { }

@NgModule({ declarations: [TestComponent], exports: [TestComponent] })
class TestModule { }

describe('OntologyService', () => {
  let get: <T>(type: Type<T>) => T;
  let service: OntologyService;
  let shallow: Shallow<TestComponent>;
  let store: Store;

  beforeEach(async () => {
    shallow = new Shallow(TestComponent, TestModule)
      .dontMock(OntologyService);

    ({ get } = await shallow.render());
    store = get(Store);
    service = get(OntologyService);
  });

  // TODO tests
});
