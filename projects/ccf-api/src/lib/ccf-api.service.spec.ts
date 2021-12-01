import { TestBed } from '@angular/core/testing';

import { CcfApiService } from './ccf-api.service';

describe('CcfApiService', () => {
  let service: CcfApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CcfApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
