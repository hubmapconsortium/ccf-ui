import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { safeLoad } from 'js-yaml';
import { at, filter as loFilter, flatMap, forEach, last, split, uniq } from 'lodash';
import { combineLatest, Observable } from 'rxjs';
import { delay, map, pluck, shareReplay, skip } from 'rxjs/operators';

import { environment } from '../../../../../environments/environment';
import { OntologyStateModel } from '../../../../shared/state/ontology/ontology.model';
import { OntologyState } from '../../../../shared/state/ontology/ontology.state';
import {
  LocalDatabase,
  Patient,
  TissueImage,
  TissueOverlay,
  TissueSample,
  TissueSlice,
} from '../../../state/database/database.models';


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
  constructor(private http: HttpClient, private store: Store) {}

  /**
   * The tissue database, parsed from a remote yml file
   */
  private get database$(): Observable<LocalDatabase> {
    if (!this._database$) {
      this._database$ = combineLatest(
        [this.http.get(this.localDatabaseUrl, {responseType: 'text'}).pipe(
          map<string, LocalDatabase>(results => safeLoad(results))
        ),
        this.store.select(OntologyState)]
      ).pipe(
        // Skip first emission as it contains the empty ontology state.
        skip(1),
        map(([db, ontology]) => this.setPatientOntologyPositions(db, ontology)),
        shareReplay(1)
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
    let data$: Observable<T[]> = this.database$.pipe(pluck(field));

    // Filter data items if a filter function is provided
    if (filter) {
      data$ = data$.pipe(map((items: T[]) => items.filter(filter)));
    }

    // Add an emulated delay
    const emulatedHttpDelay = Math.round(Math.random() * this.emulatedHttpDelay);
    data$ = data$.pipe(delay(emulatedHttpDelay));

    return data$;
  }

  /**
   * Sets patient ontology positions
   *
   * @param db The database on which to set ontology positions.
   * @param ontology The current state of the ontology.
   * @returns The database.
   */
  private setPatientOntologyPositions(db: LocalDatabase, ontology: OntologyStateModel): LocalDatabase {
    const { nodes } = ontology;
    const namesToNode: { [name: string]: string } = {};

    forEach(nodes, node => {
      namesToNode[last(split(node.id))] = node.id;
      namesToNode[node.label] = node.id;
      forEach(node.synonymLabels, syn => namesToNode[syn] = node.id);
    });

    forEach(db.patients, patient => {
      const baseIds = loFilter(at(namesToNode, patient.anatomicalLocations));
      patient.ontologyNodeIds = uniq(flatMap(baseIds, id => {
        const result = [];
        let current = nodes[id];
        while (current !== undefined) {
          result.push(current.id);
          current = nodes[current.parent];
        }
        return result;
      }));
    });

    return db;
  }
}
