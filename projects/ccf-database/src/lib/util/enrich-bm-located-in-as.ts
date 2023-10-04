import { JsonLd } from 'jsonld/jsonld-spec';

/**
 * The SPARQL endpoint to grab the data from
 */
const SPARQL_ENDPOINT = 'https://lod.humanatlas.io/sparql';

/**
 * A query that computes a graph containing Biomarkers located in Anatomical Structures
 */
const query = `
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX ccf: <http://purl.org/ccf/>
PREFIX has_characterizing_biomarker_set: <http://purl.obolibrary.org/obo/RO_0015004>

CONSTRUCT { ?bm ccf:ccf_bm_located_in ?as }
FROM <https://purl.org/ccf/ccf.owl>
WHERE {
  ?ct ccf:ccf_located_in ?as .

  ?ct rdfs:subClassOf [
  	owl:onProperty has_characterizing_biomarker_set: ;
  	owl:someValuesFrom [ owl:intersectionOf ?bn3 ]] .
  ?bn3 rdf:rest*/rdf:first [
  	owl:onProperty ccf:has_marker_component ;
    owl:someValuesFrom ?bm
  ] .
}
`;

/**
 * Get biomarkers located in AS as a JSON-LD object
 * @returns the json-ld graph with BMs located in AS
 */
export async function getBmLocatedInAs(): Promise<JsonLd> {
  const url = `${SPARQL_ENDPOINT}?query=${encodeURIComponent(query)}`;
  return fetch(url, {
    headers: { ['Accept']: 'application/ld+json' }
  }).then(r => r.json()).catch((err) => {
    console.log('Error querying lod.humanatlas.io', err);
    return [];
  });
}
