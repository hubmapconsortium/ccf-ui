import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { OntologyNode } from '../../state/ontology/ontology.model';

/**
 * Provides the ontology nodes to display in the tissues browser.
 */
@Injectable()
export class TissuesBrowserDataService {
  /**
   * The ontology nodes to display.
   */
  readonly data: Observable<OntologyNode[]>;

  constructor() {
    // FIXME: Get real data
    const subject = new ReplaySubject<OntologyNode[]>(1);
    this.data = subject.asObservable();

    subject.next(Array(10).fill(0).map((_, i) => ({
      id: String(i),
      tileUrl: '../../../assets/temporary/grid-tissue.png',
      age: 10 * i,
      gender: i % 2 === 0 ? 'female' : 'male',
      metadata: [['Foo data', (i / 77).toFixed(5)], ['Bar data', 5 * i - 3]]
    } as OntologyNode)));
  }
}
