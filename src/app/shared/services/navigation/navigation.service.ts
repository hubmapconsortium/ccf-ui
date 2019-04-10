import { Injectable } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Navigate } from '@ngxs/router-plugin';

import { OntologyNode } from '../../state/ontology/ontology.model';

/**
 * Contains functions for navigating to different parts of the app.
 */
@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  /**
   * Navigates the tissue page with the specified tissue displayed.
   *
   * @param idOrNode The identifier or ontology node for the tissue.
   */
  @Dispatch()
  navigateToTissue(idOrNode: string | OntologyNode): Navigate {
    const id = typeof idOrNode === 'string' ? idOrNode : idOrNode.id;
    return new Navigate(['/tissue', id]);
  }

  @Dispatch()
  navigateToOrgan(id: string | OntologyNode): Navigate {
    return new Navigate(['/organ', id]);
  }
}
