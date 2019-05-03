import { DebugElement, Type } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { Shallow } from 'shallow-render';
import { OrganDataService } from 'src/app/shared/services/organ-data/organ-data.service';

import { OrganComponent } from './organ.component';
import { OrganModule } from './organ.module';

describe('OrganComponent', () => {
  let component: OrganComponent;
  let find: (cssOrDirective: string | Type<any>) => DebugElement & DebugElement[];
  let get: <T>(type: Type<T>) => T;
  let shallow: Shallow<OrganComponent>;

  function createMockOrganDataService(): OrganDataService {
    const mock = jasmine.createSpyObj<OrganDataService>(['getCounts']);
    (mock as any).organImagePath = new BehaviorSubject('i1');
    (mock as any).organOverlays = new BehaviorSubject([{ id: 'o1', overlayUrl: 'oi1' }]);

    return mock;
  }

  beforeEach(async () => {
    // FIXME: Setup correctly
    shallow = new Shallow(OrganComponent, OrganModule)
      .import(RouterTestingModule.withRoutes([{ path: '', component: OrganComponent }]))
      .provide(OrganDataService)
      .mock(OrganDataService, createMockOrganDataService());

    ({ instance: component, get, find } = await shallow.render());
  });

  describe('component', () => {
    // No tests currently
  });

  describe('dom', () => {
    // TODO
  });
});
