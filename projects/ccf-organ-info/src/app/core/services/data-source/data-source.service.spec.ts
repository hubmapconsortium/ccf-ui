import { TestBed } from '@angular/core/testing';
import { DataSourceService } from './data-source.service';

describe('DataSourceService', () => {
  // simple test
  it('should be created', () => {
    const service: DataSourceService = TestBed.get(DataSourceService);
    expect(service).toBeTruthy();
  });
});
