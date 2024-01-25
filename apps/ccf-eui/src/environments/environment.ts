// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


/** Testing environment configuration. */
export const environment = {
  production: false,
  disableDbWorker: true,
  acceptableViewerDomains: [
    'https://portal.hubmapconsortium.org',
    'https://portal.test.hubmapconsortium.org',
    'https://data.sennetconsortium.org'
  ],
  dbOptions: {
    ccfOwlUrl: 'assets/ccf.owl.n3store.json',
    ccfContextUrl: 'https://hubmapconsortium.github.io/ccf-ontology/ccf-context.jsonld',
    dataSources: [
      'https://hubmapconsortium.github.io/hra-registrations/federated/rui_locations.jsonld',
      'https://apps.humanatlas.io/hra-api/v1/gtex/rui_locations.jsonld'
    ],
    hubmapDataService: 'search-api',
    hubmapDataUrl: 'https://search.api.hubmapconsortium.org/v3/entities/search',
    hubmapToken: localStorage.getItem('HUBMAP_TOKEN') ?? '',

    useRemoteApi: false,
    remoteApiEndpoint: 'https://apps.humanatlas.io/hra-api--staging/v1'
    // remoteApiEndpoint: 'https://apps.humanatlas.io/hra-api/v1'
    // remoteApiEndpoint: 'http://localhost:8080/v1'
  },
  customization: {
    theme: 'default',
    header: true,
    homeUrl: 'https://portal.hubmapconsortium.org/',
    logoTooltip: 'Human BioMolecular Atlas Project',
    loginDisabled: false,
    // filter: { sex: 'Male' }
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
