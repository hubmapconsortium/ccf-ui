export const environment = {
  production: true,
  localDatabaseUrl: 'https://hubmapconsortium.github.io/ccf-ui-sampledata/v1/data.yml',
  ccfAssetUrl: '/ccf-ui-sampledata/ccf',
  ontologyUrl: 'https://cdn.jsdelivr.net/gh/hubmapconsortium/hubmap-ontology/ontologies/partonomy/reifications/partonomy.jsonld',
  organNodes: [
    'http://purl.obolibrary.org/obo/UBERON_0000948', // Heart
    'http://purl.obolibrary.org/obo/UBERON_0002113', // Kidney
  ]
};
