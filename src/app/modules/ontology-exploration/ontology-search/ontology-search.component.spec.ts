import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { of } from 'rxjs';
import { Shallow } from 'shallow-render';
import { OntologySearchService, SearchResult } from 'src/app/core/services/ontology-search/ontology-search.service';

import { OntologySearchComponent } from './ontology-search.component';
import { OntologySearchModule } from './ontology-search.module';

fdescribe('OntologySearchComponent', () => {
  let shallow: Shallow<OntologySearchComponent>;
  let mockSearchService: jasmine.SpyObj<OntologySearchService>;

  beforeEach(() => {
    mockSearchService = jasmine.createSpyObj<OntologySearchService>(['loadOntology', 'filter']);
    mockSearchService.filter.and.returnValue(of([]));

    shallow = new Shallow(OntologySearchComponent, OntologySearchModule)
      .mock(OntologySearchService, mockSearchService);
  });

  it('should display the label in correct format', async () => {
    const option = {
      displayLabel: ['first', 'second']
    } as SearchResult;
    const { instance } = await shallow.render();
    const value  = instance.displayFormatter(option);
    expect(value).toBe('firstsecond');
  });

  it('should get lower case string to sort in lexical order', async () => {
    const entry = {
      node : {
        label: 'My Label'
      }
    } as SearchResult;
    const { instance } = await shallow.render();
    const value  = instance.sortLexically(entry);
    expect(value).toBe('my label');
  });

  it('should sort by synonym result1', async () => {
    const entry = {
      displayLabel : ['first', '(second)']
    } as SearchResult;
    const { instance } = await shallow.render();
    const value  = instance.sortBySynonymResult(entry);
    expect(value).toBe(1);
  });

  it('should sort by synonym result2', async () => {
    const entry = {
      displayLabel : ['first', 'second']
    } as SearchResult;
    const { instance } = await shallow.render();
    const value  = instance.sortBySynonymResult(entry);
    expect(value).toBe(-1);
  });

  it('should call on select when node is selected', async () => {
    const event = {
      option: {
        value: {
          node: {
            label: 'label'
          }
        }
      }
    } as MatAutocompleteSelectedEvent;

    const { instance } = await shallow.render({ bind: {} });
    const spy = spyOn(instance, 'onSelect');
    instance.onSelect(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should emit the node when selected', async () => {
    const { instance, outputs } = await shallow.render({ bind: {} });
    const event = {
      option: {
        value: {
          node: {
            label: 'label'
          }
        }
      }
    } as MatAutocompleteSelectedEvent;
    instance.onSelect(event);

    expect(outputs.selected.emit).toHaveBeenCalled();
  });
});
