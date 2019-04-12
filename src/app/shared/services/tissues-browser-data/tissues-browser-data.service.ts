import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TissueImage } from '../../state/database/database.models';
import { LocalDatabaseService } from '../database/local/local-database.service';

/**
 * Provides the ontology nodes to display in the tissues browser.
 */
@Injectable()
export class TissuesBrowserDataService {
  /**
   * The ontology nodes to display.
   */
  readonly data: Observable<TissueImage[]>;

  /**
   * Creates an instance of tissues browser data service.
   */
  constructor(database: LocalDatabaseService) {
    // FIXME: Replace in the future
    this.data = database.getTissueImages();
  }
}
