import { TestBed } from '@angular/core/testing';

import { OntologySearchService } from './ontology-search.service';

describe('OntologySearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OntologySearchService = TestBed.get(OntologySearchService);
    expect(service).toBeTruthy();
  });
});
