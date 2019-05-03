import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { PropertyPath } from 'lodash';
import { combineLatest, Observable, of } from 'rxjs';
import { map, mergeAll, pluck, share, switchMap, toArray } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { LocalDatabaseService } from '../../services/database/local/local-database.service';
import { Patient, TissueImage, TissueSample, TissueSlice } from '../../state/database/database.models';
import { CountMetaData } from '../../state/organ-meta-data/organ-meta-data.model';
import { SearchStateModel } from '../../state/search/search.model';
import { FilterBuilder, SearchState } from '../../state/search/search.state';

@Injectable()
export class BodyDataService {

  private readonly countObservableMap = new WeakMap<any, Observable<CountMetaData>>();
  /**
   * Path to images of tissues - TODO - this will come from a json file eventually
   */
  private readonly pathToImages = environment.ccfAssetUrl + '/body';

  constructor(private readonly localDatabase: LocalDatabaseService, private readonly store: Store) {}
  /**
   * Emits the current search state.
   */
  @Select(SearchState)
  private searchState: Observable<SearchStateModel>;

  /**
   * Emits the filter builder for patient.
   */
  @Select(SearchState.patientFilterBuilder)
  private patientFilterBuilder: Observable<FilterBuilder<Patient>>;

  /**
   * Emits the filter builder for Tissue Sample.
   */
  @Select(SearchState.tissueSampleFilterBuilder)
  private tissueSampleBuilder: Observable<FilterBuilder<TissueSample>>;

  /**
   * Emits the filter builder for Tissue Image.
   */
  @Select(SearchState.tissueImageFilterBuilder)
  private tissueImageBuilder: Observable<FilterBuilder<TissueImage>>;

  /**
   * Emits the filter builder for Tissue Slice.
   */
  @Select(SearchState.tissueSliceFilterBuilder)
  private tissueSliceBuilder: Observable<FilterBuilder<TissueSlice>>;

  /**
   * Gets body source path
   * @returns Observable of body source path
   */
  getBodySourcePath(): Observable<string> {
    return this.searchState.pipe(
      pluck('gender'),
      map(gender => gender !== undefined ? gender : 'both'),
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
      switchMap(filter => this.localDatabase.getPatients(filter).pipe(
        mergeAll(),
        pluck('metadata'),
        toArray()
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

  /**
   * Queries the number of slices, images, etc. that exists for a sample.
   *
   * @param sample The tissue sample for which to count objects.
   * @returns The counts of the different objects.
   */
  getCounts(sample: any): Observable<CountMetaData> {
    if (this.countObservableMap.has(sample)) {
      return this.countObservableMap.get(sample);
    }

    const result = this.createCountsObservable(sample.id);
    this.countObservableMap.set(sample, result);
    return result;
  }

  /**
   * Creates an observable returning counts for the specified tissue sample id.
   *
   * @param sampleId The indetifier.
   * @returns An observable emitting the counts.
   */
  private createCountsObservable(sampleId: string): Observable<CountMetaData> {
    const patientCountObservable = this.getCountsFor(
      'getPatients', SearchState.patientFilterBuilder,
      'anatomicalLocations[0]', sampleId
    );
    const sampleCountObservable = this.getCountsFor(
      'getTissueSamples', SearchState.tissueSampleFilterBuilder,
      'patient.anatomicalLocations[0]', sampleId
    );
    const sliceCountObservable = this.getCountsFor(
      'getTissueSlices', SearchState.tissueSliceFilterBuilder,
      'sample.patient.anatomicalLocations[0]', sampleId
    );
    const imageCountObservable = this.getCountsFor(
      'getTissueImages', SearchState.tissueImageFilterBuilder,
      'slice.sample.patient.anatomicalLocations[0]', sampleId
    );
    const counts = combineLatest(
      patientCountObservable, sampleCountObservable,
      sliceCountObservable, imageCountObservable
    ).pipe(
      map(([patientCount, sampleCount, sliceCount, imageCount]) => ({
        patientsCount: patientCount,
        tissueSamplesCount: sampleCount,
        tissueSlicesCount: sliceCount,
        tissueImagesCount: imageCount,
        cells: 0
      })),
      share()
    );

    return counts;
  }

  /**
   * Queries the number of items exists of a specific object type.
   *
   * @param method The database method used to query items.
   * @param selector The filter builder selector for the associated object type.
   * @param path Path which's value must match the provided value.
   * @param value A value to match against (usually an identifier)
   * @returns An observable emitting a count of the objects.
   */
  private getCountsFor<T>(
    method: keyof LocalDatabaseService,
    selector: (state: any) => FilterBuilder<T>,
    path: PropertyPath,
    value: string
  ): Observable<number> {
    const { localDatabase: db, store } = this;
    const queryFun = db[method].bind(db) as (filter: (obj: T) => boolean) => Observable<T[]>;
    return store.select(selector).pipe(
      map(builder => builder.addMatches(path, value)),
      map(builder => builder.toFilter()),
      switchMap(queryFun),
      map(items => items.length)
    );
  }
}
