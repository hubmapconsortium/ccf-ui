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
    ccfOwlUrl: 'https://apps.humanatlas.io/hra-api/v1/ccf.owl.n3store.json',
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
