import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { OntologyTreeNode } from 'ccf-database'; //TODO: replace with CellTypeTreeNode
import { of } from 'rxjs';
import { RecursivePartial, Shallow } from 'shallow-render';

import { OntologySearchService, SearchResult } from '../../../core/services/ontology-search/ontology-search.service'; //TODO: replace with CellTypeSearchService
import { CellTypeSearchComponent } from './cell-type-search.component';
import { CellTypeSearchModule } from './cell-type-search.module';


@NgModule({})
class EmptyModule {}

function fromPartial<T>(partial: RecursivePartial<T>): T {
  return partial as T;
}

describe('CellTypeSearchComponent', () => {
  let shallow: Shallow<CellTypeSearchComponent>;
  let mockSearchService: jasmine.SpyObj<OntologySearchService>;

  beforeEach(() => {
    mockSearchService = jasmine.createSpyObj<OntologySearchService>(['filter']);
    mockSearchService.filter.and.returnValue(of([]));

    shallow = new Shallow(CellTypeSearchComponent, CellTypeSearchModule)
      .replaceModule(FormsModule, EmptyModule)
      .replaceModule(ReactiveFormsModule, EmptyModule)
      .replaceModule(MatInputModule, EmptyModule)
      .mock(OntologySearchService, mockSearchService);
  });

  it('should display the label in correct format', async () => {
    const option = fromPartial<SearchResult>({ displayLabel: ['first', 'second'] });
    const { instance } = await shallow.render();

    const value = instance.displayFormatter(option);
    expect(value).toBe('firstsecond');
  });

  it('should display the label in correct format given that displayLabel is not defined', async () => {
    const option = fromPartial<SearchResult>({});
    const { instance } = await shallow.render();

    const value = instance.displayFormatter(option);
    expect(value).toBe('');
  });

  it('should display the label in correct format given that option is undefined', async () => {
    const option = undefined;
    const { instance } = await shallow.render();

    const value = instance.displayFormatter(option);
    expect(value).toBe('');
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
    const node = fromPartial<OntologyTreeNode>({ label: 'label' });
    const event = fromPartial<MatAutocompleteSelectedEvent>({
      option: { value: { node } }
    });
    const { instance, outputs } = await shallow.render({ bind: {} });

    instance.onSelect(event);
    expect(outputs.selected.emit).toHaveBeenCalledWith(node);
  });

  it('should emit the node when selected given that node is undefined', async () => {
    const event = fromPartial<MatAutocompleteSelectedEvent>({
      option: { value: undefined }
    });
    const { instance, outputs } = await shallow.render({ bind: {} });

    instance.onSelect(event);
    expect(outputs.selected.emit).not.toHaveBeenCalled();
  });

  it('should handle the node selection', async () => {
    const node = fromPartial<OntologyTreeNode>({ label: 'label' });
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
