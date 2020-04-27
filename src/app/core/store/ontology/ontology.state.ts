import { Injectable } from '@angular/core';
import { action, NgxsDataRepository, StateRepository } from '@ngxs-labs/data';
import { State } from '@ngxs/store';
import { map } from 'rxjs/operators';

import { OntologyNode } from '../../models/ontology-node';


export interface OntologyStateModel {
  /**
   * Identifier of the root node.
   */
  root: string;

  /**
   * Hash table of nodes.
   */
  nodes: { [id: string]: OntologyNode };
}

/**
 * Ontology tree state.
 */
@StateRepository()
@State<OntologyStateModel>({
  name: 'ontology',
  defaults: {
    root: '',
    nodes: {}
  }
})
@Injectable()
export class OntologyState extends NgxsDataRepository<OntologyStateModel> {
  public readonly nodes$ = this.state$.pipe(map(state => Object.values(state.nodes)));
  public readonly rootNode$ = this.state$.pipe(map(state => state.nodes[state.root]));

  @action()
  setOntology(ontology: OntologyStateModel): void {
    this.ctx.setState(ontology);
  }
}
