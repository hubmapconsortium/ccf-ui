/* eslint-disable @typescript-eslint/member-ordering */
import { Immutable } from '@angular-ru/common/typings';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { OntologyTreeModel, OntologyTreeNode } from 'ccf-database';
import { at, find, forEach, partial } from 'lodash';
import { forkJoin, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { OntologyState } from '../../store/ontology/ontology.state';
import { DataSourceService } from '../data-source/data-source.service';


/**
 * Search result interface type for the search results
 */
export interface SearchResult {
  /** ensures order of search-results */
  index: number;

  /** label to be displayed in the view */
  displayLabel: string[];

  /**  instance of OntologyTreeNode, provides data associated with a search result */
  node: OntologyTreeNode;
}

/** Type of function for getting child nodes from a parent node. */
export type GetChildrenFunc = (o: OntologyTreeNode) => OntologyTreeNode[];

/**
 * Links all nodes to their parents.
 *
 * @param nodeMap The hash table of nodes.
 */
export function linkChildren(nodeMap: { [id: string]: OntologyTreeNode }): void {
  // Add temporary fake node to simplify logic as root won't need a special case
  // This is also used later to find the root node
  nodeMap[''] = { parent: '', children: [] } as unknown as OntologyTreeNode;
  forEach(nodeMap, ({ id, parent }) => nodeMap[parent].children.push(id));
}

/**
 * Creates an ontology state.
 *
 * @param nodeMap The node hash table.
 * @returns The ontology state model.
 */
export function createModel(nodeMap: { [id: string]: OntologyTreeNode }): OntologyTreeModel {
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
function pruneModel(model: OntologyTreeModel, organIds: string[]): OntologyTreeModel {
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
  nodes: { [id: string]: OntologyTreeNode },
  acc: { [id: string]: OntologyTreeNode },
  current: OntologyTreeNode
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
  rootNode: Observable<Immutable<OntologyTreeNode>>;

  /**
   * Creates an instance of ontology search service.
   *
   * @param http The http requests service.
   * @param store The global data store.
   * @param ontologyState The global ontology state.
   */
  constructor(private readonly dataService: DataSourceService, private readonly store: Store,
      private readonly ontologyState: OntologyState) {
    this.rootNode = this.ontologyState.rootNode$;
    this.getChildren = this.getChildren.bind(this) as GetChildrenFunc;
  }

  /**
   * Loads ontology.
   */
  loadOntology(): void {
    forkJoin([
      this.dataService.getOntologyTreeModel().pipe(take(1)),
      this.dataService.getReferenceOrgans().pipe(take(1))
    ]).subscribe(([fullOntology, refOrgans]) => {
      const organNodes = environment.organNodes.concat();
      for (const organ of refOrgans) {
        const ref = organ.representation_of;
        const ontoNode = fullOntology.nodes[ref as string];
        if (ref && ontoNode && organNodes.indexOf(ref) === -1) {
          if (!organ.side) { // Organs with sides have to be added via environment.organNodes
            organNodes.push(ref);
          }
        }
      }
      const ontology = partial(pruneModel, partial.placeholder, organNodes)(fullOntology);
      this.ontologyState.setOntology(ontology);
    });
  }

  /**
   * Searches the ontology with the search-term
   *
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
   *
   * @param nodes Ontology nodes
   * @param searchValue search text in lower case
   * @returns search results
   */
  private lookup(nodes: Immutable<OntologyTreeNode>[], searchValue: string): SearchResult[] {
    const searchResults = new Map<string, SearchResult>();

    if (nodes) {
      nodes.forEach((node: OntologyTreeNode) => {
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
   *
   * @param label the provided ontology node label or synonym label
   * @param searchValue the searched text in lower case
   * @returns the index of the match in the label
   */
  getIndexOfMatch(label: string, searchValue: string): number {
    return label.toLowerCase().indexOf(searchValue);
  }

  /**
   * Formats label based on where the search-term was found in the OntologyTreeNode
   *
   * @param label label or first synonym-label of OntologyTreeNode which has the search-term
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
  getChildren(node: OntologyTreeNode): OntologyTreeNode[] {
    const { nodes } = this.store.selectSnapshot<OntologyTreeModel>(OntologyState);
    return at(nodes, node.children);
  }
}
