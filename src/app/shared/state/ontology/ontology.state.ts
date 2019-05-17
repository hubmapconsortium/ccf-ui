import { HttpClient } from '@angular/common/http';
import { NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { at, find, forEach, keyBy, map as loMap, partial, values } from 'lodash';
import { map, tap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { JsonOntologyNode, jsonToOntologyNode } from './internal/json-ontology';
import { OntologyNode, OntologyStateModel } from './ontology.model';

/**
 * Links all nodes to their parents.
 *
 * @param nodeMap The hash table of nodes.
 */
function linkChildren(nodeMap: { [id: string]: OntologyNode }): void {
  // Add temporary fake node to simplify logic as root won't need a special case
  // This is also used later to find the root node
  nodeMap[undefined as any] = { children: [] } as any;

  forEach(nodeMap, ({ id, parent }) => nodeMap[parent].children.push(id));
}

/**
 * Creates an ontology state.
 *
 * @param nodeMap The node hash table.
 * @returns The ontology state model.
 */
function createModel(nodeMap: { [id: string]: OntologyNode }): OntologyStateModel {
  const root = find(nodeMap[undefined as any].children);

  // Remove fake node inserted in linkChildren
  delete nodeMap[undefined as any];

  return { root, nodes: nodeMap };
}

/**
 * Creates a new tree with only the specified organs and their subtrees.
 *
 * @param model The full ontology tree.
 * @param organIds The identifiers of the organs to keep.
 * @returns A new ontology tree.
 */
function pruneModel(model: OntologyStateModel, organIds: string[]): OntologyStateModel {
  const body: OntologyNode = { id: 'body', label: 'body', parent: undefined, children: organIds, synonymLabels: [] };
  const organNodes = at(model.nodes, organIds);
  const prunedNodes = { [body.id]: body };

  forEach(organNodes, node => node.parent = body.id);
  forEach(organNodes, node => addSubtree(model.nodes, prunedNodes, node));

  return { root: body.id, nodes: prunedNodes };
}

/**
 * Adds all subtree nodes to an accumulator object.
 *
 * @param nodes The original tree of nodes.
 * @param acc The accumulated tree of nodes.
 * @param current The node whose subtree should be added.
 */
function addSubtree(
  nodes: { [id: string]: OntologyNode },
  acc: { [id: string]: OntologyNode },
  current: OntologyNode
): void {
  acc[current.id] = current;
  forEach(current.children, id => addSubtree(nodes, acc, nodes[id]));
}

/**
 * Ontology tree state.
 */
@State<OntologyStateModel>({
  name: 'ontology',
  defaults: {
    root: undefined,
    nodes: {}
  }
})
export class OntologyState implements NgxsOnInit {
  /**
   * Selects all nodes in the ontology tree.
   */
  @Selector()
  static nodes(state: OntologyStateModel): OntologyNode[] {
    return values(state.nodes);
  }

  /**
   * Selects the ontology tree's root node.
   */
  @Selector()
  static rootNode(state: OntologyStateModel): OntologyNode {
    return state.nodes[state.root];
  }

  /**
   * Creates an instance of ontology state.
   *
   * @param http The http service.
   */
  constructor(private http: HttpClient) { }

  /**
   * Ngxs' OnInit hook.
   *
   * @param ctx The state context.
   */
  ngxsOnInit(ctx: StateContext<OntologyStateModel>) {
    const jsonOntology = this.http.get<JsonOntologyNode[]>(environment.ontologyUrl, { responseType: 'json' });
    const model = jsonOntology.pipe(
      map(ontology => loMap(ontology, jsonToOntologyNode)),
      map(nodes => keyBy(nodes, 'id')),
      tap(linkChildren),
      map(createModel),
      map(partial(pruneModel, partial.placeholder, environment.organNodes))
    );

    model.subscribe(ontology => ctx.setState(ontology));
  }
}
