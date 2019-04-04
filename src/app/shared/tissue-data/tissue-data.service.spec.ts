import { TestBed } from '@angular/core/testing';

import { TissueDataService } from './tissue-data.service';

describe('TissueDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TissueDataService = TestBed.get(TissueDataService);
    expect(service).toBeTruthy();
  });
});
