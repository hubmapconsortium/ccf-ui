import { Injectable } from '@angular/core';
import { DataAction, StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsImmutableDataRepository } from '@ngxs-labs/data/repositories';
import { State } from '@ngxs/store';
import { OntologyTreeModel, OntologyTreeNode } from 'ccf-database';
import { at, forEach, partial } from 'lodash';
import { forkJoin } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { DataSourceService } from '../../services/data-source/data-source.service';


/**
 * Adds all subtree nodes to an accumulator object.
 *
 * @param nodes The original tree of nodes.
 * @param acc The accumulated tree of nodes.
 * @param current The node whose subtree should be added.
 */
export function addSubtree(
  nodes: { [id: string]: OntologyTreeNode },
  acc: { [id: string]: OntologyTreeNode },
  current: OntologyTreeNode
): void {
  acc[current.id] = current;
  forEach(current.children, id => addSubtree(nodes, acc, nodes[id]));
}

/**
 * Creates a new tree with only the specified organs and their subtrees.
 *
 * @param model The full ontology tree.
 * @param organIds The identifiers of the organs to keep.
 * @returns A new ontology tree.
 */
function pruneModel(model: OntologyTreeModel, organIds: string[]): OntologyTreeModel {
  organIds = organIds.filter(o => !!model.nodes[o]);
  const body: OntologyTreeNode = {
    '@id': model.root,
    '@type': 'OntologyTreeNode',
    id: model.root,
    label: 'body',
    parent: '',
    children: organIds,
    synonymLabels: []
  };
  const organNodes = at(model.nodes, organIds);
  const prunedNodes = { [body.id]: body };

  forEach(organNodes, node => (node.parent = body.id));
  forEach(organNodes, node => addSubtree(model.nodes, prunedNodes, node));

  return { root: body.id, nodes: prunedNodes };
}


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
export class OntologyState extends NgxsImmutableDataRepository<OntologyTreeModel> {
  /** All nodes in the ontology tree. */
  public readonly nodes$ = this.state$.pipe(map(state => Object.values(state.nodes)));

  /** Root node of the ontology tree. */
  public readonly rootNode$ = this.state$.pipe(map(state => state.nodes[state.root]));

  /**
   * Creates an instance of ontology search service.
   *
   * @param dataService The service used for pulling in ontology data
   */
  constructor(private readonly dataService: DataSourceService) {
    super();
  }

  /**
   * Sets the ontology state.
   *
   * @param ontology The new state.
   */
  @DataAction()
  setOntology(ontology: OntologyTreeModel): void {
    this.ctx.setState(ontology);
  }

  /**
   * Initializes this state service.
   */
  ngxsOnInit(): void {
    super.ngxsOnInit();
    this.loadOntology();
  }

  /**
   * Loads ontology.
   */
  private loadOntology(): void {
    forkJoin([
      this.dataService.getOntologyTreeModel().pipe(take(1)),
      this.dataService.getReferenceOrgans().pipe(take(1))
    ]).subscribe(([fullOntology, _refOrgans]) => {
      const organNodes = environment.organNodes.concat();
      const ontology = partial(pruneModel, partial.placeholder, organNodes)(fullOntology);
      this.setOntology(ontology);
    });
  }
}
