import { Component, NgModule, Type } from '@angular/core';
import { Store } from '@ngxs/store';
import { take } from 'rxjs/operators';
import { Shallow } from 'shallow-render';

import { OntologySearchService } from './ontology-search.service';

@Component({ selector: 'ccf-test', template: '' })
class TestComponent { }

@NgModule({ declarations: [TestComponent], exports: [TestComponent] })
class TestModule { }
describe('OntologySearchService', () => {
  let get: <T>(type: Type<T>) => T;
  let service: OntologySearchService;
  let shallow: Shallow<TestComponent>;
  let store: Store;

  beforeEach(async () => {
    shallow = new Shallow(TestComponent, TestModule)
      .dontMock(OntologySearchService);

    ({ get } = await shallow.render());
    store = get(Store);
    service = get(OntologySearchService);
  });

  const label = 'thoracic cavity';
  const searchedValue = 'thor';

  const sampleOntologyNodes = {
    ['http://someurl/someResource']: {
      id: 'http://someurl/someResource',
      label: 'thoracic cavity',
      parent: 'http://someParentUrl/someParentResource',
      children: ['child1', 'child2'],
      synonymLabels: ['']
    },
    ['http://someOtherurl/someOtherResource']: {
      id: 'http://someOtherurl/someOtherResource',
      label: 'ascending aorta',
      parent: 'http://someParentUrl/someParentResource',
      children: ['child3'],
      synonymLabels: ['ascending thoracic aorta']
    }
  };


  it('filters search results', async () => {
    const expectedResults = [
      {
        index: 0,
        displayLabel: ['', 'thor', 'acic cavity'],
        node: sampleOntologyNodes['http://someurl/someResource']
      },
      {
        index: 27,
        displayLabel: ['ascending aorta (ascending ', 'thor', 'acic aorta)'],
        node: sampleOntologyNodes['http://someOtherurl/someOtherResource']
      }
    ];

    store.reset({ ontology: { nodes: sampleOntologyNodes }});
    const results = service.filter(searchedValue);
    const value = await results.pipe(take(1)).toPromise();
    expect(value).toEqual(jasmine.arrayContaining(expectedResults));
  });

  it('formats label of search-result', () => {
    const result = service.formatLabel(label, searchedValue);
    expect(result).toEqual(['', 'thor', 'acic cavity']);
  });

  it('returns index of searched value match in the label', () => {
    const result = service.getIndexOfMatch(label, searchedValue);
    expect(result).toEqual(0);
  });
});
