import { TestBed } from '@angular/core/testing';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';

import { CountMetaData } from '../../state/organ-meta-data/organ-meta-data.model';
import { LocalDatabaseService } from '../database/local/local-database.service';
import { BodyDataService } from './body-data.service';


describe('BodyDataService', () => {
  let service: BodyDataService;
  let countMetaData: CountMetaData;
  let sample: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LocalDatabaseService, useValue: {} },
        BodyDataService,
        { provide: Store, useValue: {} }
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.get(BodyDataService);
    countMetaData = {
      patientsCount: 1,
      tissueImagesCount: 1,
      tissueSamplesCount: 2,
      tissueSlicesCount: 3,
      cells: 4
    };
    sample = {
      id : 'sample'
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be get overlays',  async () => {
    const getOverlays = service.getBodyOverlays();
    const overlays = await getOverlays.toPromise();
    expect(overlays.length).toBe(2);
    });

  it('should get the count from already existing calculated count', async () => {
    (service as any).countObservableMap.set(sample, of(countMetaData));
    const result  = await service.getCounts(sample).toPromise();
    expect(result.patientsCount).toBe(1);
  });

  it('should get the count when count was not previously calculated', async () => {
    spyOn(service as any, 'createCountsObservable').and.returnValue(of(countMetaData));
    const result  = service.getCounts(sample);
    const data =  await result.toPromise();
    expect(data.cells).toBe(4);
  });
});
