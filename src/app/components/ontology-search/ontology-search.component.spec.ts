import { DebugElement, Type } from '@angular/core';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { Shallow } from 'shallow-render';

import { OntologySearchService, SearchResult } from '../../shared/services/ontology-search/ontology-search.service';
import { OntologySearchComponent } from './ontology-search.component';
import { OntologySearchModule } from './ontology-search.module';
import { MatAutocompleteSelectedEvent } from '@angular/material';

describe('OntologySearchComponent', () => {
  let component: OntologySearchComponent;
  let find: (cssOrDirective: string | Type<any>) => DebugElement & DebugElement[];
  let get: <T>(type: Type<T>) => T;
  let shallow: Shallow<OntologySearchComponent>;

  const sampleSearchResult: SearchResult[] = [{
    index: 0,
    displayLabel: ['', 'thor', 'acic cavity'],
    node: {
      id: 'http://someurl/someResource',
      label: 'thoracic cavity',
      parent: 'http://someParentUrl/someParentResource',
      children: ['child1', 'child2'],
      synonymLabels: ['aorta something']
    }
  }];

  beforeEach(async () => {
    shallow = new Shallow(OntologySearchComponent, OntologySearchModule)
      .mock(OntologySearchComponent, { formControl: { valueChanges: of('thor') } });
    ({ instance: component, get, find } = await shallow.render());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should format search result value', () => {
    const result = component.displayFormatter(sampleSearchResult[0]);
    expect(result).toEqual(sampleSearchResult[0].node.label);
  });

  it('should get filtered results', async () => {
    spyOn(get(OntologySearchService), 'filter').and.returnValue(of(sampleSearchResult));
    const value = await component.filteredResults$.pipe(take(1)).toPromise();
    expect(value).toEqual(jasmine.arrayContaining(sampleSearchResult));
  });

  it('should emit selected value', () => {
    const node = sampleSearchResult[0].node;
    const event = { option : {
      value: {
        node: sampleSearchResult[0].node
      }
    }
  };
    component.onSelect(event as MatAutocompleteSelectedEvent);
    expect(component.selected.emit).toHaveBeenCalledWith(node);
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




