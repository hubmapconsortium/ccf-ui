import { flow, map, partial, property } from 'lodash';

import { OntologyNode } from '../ontology.model';

/** Interface containing the single json property '@id' */
export interface IdObject {
  /** Json '@id' property */
  '@id': string;
}

/** Interface containing the single json property '@value' */
export interface ValueObject {
  /** Json '@value' property */
  '@value': string;
}

/**
 * Structure of a single json ontology node.
 */
export interface JsonOntologyNode extends IdObject {
  /** Json parent property */
  'parent': [IdObject] | undefined;

  /** Json label property */
  'http://www.w3.org/2000/01/rdf-schema#label': [ValueObject];

  /** Json synonyms property */
  'http://www.geneontology.org/formats/oboInOwl#hasExactSynonym'?: ValueObject[];
}

/** Property name of json id field. */
const idProperty = '@id';
/** Function for extracting json id fields. */
const idExtractor = property<IdObject, string>(idProperty);

/** Property name of json value field. */
const valueProperty = '@value';
/** Function for extracting json value fields. */
const valueExtractor = property<ValueObject, string>(valueProperty);

/** Property name of json parent field. */
const parentProperty = 'parent';
/** Function for extracting json parent fields. */
const parentExtractor = flow(
  property<JsonOntologyNode, [IdObject]>(parentProperty),
  property(0),
  idExtractor
);

/** Property name of json label field. */
const labelProperty = 'http://www.w3.org/2000/01/rdf-schema#label';
/** Function for extracting json label fields. */
const labelExtractor = flow(
  property<JsonOntologyNode, [ValueObject]>(labelProperty),
  property(0),
  valueExtractor
);

/** Property name of json synonyms field. */
const synonymsProperty = 'http://www.geneontology.org/formats/oboInOwl#hasExactSynonym';
/** Function for extracting json synonyms fields. */
const synonymsExtractor = flow(
  property<JsonOntologyNode, ValueObject[]>(synonymsProperty),
  partial<ValueObject[], (obj: ValueObject) => string, string[]>(map, partial.placeholder, valueExtractor)
);

/**
 * Converts a json encoded ontology node to an ontology node.
 *
 * @param json The json encoded node.
 * @returns The resulting ontology node.
 */
export function jsonToOntologyNode(json: JsonOntologyNode): OntologyNode {
  return {
    id: idExtractor(json),
    parent: parentExtractor(json),
    children: [],
    label: labelExtractor(json),
    synonymLabels: synonymsExtractor(json)
  };
}
