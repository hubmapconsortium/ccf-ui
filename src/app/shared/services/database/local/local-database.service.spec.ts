import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';

import { LocalDatabaseService } from './local-database.service';

describe('LocalDatabaseService', () => {
  let service: LocalDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: { get: () => of('{}') } },
        { provide: Store, useValue: { select: () => of({ nodes: { } }) } },
        LocalDatabaseService
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.get(LocalDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
