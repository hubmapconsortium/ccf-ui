import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { at } from 'lodash';
import { Observable } from 'rxjs';

import { OntologyNode, OntologyStateModel } from '../../state/ontology/ontology.model';
import { OntologyState } from '../../state/ontology/ontology.state';

/**
 * Service for interacting with the ontology tree state.
 */
@Injectable({
  providedIn: 'root'
})
export class OntologyService {
  /**
   * The current root node in the ontology tree.
   */
  @Select(OntologyState.rootNode)
  rootNode: Observable<OntologyNode>;

  /**
   * Creates an instance of ontology service.
   *
   * @param store A reference to the global store.
   */
  constructor(private store: Store) {
    // Make method callable without this.
    this.getChildren = this.getChildren.bind(this);
  }

  /**
   * Fetches the children of an ontology node.
   * Note: This can be called without a reference to `this`.
   *
   * @param node The node for which to get children.
   * @returns An array of children, empty if the node has no children.
   */
  getChildren(node: OntologyNode): OntologyNode[] {
    const { nodes } = this.store.selectSnapshot<OntologyStateModel>(OntologyState);
    return at(nodes, node.children);
  }
}
