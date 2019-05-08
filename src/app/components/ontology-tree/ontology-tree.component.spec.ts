import { DebugElement, Type } from '@angular/core';
import { Shallow } from 'shallow-render';

import { OntologyTreeComponent } from './ontology-tree.component';
import { OntologyTreeModule } from './ontology-tree.module';

describe('OntologyTreeComponent', () => {
  let component: OntologyTreeComponent<any>;
  let find: (cssOrDirective: string | Type<any>) => DebugElement & DebugElement[];
  let get: <T>(type: Type<T>) => T;
  let shallow: Shallow<OntologyTreeComponent<any>>;

  beforeEach(async () => {
    shallow = new Shallow(OntologyTreeComponent, OntologyTreeModule);
    ({ instance: component, get, find } = await shallow.render());
  });

  // TODO
});
