import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { of } from 'rxjs';
import { RecursivePartial, Shallow } from 'shallow-render';

import { OntologyNode } from '../../../core/models/ontology-node';
import { OntologySearchService, SearchResult } from '../../../core/services/ontology-search/ontology-search.service';
import { OntologySearchComponent } from './ontology-search.component';
import { OntologySearchModule } from './ontology-search.module';


function fromPartial<T>(partial: RecursivePartial<T>): T {
  return partial as T;
}


describe('OntologySearchComponent', () => {
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

    const value = instance.displayFormatter(option);
    expect(value).toBe('firstsecond');
  });

  it('should get lower case string to sort in lexical order', async () => {
    const entry = fromPartial<SearchResult>({ node: { label: 'My Label' } });
    const { instance } = await shallow.render();

    const value = instance.sortLexically(entry);
    expect(value).toBe('my label');
  });

  it('should sort by synonym result1', async () => {
    const entry = fromPartial<SearchResult>({ displayLabel: ['first', '(second)'] });
    const { instance } = await shallow.render();

    const value = instance.sortBySynonymResult(entry);
    expect(value).toBe(1);
  });

  it('should sort by synonym result2', async () => {
    const entry = fromPartial<SearchResult>({ displayLabel: ['first', 'second'] });
    const { instance } = await shallow.render();

    const value = instance.sortBySynonymResult(entry);
    expect(value).toBe(-1);
  });

  it('should emit the node when selected', async () => {
    const node = fromPartial<OntologyNode>({ label: 'label' });
    const event = fromPartial<MatAutocompleteSelectedEvent>({
      option: { value: { node } }
    });
    const { instance, outputs } = await shallow.render({ bind: {} });

    instance.onSelect(event);
    expect(outputs.selected.emit).toHaveBeenCalledWith(node);
  });

  it('should handle the node selection', async () => {
    const node = fromPartial<OntologyNode>({ label: 'label' });
    const event = fromPartial<MatAutocompleteSelectedEvent>({
      option: { value: { node } }
    });
    const { instance, findComponent } = await shallow.render({ bind: {} });
    const matComplete = findComponent(MatAutocomplete);
    const spy = spyOn(instance, 'onSelect');

    matComplete.optionSelected.emit(event);
    expect(spy).toHaveBeenCalledWith(event);
  });
});
