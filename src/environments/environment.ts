// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  localDatabaseUrl: 'https://hubmapconsortium.github.io/ccf-ui-sampledata/v1/data.yml',
  ccfAssetUrl: '/ccf-ui-sampledata/ccf',
  ontologyUrl: 'https://cdn.jsdelivr.net/gh/hubmapconsortium/hubmap-ontology/ontologies/partonomy/reifications/partonomy.jsonld'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
