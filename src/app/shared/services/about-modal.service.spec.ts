import { TestBed } from '@angular/core/testing';

import { AboutModalService } from './about-modal.service';

describe('AboutModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AboutModalService = TestBed.get(AboutModalService);
    expect(service).toBeTruthy();
  });
});
