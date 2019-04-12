import { TestBed } from '@angular/core/testing';

import { OrganDataService } from './organ-data.service';

describe('OrganDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [OrganDataService]
    });
  });

  it('should be createdsadasdas', () => {
    const service: OrganDataService = TestBed.get(OrganDataService);
    expect(service).toBeTruthy();
  });
});
