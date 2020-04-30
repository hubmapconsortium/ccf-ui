export const environment = {
  production: true,
  ontologyUrl: 'http://purl.org/ccf/latest/ccf-partonomy.jsonld',
  organNodes: [
    'http://purl.obolibrary.org/obo/UBERON_0000948', // Heart
    'http://purl.obolibrary.org/obo/LMHA_00211', // Lung
    'http://purl.obolibrary.org/obo/UBERON_0002113', // Kidney
    'http://purl.obolibrary.org/obo/UBERON_0002106', // Spleen
    'http://purl.obolibrary.org/obo/UBERON_0001155', // Colon
    'http://purl.obolibrary.org/obo/UBERON_0002108', // Small Intestine
    'http://purl.obolibrary.org/obo/UBERON_0001052' // Rectum
  ],
  dbOptions: {
    ccfOwlUrl: 'http://purl.org/ccf/latest/ccf.owl',
    ccfContextUrl: 'http://purl.org/ccf/latest/ccf-context.jsonld',
    hubmapDataService: 'static',
    hubmapDataUrl: ''
  }
};
