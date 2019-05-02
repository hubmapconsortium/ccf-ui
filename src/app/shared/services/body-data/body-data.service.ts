import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { map, mergeAll, pluck, switchMap, toArray, count, shareReplay } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { LocalDatabaseService } from '../../services/database/local/local-database.service';
import { Patient } from '../../state/database/database.models';
import { NavigationStateModel } from '../../state/navigation/navigation.model';
import { NavigationState } from '../../state/navigation/navigation.state';
import { FilterBuilder, SearchState } from '../../state/search/search.state';

// import { toPairs } from 'lodash';
@Injectable()
export class BodyDataService {
  /**
   * Path to images of tissues - TODO - this will come from a json file eventually
   */
  private readonly pathToImages = environment.ccfAssetUrl + '/body';
  private patients$: Observable<Patient[]>;

  constructor(private readonly localDatabaseService: LocalDatabaseService) {}
  /**
   * Emits the current navigation state.
   */
  @Select(NavigationState)
  private navigationState: Observable<NavigationStateModel>;

  /**
   * Emits the filter builder for patient.
   */
  @Select(SearchState.patientFilterBuilder)
  private patientFilterBuilder: Observable<FilterBuilder<Patient>>;

  /**
   * Gets body source path
   * @returns Observable of body source path
   */
  getBodySourcePath(): Observable<string> {
    return this.navigationState.pipe(
      pluck('activeBodyId'),
      map(id => id && `${this.pathToImages}/${id}/`)
    );
  }

  /**
   * TODO - based on the data format, the logic needs to be updated
   * Gets the metadata for the organ on body
   * @returns Observable for metadata for the organ on body
   */
  getMetadata(organ: string): Observable<any> {
    return this.patientFilterBuilder.pipe(
      map(builder => builder.addIsIncluded('anatomicalLocations', organ)),
      map(builder => builder.toFilter()),
      switchMap(filter => this.localDatabaseService.getPatients(filter).pipe(
        mergeAll(),
        pluck('metadata'),
        toArray()
      )),
    );
  }

  /**
   * TODO - based on the data format, the logic needs to be updated
   * Gets the metadata for the organ on body
   * @returns Observable for metadata for the organ on body
   */
  getPatientsForAnatomicalLocation(organ: string): Observable<any> {
    return this.patientFilterBuilder.pipe(
      map(builder => builder.addIsIncluded('anatomicalLocations', organ)),
      map(builder => builder.toFilter()),
      switchMap(filter => this.localDatabaseService.getPatients(filter).pipe(
        mergeAll(),
        shareReplay(1)
      )),
    );
  }

  /**
   * Gets body overlays.
   * @returns Body overlays Ids with corresponding path.
   */
  getBodyOverlays(): Observable<{id: string, path: string}[]> {
    return of(['kidney', 'heart'].map(s => {
      return {id: s, path: `${this.pathToImages}/overlays/${s}/${s}.svg`};
    }));
  }

  getPatientsCount(organ: string): Observable<number> {
    return this.patientFilterBuilder.pipe(
      map(builder => builder.addIsIncluded('anatomicalLocations', organ)),
      map(builder => builder.toFilter()),
      switchMap(filter => this.localDatabaseService.getPatients(filter).pipe(
        mergeAll(),
        count()
      ))
    );
  }

  getCounts() {
    this.getBodyOverlays().subscribe((rValue: {id: string, path: string}[]) => {
      rValue.forEach(element => {
        this.patients$ = this.patientFilterBuilder.pipe(
          map(builder => builder.addIsIncluded('anatomicalLocations', element.id)),
          map(builder => builder.toFilter()),
          switchMap(filter => this.localDatabaseService.getPatients(filter)));
      });
    });
  }

  commonMethod(organ: string, type: string) {

      if (type === 'metadata') {
        return patients.pipe(mergeAll());
      }

      if (type === 'patientCount') {
        return patients.pipe(mergeAll(), count());
      }
  }
}
