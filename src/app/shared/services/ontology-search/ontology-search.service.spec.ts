import { TestBed } from '@angular/core/testing';

import { OntologySearchService } from './ontology-search.service';

describe('OntologySearchService', () => {
  let service: OntologySearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OntologySearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
