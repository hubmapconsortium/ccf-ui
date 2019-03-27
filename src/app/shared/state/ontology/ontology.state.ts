import { NgxsOnInit, State, StateContext } from '@ngxs/store';

import { OntologyStateModel } from './ontology.model';

@State<OntologyStateModel>({
  name: 'ontology',
  defaults: {
    root: undefined,
    ids: [],
    nodes: { }
  }
})
export class OntologyState implements NgxsOnInit {
  ngxsOnInit(ctx: StateContext<OntologyStateModel>) {
    // TODO load ontology
  }
}
