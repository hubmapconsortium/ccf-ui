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
    ccfOwlUrl: 'https://cdn.jsdelivr.net/gh/hubmapconsortium/ccf-ui@staging/assets/ccf.owl.n3store.json',
    ccfContextUrl: 'https://hubmapconsortium.github.io/hubmap-ontology/ccf-context.jsonld',
    dataSources: [
      'https://cdn.jsdelivr.net/gh/hubmapconsortium/ccf-ui@staging/assets/kpmp/data/rui_locations.jsonld',
      'https://cdn.jsdelivr.net/gh/hubmapconsortium/ccf-ui@staging/assets/sparc/data/rui_locations.jsonld'
    ],
    hubmapDataService: '',
    hubmapPortalUrl: '',
    hubmapDataUrl: '',
    hubmapAssetsUrl: '',
    hubmapToken: localStorage.getItem('HUBMAP_TOKEN') ?? '',

    useRemoteApi: false,
    remoteApiEndpoint: 'https://ccf-api--staging.herokuapp.com/v1'
  },
  googleAnalyticsToken: 'G-ERNVZ1Q4KE'
};
