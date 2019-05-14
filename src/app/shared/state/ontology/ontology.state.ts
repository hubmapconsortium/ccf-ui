import { HttpClient } from '@angular/common/http';
import { NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { find, forEach, keyBy, map as loMap, values } from 'lodash';
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
  nodeMap[undefined as any] = undefined;

  return { root, nodes: nodeMap };
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
      map(createModel)
    );

    model.subscribe(ontology => ctx.setState(ontology));
  }
}
