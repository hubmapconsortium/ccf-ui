import { TestBed } from '@angular/core/testing';
import { of as rxOf } from 'rxjs';

import { LocalDatabaseService } from '../database/local/local-database.service';
import { TissuesBrowserDataService } from './tissues-browser-data.service';

describe('TissuesBrowserDataService', () => {
  const mockedDatabaseService = {
    getTissueImages() {
      return rxOf([]);
    }
  };

  let service: TissuesBrowserDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TissuesBrowserDataService,
        { provide: LocalDatabaseService, useValue: mockedDatabaseService }
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.get(TissuesBrowserDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
