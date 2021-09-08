export const environment = {
  production: true,
  disableDbWorker: true,
  dbOptions: {
    ccfOwlUrl: 'https://hubmapconsortium.github.io/hubmap-ontology/ccf.owl',
    ccfContextUrl: 'https://hubmapconsortium.github.io/hubmap-ontology/ccf-context.jsonld',
    hubmapDataService: 'search-api',
    hubmapPortalUrl: 'https://portal.hubmapconsortium.org/',
    hubmapDataUrl: '', // Do not query the search-api for spatial entities by default
    hubmapAssetsUrl: 'https://assets.hubmapconsortium.org',
    hubmapToken: localStorage.getItem('HUBMAP_TOKEN') ?? ''
  },
  googleAnalyticsToken: 'G-ERNVZ1Q4KE'
};
