/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/** Production environment configuration. */
export const environment = {
  production: true,
  disableDbWorker: true,
  acceptableViewerDomains: [
    'https://portal.hubmapconsortium.org',
    'https://portal.test.hubmapconsortium.org'
  ],
  dbOptions: {
    ccfOwlUrl: 'https://ccf-api.hubmapconsortium.org/v1/ccf.owl.n3store.json',
    ccfContextUrl: 'https://hubmapconsortium.github.io/ccf-ontology/ccf-context.jsonld',
    dataSources: [
      'https://cdn.jsdelivr.net/gh/hubmapconsortium/ccf-ui@1/assets/kpmp/data/rui_locations.jsonld',
      'https://cdn.jsdelivr.net/gh/hubmapconsortium/ccf-ui@1/assets/sparc/data/rui_locations.jsonld'
    ],
    hubmapDataService: 'search-api',
    hubmapPortalUrl: 'https://portal.hubmapconsortium.org/',
    hubmapDataUrl: 'https://search.api.hubmapconsortium.org/v3/entities/search',
    hubmapAssetsUrl: 'https://assets.hubmapconsortium.org',
    hubmapToken: localStorage.getItem('HUBMAP_TOKEN') ?? ''
  },
  googleAnalyticsToken: 'G-ERNVZ1Q4KE'
};
