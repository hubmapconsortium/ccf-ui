// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


/** Testing environment configuration. */
export const environment = {
  production: false,
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
      'assets/gtex/data/rui_locations.jsonld',
      'assets/sea-ad/data/rui_locations.jsonld'
    ],
    hubmapDataService: 'search-api',
    hubmapPortalUrl: 'https://portal.hubmapconsortium.org/',
    hubmapDataUrl: 'https://search.api.hubmapconsortium.org/v3/entities/search',
    hubmapAssetsUrl: 'https://assets.hubmapconsortium.org',
    hubmapToken: localStorage.getItem('HUBMAP_TOKEN') ?? '',

    useRemoteApi: false,
    remoteApiEndpoint: 'https://r5i95k35v5.us-east-2.awsapprunner.com/v1'
    // remoteApiEndpoint: 'https://ccf-api.hubmapconsortium.org/v1'
    // remoteApiEndpoint: 'http://localhost:8080/v1'
  },
  customization: {
    theme: 'default',
    header: true,
    homeUrl: 'https://portal.hubmapconsortium.org/',
    logoTooltip: 'Human BioMolecular Atlas Project',
    loginDisabled: false
  },
  googleAnalyticsToken: 'G-B3DT7XPMRT'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/plugins/zone-error'; // Included with Angular CLI.
