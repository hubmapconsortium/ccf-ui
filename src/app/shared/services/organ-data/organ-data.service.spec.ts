import { TestBed } from '@angular/core/testing';

import { OrganDataService } from './organ-data.service';

describe('OrganDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrganDataService = TestBed.get(OrganDataService);
    expect(service).toBeTruthy();
  });
});
