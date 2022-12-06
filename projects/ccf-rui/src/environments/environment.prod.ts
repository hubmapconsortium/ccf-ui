export const environment = {
  production: true,
  disableDbWorker: true,
  dbOptions: {
    ccfOwlUrl: 'https://ccf-ontology.hubmapconsortium.org/v2.1.0/ccf.owl',
    ccfContextUrl: 'https://hubmapconsortium.github.io/ccf-ontology/ccf-context.jsonld',
    hubmapDataService: 'search-api',
    hubmapPortalUrl: 'https://portal.hubmapconsortium.org/',
    hubmapDataUrl: '', // Do not query the search-api for spatial entities by default
    hubmapAssetsUrl: 'https://assets.hubmapconsortium.org',
    hubmapToken: localStorage.getItem('HUBMAP_TOKEN') ?? ''
  },
  customization: {
    theme: 'hubmap',
    header: true,
    homeUrl: 'https://portal.hubmapconsortium.org/',
    logoTooltip: 'Human BioMolecular Atlas Project'
  },
  skipUnsavedChangesConfirmation: false,
  googleAnalyticsToken: window.location.hostname === 'portal.hubmapconsortium.org' ? 'G-1WRJHN9FM6' : 'G-J9HWV9QPJ4'
};
