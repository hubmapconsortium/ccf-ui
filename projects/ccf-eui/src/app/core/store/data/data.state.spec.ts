import { TestBed } from '@angular/core/testing';
import { NgxsDataPluginModule } from '@ngxs-labs/data';
import { NgxsModule } from '@ngxs/store';
import { GlobalConfigState } from 'ccf-shared';

import { DataSourceService } from '../../services/data-source/data-source.service';
import { LocalDataSourceService } from '../../services/data-source/local-data-source.service';
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
        { provide: DataSourceService, useExisting: LocalDataSourceService }
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
