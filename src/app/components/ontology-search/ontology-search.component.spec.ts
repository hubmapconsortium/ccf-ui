import { DebugElement, Type } from '@angular/core';
import { Shallow } from 'shallow-render';

import { OntologySearchComponent } from './ontology-search.component';
import { OntologySearchModule } from './ontology-search.module';

describe('OntologySearchComponent', () => {
  let component: OntologySearchComponent;
  let find: (cssOrDirective: string | Type<any>) => DebugElement & DebugElement[];
  let get: <T>(type: Type<T>) => T;
  let shallow: Shallow<OntologySearchComponent>;

  beforeEach(async () => {
    shallow = new Shallow(OntologySearchComponent, OntologySearchModule);
    ({ instance: component, get, find } = await shallow.render());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
