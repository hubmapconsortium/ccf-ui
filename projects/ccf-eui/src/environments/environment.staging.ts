/** Production environment configuration. */
export const environment = {
  production: true,
  disableDbWorker: true,
  acceptableViewerDomains: [
    'https://portal.hubmapconsortium.org',
    'https://portal.test.hubmapconsortium.org'
  ],
  dbOptions: {
    ccfOwlUrl: 'assets/ccf.owl.n3store.json',
    ccfContextUrl: 'https://hubmapconsortium.github.io/ccf-ontology/ccf-context.jsonld',
    dataSources: [
      'assets/kpmp/data/rui_locations.jsonld',
      'assets/sparc/data/rui_locations.jsonld',
      'assets/gtex/data/rui_locations.jsonld'
    ],
    hubmapDataService: 'search-api',
    hubmapPortalUrl: 'https://portal.hubmapconsortium.org/',
    hubmapDataUrl: 'https://search.api.hubmapconsortium.org/entities/search',
    hubmapAssetsUrl: 'https://assets.hubmapconsortium.org',
    hubmapToken: localStorage.getItem('HUBMAP_TOKEN') ?? '',

    useRemoteApi: false,
    remoteApiEndpoint: 'https://ccf-api--staging.herokuapp.com/v1'
  },
  googleAnalyticsToken: 'G-ERNVZ1Q4KE'
};
