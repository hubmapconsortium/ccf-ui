import { TestBed } from '@angular/core/testing';

import { FlatNode } from './flat-node.service';

describe('FlatNodeService', () => {
  let service: FlatNode;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlatNode);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
