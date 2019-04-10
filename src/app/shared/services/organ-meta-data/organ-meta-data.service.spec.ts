import { TestBed } from '@angular/core/testing';

import { OrganMetaDataService } from './organ-meta-data.service';

describe('OrganMetaDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrganMetaDataService = TestBed.get(OrganMetaDataService);
    expect(service).toBeTruthy();
  });
});
