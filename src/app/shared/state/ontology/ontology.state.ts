import { NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { values as loValues } from 'lodash';

import { OntologyNode, OntologyStateModel } from './ontology.model';

/**
 * Ontology tree state.
 */
@State<OntologyStateModel>({
  name: 'ontology',
  defaults: {
    root: undefined,
    ids: [],
    nodes: { }
  }
})
export class OntologyState implements NgxsOnInit {
  /**
   * Selects all nodes in the ontology tree.
   *
   * @param state The ontology tree state.
   * @returns All ontology nodes.
   */
  @Selector()
  static nodes(state: OntologyStateModel): OntologyNode[] {
    return loValues(state.nodes);
  }

  ngxsOnInit(ctx: StateContext<OntologyStateModel>) {
    // TODO load ontology
  }
}
