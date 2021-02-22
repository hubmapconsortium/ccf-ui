/** Production environment configuration. */
export const environment = {
  production: true,
  ontologyUrl: 'https://hubmapconsortium.github.io/hubmap-ontology/ccf-partonomy.jsonld',
  organNodes: [
    'http://purl.obolibrary.org/obo/UBERON_0000948', // Heart
    'http://purl.obolibrary.org/obo/LMHA_00211', // Lung
    'http://purl.obolibrary.org/obo/UBERON_0002113', // Kidney
    'http://purl.obolibrary.org/obo/UBERON_0002106', // Spleen
    'http://purl.obolibrary.org/obo/UBERON_0001155', // Large Intestine
    'http://purl.obolibrary.org/obo/UBERON_0002108', // Small Intestine
    'http://purl.obolibrary.org/obo/UBERON_0001052' // Rectum
  ],
  disableDbWorker: true,
  dbOptions: {
    ccfOwlUrl: 'https://hubmapconsortium.github.io/hubmap-ontology/ccf.owl.n3',
    ccfContextUrl: 'https://hubmapconsortium.github.io/hubmap-ontology/ccf-context.jsonld',
    hubmapDataService: 'search-api',
    hubmapPortalUrl: 'https://portal.hubmapconsortium.org/',
    hubmapDataUrl: 'https://search.api.hubmapconsortium.org/entities/search',
    hubmapAssetsUrl: 'https://assets.hubmapconsortium.org',
    hubmapToken: localStorage.getItem('HUBMAP_TOKEN') || ''
  }
};
