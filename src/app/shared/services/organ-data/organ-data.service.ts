import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { TissueSample, Patient, TissueSlice, TissueImage } from '../../state/database/database.models';
import { NavigationState } from '../../state/navigation/navigation.state';
import { LocalDatabaseService } from '../database/local/local-database.service';

/**
 * Injectable organ data service talks to localdatabase.
 */
@Injectable()
export class OrganDataService {

  /**
   * Creates an instance of organ data service.
   * @param localDatabase to get irgan data.
   */
  constructor(
    private readonly localDatabase: LocalDatabaseService
  ) { }

  /**
   * Path to images of tissues - TODO - this will come from a json file eventually
   */
  private readonly pathToImages = environment.ccfAssetUrl + '/organ';

  /**
   * Emits the currently active organ.
   */
  @Select(NavigationState.activeOrgan)
  private activeOrgan: Observable<{ id: string }>; // FIXME: Update with proper organ object

  /**
   * Gets active organ.
   * @returns active organ Observable.
   */
  getActiveOrgan(): Observable<{ id: string }> {
    return this.activeOrgan;
  }

  /**
   * Gets organ source path
   * @returns Observable of organ source path
   */
  getOrganSourcePath(): Observable<string> {
    return this.activeOrgan.pipe(
      pluck('id'),
      map(id => id && `${this.pathToImages}/${id}/`)
    );
  }

  /**
   * Gets all tissue samples
   * @returns all tissue samples' observable.
   */
  getAllTissueSamples(organId: string): Observable<TissueSample[]> {
    return this.localDatabase.getTissueSamples((item: TissueSample) =>  item.patient.anatomicalLocations[0] === organId);
  }

  getCounts(organId: string): CountMetadata {
    const countMetadata: CountMetadata = {
      patients: 0,
      tissueSamples: 0,
      tissueSlices: 0,
      tissueImages: 0,
      cells: 0, // TODO: populate this with number of cells
    };
    this.localDatabase.getPatients((item: Patient) => item.anatomicalLocations[0] === organId)
    .toPromise().then(d => {
      countMetadata.patients = d.length;
    });
    this.localDatabase.getTissueSlices((item: TissueSlice) => item.sample.patient.anatomicalLocations[0] === organId)
    .toPromise().then(d => {
      countMetadata.tissueSlices = d.length;
    });
    this.localDatabase.getTissueImages((item: TissueImage) => item.slice.sample.patient.anatomicalLocations[0] === organId)
    .toPromise().then(d => {
      countMetadata.tissueImages = d.length;
    });
    return countMetadata;
  }
}

export interface CountMetadata {
  patients: number;
  tissueSamples: number;
  tissueSlices: number;
  tissueImages: number;
  cells: number;
}
