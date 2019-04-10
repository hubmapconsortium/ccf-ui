import { TestBed, async, inject } from '@angular/core/testing';

import { TissueGuard } from './tissue.guard';

describe('TissueGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TissueGuard]
    });
  });

  it('should ...', inject([TissueGuard], (guard: TissueGuard) => {
    expect(guard).toBeTruthy();
  }));
});
