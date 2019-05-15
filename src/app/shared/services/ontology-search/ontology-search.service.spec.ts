import { TestBed } from '@angular/core/testing';

import { OntologySearchService } from './ontology-search.service';
import { sample } from 'rxjs/operators';

describe('OntologySearchService', () => {
  let service: OntologySearchService;
  const label = 'thoracic cavity';
  const searchedValue = 'thor';

  const sampleOntologyNodes = [
    {
      id: 'http://someurl/someResource',
      label: 'thoracic cavity',
      parent: 'http://someParentUrl/someParentResource',
      children: ['child1', 'child2'],
      synonymLabels: ['']
    },
    {
      id: 'http://someOtherurl/someOtherResource',
      label: 'ascending aorta',
      parent: 'http://someParentUrl/someParentResource',
      children: ['child3'],
      synonymLabels: ['ascending thoracic aorta']
    }
  ];

  beforeEach(() => TestBed.configureTestingModule({}));
  it('should be created', () => {
    service = TestBed.get(OntologySearchService);
    expect(service).toBeTruthy();
  });

  it('filters search results', () => {
    const expectedResults = [
      {
        index: 0,
        displayLabel: ['', 'thor', 'acic cavity'],
        node: sampleOntologyNodes[0]
      },
      {
        index: 27,
        displayLabel: ['ascending aorta (ascending ', 'thor', 'acic aorta)'],
        node: sampleOntologyNodes[1]
      }
    ];

    service.ontologyNodes = sampleOntologyNodes;
    const results = service.filter(searchedValue);
    expect(results).toEqual(expectedResults);
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
