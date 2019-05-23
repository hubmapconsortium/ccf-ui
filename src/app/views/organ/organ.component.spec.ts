import { DebugElement, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Shallow } from 'shallow-render';
import { OrganDataService } from 'src/app/shared/services/organ-data/organ-data.service';

import { OrganRoutingModule } from './organ-routing.module';
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
    shallow = new Shallow(OrganComponent, OrganModule)
      .dontMock(OrganRoutingModule)
      .provide(OrganDataService)
      .mock(OrganDataService, createMockOrganDataService());

    ({ instance: component, get, find } = await shallow.render());
  });

  describe('component', () => {
    describe('pluralizeSuffix(count, suffix)', () => {
      it('adds a trailing \'s if count !== 1', () => {
        expect(component.pluralizeSuffix(0, 'abc')).toEqual('abcs');
      });

      it('does nothing if count === 1', () => {
        expect(component.pluralizeSuffix(1, 'abc')).toEqual('abc');
      });
    });

    describe('pluralize(count, suffix)', () => {
      it('creates a string containing the count', () => {
        expect(component.pluralize(0, 'abc')).toContain('0');
      });

      it('creates a string containing the suffix', () => {
        expect(component.pluralize(0, 'abc')).toContain('abc');
      });

      it('pluralizes the suffix', () => {
        const spy = spyOn(component, 'pluralizeSuffix');
        component.pluralize(0, 'abc');
        expect(spy).toHaveBeenCalled();
      });
    });
  });

  describe('dom', () => {
    // TODO
  });
});
