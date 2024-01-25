/** Production environment configuration. */
export const environment = {
  production: true,
  disableDbWorker: true,
  acceptableViewerDomains: [
    'https://portal.hubmapconsortium.org',
    'https://portal.test.hubmapconsortium.org',
    'https://data.sennetconsortium.org'
  ],
  dbOptions: {
    ccfOwlUrl: 'https://apps.humanatlas.io/hra-api/v1/ccf.owl.n3store.json',
    ccfContextUrl: 'https://hubmapconsortium.github.io/ccf-ontology/ccf-context.jsonld',
    dataSources: [
      'https://hubmapconsortium.github.io/hra-registrations/federated/rui_locations.jsonld',
      'https://apps.humanatlas.io/hra-api/v1/gtex/rui_locations.jsonld'
    ],
    hubmapDataService: 'search-api',
    hubmapDataUrl: 'https://search.api.hubmapconsortium.org/v3/entities/search',
    hubmapToken: localStorage.getItem('HUBMAP_TOKEN') ?? '',

    useRemoteApi: false,
    remoteApiEndpoint: 'https://apps.humanatlas.io/hra-api/v1'
  },
  customization: {
    theme: 'hubmap',
    header: true,
    homeUrl: 'https://portal.hubmapconsortium.org/',
    logoTooltip: 'Human BioMolecular Atlas Project'
  },
  googleAnalyticsToken: window.location.hostname === 'portal.hubmapconsortium.org' ? 'G-1WRJHN9FM6' : 'G-J9HWV9QPJ4'
};
