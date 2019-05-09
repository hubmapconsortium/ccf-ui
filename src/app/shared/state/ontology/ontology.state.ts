import { HttpClient } from '@angular/common/http';
import { NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { forEach, map as loMap, mapValues, property, stubArray, values } from 'lodash';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { OntologyNode, OntologyStateModel } from './ontology.model';


/**
 * property names for the fetched json object
 */
const jsonPropertyNames = {
  id: '@id',
  parent: 'parent',
  label: 'http://www.w3.org/2000/01/rdf-schema#label',
  synonymLabels: 'http://www.geneontology.org/formats/oboInOwl#hasExactSynonym'
};

/**
 * json property accessor
 */
const jsonNodeExtractor = {
  id: property<any, string>(jsonPropertyNames.id),
  parent: property<any, string>([jsonPropertyNames.parent, 0, '@id']),
  children: stubArray,
  label: property<any, string>([jsonPropertyNames.label, 0, '@value']),
  synonymLabels: (obj: any): string[] => loMap(obj[jsonPropertyNames.synonymLabels], '@value'),
};

/**
 * Ontology tree state.
 */
@State<OntologyStateModel>({
  name: 'ontology',
  defaults: {
    root: undefined,
    ids: [],
    nodes: {}
  }
})
export class OntologyState implements NgxsOnInit {
  private ontologyUrl = environment.ontologyUrl;

  /**
   * Selects all nodes in the ontology tree.
   *
   * @param state the ontology tree state.
   * @returns all ontology nodes.
   */
  @Selector()
  static nodes(state: OntologyStateModel): OntologyNode[] {
    return values(state.nodes);
  }

  /**
   *
   * @param http instance of HttpClient
   */
  constructor(private http: HttpClient) { }

  /**
   * Ngxs' OnInit hook.
   *
   * @param ctx The state context.
   */
  ngxsOnInit(ctx: StateContext<OntologyStateModel>) { }

  /**
   * Fetches ontology as a json object and maps it to an ontology state model
   * @returns ontology state model
   */
  private getOntology(): Observable<OntologyStateModel> {
    return this.http.get(this.ontologyUrl, { responseType: 'text' }).pipe(
      map(results => JSON.parse(results)),
      map<any[], OntologyNode[]>(results => {
        return results.map((result) => this.createNode(result));
      }),
      map(ontologyNodes => this.createOntologyModel(ontologyNodes)),
      tap(ontologyModel => this.setChildren(ontologyModel))
    );
  }

  /**
   * Creates node
   * @param jsonObject the fetched ontology json object
   * @returns node an ontology node object
   */
  private createNode(jsonObject: any): OntologyNode {
    return mapValues(jsonNodeExtractor, extractor => extractor(jsonObject)) as any;
  }

  /**
   * Creates an ontology model
   * @param ontologyNodes an array of ontology nodes
   * @returns an ontology model object
   */
  private createOntologyModel(ontologyNodes: OntologyNode[]): OntologyStateModel {
    const root = ontologyNodes.find((node) => node.parent === undefined);
    const nodes = ontologyNodes.reduce((acc, node) => {
      return { ...acc, [node.id]: node };
    }, { });

    return {
      root: root.id,
      ids: [],
      nodes: nodes
    };
  }

  /**
   * Sets children of each ontology node in the ontology model
   * @param model the ontology state model
   */
  setChildren(model: OntologyStateModel): void {
    const { nodes } = model;
    forEach(nodes, node => {
      if (node.parent) {
        nodes[node.parent].children.push(node.id);
      }
    });
  }
}
