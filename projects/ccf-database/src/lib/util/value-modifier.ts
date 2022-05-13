/* eslint-disable @typescript-eslint/naming-convention */
import { JsonLd } from 'jsonld/jsonld-spec';

/**
 * Function which takes JSON-LD input and modifies some of its values automatically
 *
 * @param jsonInput the JSON input can be either an object or array
 * @returns A modified JSON-LD object or array
 */
export function valueModifier(jsonInput: any): JsonLd {
  if (jsonInput instanceof Object) {
    if ('@graph' in jsonInput as Object) {
      let graph = jsonInput['@graph'];
      for (let graphObject in graph) {
        annotationValueModifier(graphObject);
      }
    }
  } else if (jsonInput instanceof Array) {
    for (let graphObject in jsonInput as Array<Object>) {
      annotationValueModifier(graphObject);
    }
  }
  return jsonInput;
}

export function annotationValueModifier(graphObject: Object): void {
  let samples = graphObject['samples'];
  for (let sample in samples) {
    let annotations = samples['rui_location']['ccf_annotations'];
    for (let i = 0; i < annotations.length; i++) {
      annotations[i] = annotations[i].replace(
        "http://purl.obolibrary.org/obo/FMA_",
        "http://purl.org/sig/ont/fma/fma")
    }
  }
}