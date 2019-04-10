import { TestBed, async, inject } from '@angular/core/testing';

import { OrganGuard } from './organ.guard';

describe('OrganGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrganGuard]
    });
  });

  it('should ...', inject([OrganGuard], (guard: OrganGuard) => {
    expect(guard).toBeTruthy();
  }));
});
