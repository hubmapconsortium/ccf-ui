import { TestBed } from '@angular/core/testing';

import { BodyDataService } from './body-data.service';

describe('BodyDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BodyDataService = TestBed.get(BodyDataService);
    expect(service).toBeTruthy();
  });
});
