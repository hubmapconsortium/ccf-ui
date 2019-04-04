import { TestBed } from '@angular/core/testing';

import { DownloadService } from './download.service';

describe('DownloadService', () => {
  let service: DownloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    });
  });

  beforeEach(() => {
    service = TestBed.get(DownloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // TODO: Test download functionality
});
