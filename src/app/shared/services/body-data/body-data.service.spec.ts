import { TestBed } from '@angular/core/testing';
import { Store } from '@ngxs/store';

import { LocalDatabaseService } from '../database/local/local-database.service';
import { BodyDataService } from './body-data.service';


describe('BodyDataService', () => {
  let service: BodyDataService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LocalDatabaseService, useValue: {} },
        BodyDataService,
        { provide: Store, useValue: {} }
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.get(BodyDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be get overlays', () => {
    const getOverlays = service.getBodyOverlays();
    getOverlays.toPromise().then((overlays) => {
      expect(overlays.length).toBe(2);
    });
  });
});
