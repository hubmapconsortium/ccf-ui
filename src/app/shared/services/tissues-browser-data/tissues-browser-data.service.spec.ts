import { TestBed } from '@angular/core/testing';

import { TissuesBrowserDataService } from './tissues-browser-data.service';

describe('TissuesBrowserDataService', () => {
  let service: TissuesBrowserDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TissuesBrowserDataService]
    });
  });

  beforeEach(() => {
    service = TestBed.get(TissuesBrowserDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
