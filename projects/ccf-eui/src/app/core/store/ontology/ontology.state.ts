import { Injectable } from '@angular/core';
import { DataAction, StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsDataRepository } from '@ngxs-labs/data/repositories';
import { State } from '@ngxs/store';
import { OntologyTreeModel } from 'ccf-database';
import { map } from 'rxjs/operators';


/**
 * Ontology tree state.
 */
@StateRepository()
@State<OntologyTreeModel>({
  name: 'ontology',
  defaults: {
    root: '',
    nodes: {}
  }
})
@Injectable()
export class OntologyState extends NgxsDataRepository<OntologyTreeModel> {
  /** All nodes in the ontology tree. */
  public readonly nodes$ = this.state$.pipe(map(state => Object.values(state.nodes)));

  /** Root node of the ontology tree. */
  public readonly rootNode$ = this.state$.pipe(map(state => state.nodes[state.root]));

  /**
   * Sets the ontology state.
   *
   * @param ontology The new state.
   */
  @DataAction()
  setOntology(ontology: OntologyTreeModel): void {
    this.ctx.setState(ontology);
  }
}
