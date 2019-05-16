import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { safeLoad } from 'js-yaml';
import { Observable } from 'rxjs';
import { delay as RxDelay, map as RxMap, pluck as RxPluck, shareReplay as RxShareReplay } from 'rxjs/operators';

import { LocalDatabase, Patient, TissueImage, TissueSlice, TissueSample, TissueOverlay } from '../../../state/database/database.models';
import { environment } from '../../../../../environments/environment';


/**
 * A service connecting to a small in-memory local tissue database
 */
@Injectable({
  providedIn: 'root'
})
export class LocalDatabaseService {
  /**
   * Max delay to use when emulating network responses
   */
  private emulatedHttpDelay = 500;

  /**
   * URL to the local database to download in .yml format
   */
  private localDatabaseUrl = environment.localDatabaseUrl;

  /** cached local database observable */
  private _database$: Observable<LocalDatabase>;

  /**
   * Creates an instance of the local database service.
   */
  constructor(private http: HttpClient) {}

  /**
   * The tissue database, parsed from a remote yml file
   */
  private get database$(): Observable<LocalDatabase> {
    if (!this._database$) {
      this._database$ = this.http.get(this.localDatabaseUrl, {responseType: 'text'}).pipe(
        RxMap<string, LocalDatabase>(results => safeLoad(results)),
        RxShareReplay(1)
      );
    }

    return this._database$;
  }

  /**
   * Query function to get patients from the tissue database
   *
   * @param filter a function used to optionally filter the associated data array
   */
  getPatients(filter?: (item: Patient) => boolean): Observable<Patient[]> {
    return this.query<Patient>('patients', filter);
  }

  /**
   * Query function to get tissue samples from the tissue database
   *
   * @param filter a function used to optionally filter the associated data array
   */
  getTissueSamples(filter?: (item: TissueSample) => boolean): Observable<TissueSample[]> {
    return this.query<TissueSample>('samples', filter);
  }

  /**
   * Query function to get tissue slices from the tissue database
   *
   * @param filter a function used to optionally filter the associated data array
   */
  getTissueSlices(filter?: (item: TissueSlice) => boolean): Observable<TissueSlice[]> {
    return this.query<TissueSlice>('slices', filter);
  }

  /**
   * Query function to get tissue images from the tissue database
   *
   * @param filter a function used to optionally filter the associated data array
   */
  getTissueImages(filter?: (item: TissueImage) => boolean): Observable<TissueImage[]> {
    return this.query<TissueImage>('images', filter);
  }

  /**
   * Gets tissue overlays
   * @param [filter] a function used to optionally filter the associated data array.
   * @returns An observable for the tissue overlays.
   */
  getTissueOverlays(filter?: (item: TissueOverlay) => boolean): Observable<TissueOverlay[]> {
    return this.query<TissueOverlay>('overlays', filter);
  }

  /**
   * Query function to get data items from the tissue database
   *
   * @param field a field in the LocalDatabase to pluck
   * @param filter a function used to optionally filter the associated data array
   */
  private query<T>(field: string, filter?: (item: T) => boolean): Observable<T[]> {
    let data$: Observable<T[]> = this.database$.pipe(RxPluck(field));

    // Filter data items if a filter function is provided
    if (filter) {
      data$ = data$.pipe(RxMap((items: T[]) => items.filter(filter)));
    }

    // Add an emulated delay
    const emulatedHttpDelay = Math.round(Math.random() * this.emulatedHttpDelay);
    data$ = data$.pipe(RxDelay(emulatedHttpDelay));

    return data$;
  }
}
