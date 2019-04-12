import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule, Store } from '@ngxs/store';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { Observable, Subject } from 'rxjs';
import { take as rxTake, timeout as rxTimeout } from 'rxjs/operators';

import { TissueDataService } from './tissue-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LocalDatabaseService } from '../database/local/local-database.service';
import { TissueImage } from '../../state/database/database.models';

describe('TissueDataService', () => {
  const mockedLocalDatabase = {
    getTissueImages() {
      return mockedLocalDatabase.getTissueImageSubject = new Subject();
    },

    getTissueImageSubject: undefined as Subject<any>
  };

  const state = {
    router: {
      state: {
        root: {
          firstChild: {
            params: {
              tissueId: 1
            }
          }
        }
      }
    }
  };

  const tissueImage = {
    tileUrl: 'fob',
    metadata: { label: 'metadata'} as any,
    slice: { sample: { patient: { anatomicalLocations: ['heart'] } } }
  } as TissueImage;

  let service: TissueDataService;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot(),
        NgxsRouterPluginModule.forRoot(),
        NgxsDispatchPluginModule.forRoot(),
        RouterTestingModule
      ],
      providers: [
        { provide: LocalDatabaseService, useValue: mockedLocalDatabase },
        TissueDataService
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.get(TissueDataService);
    store = TestBed.get(Store);
  });

  beforeEach(() => {
    store.reset(state);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTissueSourcePath()', () => {
    let value: string;

    beforeEach(async () => {
      const observable = service.getTissueSourcePath();
      const promise = observable.pipe(
        rxTake(1),
        rxTimeout(1000)
      ).toPromise();

      mockedLocalDatabase.getTissueImageSubject.next([tissueImage]);
      value = await promise;
    });

    it('non-empty', () => {
      expect(value).toBeTruthy();
    });

    it('to be string', () => {
      expect(value).toEqual(jasmine.any(String));
    });
  });

  describe('getMetadata()', () => {
    let value: {[label: string]: string};

    beforeEach(async () => {
      const observable = service.getMetadata();
      const promise = observable.pipe(
        rxTake(1),
        rxTimeout(1000)
      ).toPromise();

      mockedLocalDatabase.getTissueImageSubject.next([tissueImage]);
      value = await promise;
    });

    it('non-empty', () => {
      expect(value).toBeTruthy();
    });
  });
});
