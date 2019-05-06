import { TestBed } from '@angular/core/testing';

import { LocalDatabaseService } from '../database/local/local-database.service';
import { BodyDataService } from './body-data.service';
import { Store } from '@ngxs/store';


describe('BodyDataService', () => {
  let service: BodyDataService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LocalDatabaseService, useValue: {} },
        BodyDataService,
        {provide: Store, useValue: {}}
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.get(BodyDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
