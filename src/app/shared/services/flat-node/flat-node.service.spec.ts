import { TestBed } from '@angular/core/testing';

import { FlatNodeService } from './flat-node.service';

describe('FlatNodeService', () => {
  let service: FlatNodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlatNodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
