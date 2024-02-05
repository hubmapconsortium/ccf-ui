import { NgxsDataPluginModule } from '@angular-ru/ngxs';
import { TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { CCFDatabaseDataSourceService, DataSourceService, GlobalConfigState } from 'ccf-shared';

import { DataState, DEFAULT_FILTER } from './data.state';

describe('DataState', () => {
  let dataState: DataState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsDataPluginModule.forRoot(),
        NgxsModule.forRoot([DataState, GlobalConfigState])
      ],
      providers: [
        { provide: DataSourceService, useExisting: CCFDatabaseDataSourceService }
      ]
    });

    dataState = TestBed.inject(DataState);
  });

  it('has a default filter', () => {
    expect(dataState.getState().filter).toEqual(DEFAULT_FILTER);
  });

  describe('.updateFilter(changes)', () => {
    it('updates the filter', () => {
      dataState.updateFilter({ sex: 'Female' });
      expect(dataState.getState().filter.sex).toEqual('Female');
    });
  });
});
