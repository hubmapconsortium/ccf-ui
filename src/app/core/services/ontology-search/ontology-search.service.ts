import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Immutable } from '@ngxs-labs/data';
import { Store } from '@ngxs/store';
import { at, find, forEach, keyBy, map as loMap, partial } from 'lodash';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { JsonOntologyNode, jsonToOntologyNode } from '../../models/json-ontology';
import { OntologyNode } from '../../models/ontology-node';
import { OntologyState, OntologyStateModel } from '../../store/ontology/ontology.state';


/**
 * Search result interface type for the search results
 */
export interface SearchResult {
  /** ensures order of search-results */
  index: number;

  /** label to be displayed in the view */
  displayLabel: string[];

  /**  instance of OntologyNode, provides data associated with a search result */
  node: OntologyNode;
}

/** Type of function for getting child nodes from a parent node. */
export type GetChildrenFunc = (o: OntologyNode) => OntologyNode[];

/**
 * Links all nodes to their parents.
 *
 * @param nodeMap The hash table of nodes.
 */
export function linkChildren(nodeMap: { [id: string]: OntologyNode }): void {
  // Add temporary fake node to simplify logic as root won't need a special case
  // This is also used later to find the root node
  nodeMap[''] = { parent: '', children: [] } as unknown as OntologyNode;
  forEach(nodeMap, ({ id, parent }) => nodeMap[parent].children.push(id));
}

/**
 * Creates an ontology state.
 *
 * @param nodeMap The node hash table.
 * @returns The ontology state model.
 */
export function createModel(nodeMap: { [id: string]: OntologyNode }): OntologyStateModel {
  const root = find(nodeMap[''].children) as string;

  // Remove fake node inserted in linkChildren
  delete nodeMap[''];

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
  const body: OntologyNode = {
    id: 'http://purl.obolibrary.org/obo/UBERON_0013702',
    label: 'body',
    parent: '',
    children: organIds,
    synonymLabels: []
  };
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
export function addSubtree(
  nodes: { [id: string]: OntologyNode },
  acc: { [id: string]: OntologyNode },
  current: OntologyNode
): void {
  acc[current.id] = current;
  forEach(current.children, id => addSubtree(nodes, acc, nodes[id]));
}

/**
 * Injectable OntologySearchService responsible for search result computations
 */
@Injectable({
  providedIn: 'root'
})
export class OntologySearchService {
  /** Root node in ontology. */
  rootNode: Observable<Immutable<OntologyNode>>;

  /**
   * Creates an instance of ontology search service.
   *
   * @param http The http requests service.
   * @param store The global data store.
   * @param ontologyState The global ontology state.
   */
  constructor(private http: HttpClient, private store: Store, private ontologyState: OntologyState) {
    this.rootNode = this.ontologyState.rootNode$;
    this.getChildren = this.getChildren.bind(this) as GetChildrenFunc;
  }

  /**
   * Loads ontology.
   */
  loadOntology() {
    const jsonOntology = this.http.get<JsonOntologyNode[]>(environment.ontologyUrl, { responseType: 'json' });
    const model = jsonOntology.pipe(
      map(ontology => loMap(ontology, jsonToOntologyNode)),
      map(nodes => keyBy(nodes, 'id')),
      tap(linkChildren),
      map(createModel),
      map(partial(pruneModel, partial.placeholder, environment.organNodes))
    );

    model.subscribe(ontology => this.ontologyState.setOntology(ontology));
  }

  /**
   * Searches the ontology with the search-term
   * @param value the search term
   * @returns an array of search-results
   */
  filter(value: string): Observable<SearchResult[]> {
    return this.ontologyState.nodes$.pipe(
      map(nodes => this.lookup(nodes, value.toLowerCase()))
    );
  }

  /**
   * looks up ontology nodes and composes search results
   * @param nodes Ontology nodes
   * @param searchValue search text in lower case
   * @returns search results
   */
  private lookup(nodes: Immutable<OntologyNode>[], searchValue: string): SearchResult[] {
    const searchResults = new Map<string, SearchResult>();

    if(nodes) {
      nodes.forEach((node: OntologyNode) => {
        const condition = node.label.toLowerCase().includes(searchValue);

        if (condition && !searchResults.get(node.id)) {
          searchResults.set(node.id, {
            index: this.getIndexOfMatch(node.label, searchValue),
            displayLabel: this.formatLabel(node.label, searchValue),
            node
          });
        } else {
          const match = node.synonymLabels.find((label) => label.toLowerCase().includes(searchValue));

          if (match && !searchResults.get(node.id)) {
            searchResults.set(node.id, {
              index: this.getIndexOfMatch(node.label + ' (' + match + ')', searchValue),
              displayLabel: this.formatLabel(node.label + ' (' + match + ')', searchValue),
              node
            });
          }
        }
      });
    }

    return Array.from(searchResults.values());
  }

  /**
   * Gets index of match in the ontology label
   * @param label the provided ontology node label or synonym label
   * @param searchValue the searched text in lower case
   * @returns the index of the match in the label
   */
  getIndexOfMatch(label: string, searchValue: string): number {
    return label.toLowerCase().indexOf(searchValue);
  }

  /**
   * Formats label based on where the search-term was found in the OntologyNode
   * @param label label or first synonym-label of OntologyNode which has the search-term
   * @param searchValue search-term
   * @returns an array in the form of [prefix, search-term, suffix]
   */
  formatLabel(label: string, searchValue: string): string[] {
    const index = this.getIndexOfMatch(label, searchValue);
    return [
      label.substr(0, index),
      label.substr(index, searchValue.length),
      label.substr(index + searchValue.length, label.length)
    ];
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
