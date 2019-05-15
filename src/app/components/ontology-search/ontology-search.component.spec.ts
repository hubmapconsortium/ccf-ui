import { DebugElement, Type } from '@angular/core';
import { Shallow } from 'shallow-render';

import { SearchResult } from '../../shared/services/ontology-search/ontology-search.service';
import { OntologySearchComponent } from './ontology-search.component';
import { OntologySearchModule } from './ontology-search.module';

describe('OntologySearchComponent', () => {
  let component: OntologySearchComponent;
  let find: (cssOrDirective: string | Type<any>) => DebugElement & DebugElement[];
  let get: <T>(type: Type<T>) => T;
  let shallow: Shallow<OntologySearchComponent>;

  const sampleSearchResult: SearchResult = {
    index: 0,
    displayLabel: ['', 'thor', 'acic cavity'],
    node: {
      id: 'http://someurl/someResource',
      label: 'thoracic cavity',
      parent: 'http://someParentUrl/someParentResource',
      children: ['child1', 'child2'],
      synonymLabels: ['aorta something']
    }
  };

  beforeEach(async () => {
    shallow = new Shallow(OntologySearchComponent, OntologySearchModule);
    ({ instance: component, get, find } = await shallow.render());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should format search result value', () => {
    const result = component.displayFormatter(sampleSearchResult);
    expect(result).toEqual(sampleSearchResult.node.label);
  });

  describe('dom', () => {
    it('search input exists', () => {
      expect(find('.input')).toBeTruthy();
    });

    it('autocomplete exists', () => {
      expect(find('.autocomplete')).toBeTruthy();
    });

    it('help icon exists', () => {
      expect(find('.help-icon')).toBeTruthy();
    });
  });
});




