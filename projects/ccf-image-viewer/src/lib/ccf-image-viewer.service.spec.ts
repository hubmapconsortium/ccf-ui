import { TestBed } from '@angular/core/testing';

import { CcfImageViewerService } from './ccf-image-viewer.service';

describe('CcfImageViewerService', () => {
  let service: CcfImageViewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CcfImageViewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
