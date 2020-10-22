# Embedding the RUI

## Code

To embed *CCF-RUI* the following code snippet should be used.

```html
<!doctype html>
<html lang="en">
<head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-136932895-2"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'UA-136932895-2');
  </script>
  <meta charset="utf-8">
  <title>HuBMAP CCF Registration User Interface (CCF-RUI)</title>
  <base href="https://cdn.jsdelivr.net/gh/hubmapconsortium/ccf-ui@staging/rui/">
  <script>
    window.ruiConfig = {
      // Custom configuration
    };
  </script>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&amp;display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Sharp" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body class="mat-typography">
  <ccf-root></ccf-root>
  <script src="runtime.js" type="module"></script>
  <script src="polyfills.js" type="module"></script>
  <script src="main.js" type="module"></script>
</body>
</html>
```

## Configuration

*CCF-RUI* can be customized by adding code to the global `ruiConfig` object. I.e.

```js
window.ruiConfig = {
  configuration options...
}
```

<details>
<summary>Full example</summary>
<pre>
const sampleRegistration = {
  "@context": "https://hubmapconsortium.github.io/hubmap-ontology/ccf-context.jsonld",
  "@id": "http://purl.org/ccf/0.5/06b79119-0e5c-4a46-b7cb-57674ae4f1d8",
  "@type": "SpatialEntity",
  "creator": "Jane Doe",
  "creator_first_name": "Jane",
  "creator_last_name": "Doe",
  "creation_date": "2020-10-21T12:47:39.395Z",
  "ccf_annotations": [
    "http://purl.obolibrary.org/obo/UBERON_0002015"
  ],
  "x_dimension": 16,
  "y_dimension": 12,
  "z_dimension": 14,
  "dimension_units": "millimeter",
  "placement": {
    "@context": "https://hubmapconsortium.github.io/hubmap-ontology/ccf-context.jsonld",
    "@id": "http://purl.org/ccf/1.5/06b79119-0e5c-4a46-b7cb-57674ae4f1d8_placement",
    "@type": "SpatialPlacement",
    "target": "http://purl.org/ccf/latest/ccf.owl#VHFLeftKidney",
    "placement_date": "2020-10-21T12:47:39.395Z",
    "x_scaling": 1,
    "y_scaling": 1,
    "z_scaling": 1,
    "scaling_units": "ratio",
    "x_rotation": 10,
    "y_rotation": 20,
    "z_rotation": 30,
    "rotation_order": "XYZ",
    "rotation_units": "degree",
    "x_translation": 65.26981611431557,
    "y_translation": 92.62797485858627,
    "z_translation": 55.78799389710078,
    "translation_units": "millimeter"
  }
};
window.ruiConfig = {
  baseHref: 'https://cdn.jsdelivr.net/gh/hubmapconsortium/ccf-ui@staging/rui/',
  embedded: true,
  homeUrl: 'https://ingest.hubmapconsortium.org/',
  user: {firstName: 'Jane', lastName: 'Doe'},
  organ: {name: 'kidney', side: 'left', sex: 'female'},
  editRegistration: sampleRegistration,
  register: (data) => {
    prompt('Copy the JSON code to clipboard', data);
  },
  fetchPreviousRegistrations: () => {
    return Promise.resolve([sampleRegistration]);
  },
  useDownload: true
}
</pre>
</details>

The following options are available for configuration

- `baseHref: string` - The base href for CCF-RUI code/build
- `embedded: boolean` - Whether the *CCF-RUI* is embedded as a part of HUBMap or as a standalone app. If not specified it is inferred from the presence of the `user` configuration option.
- `homeUrl: string` - URL that the user will be redirected to when clicking the HUBMap logo or back button in the upper left corner of the app.
- `user: { firstName: string, lastName: string })` - The user of the app. Should always be specified when the app is in embedded mode!
- `organ: { name: 'colon' | 'heart' | 'kidney' | 'spleen', sex?: 'male' | 'female', side?: 'left' | 'right' }` - the reference organ to preload.
- `register: (rui_location: string) => void` A callback function called whenever the user hits registers. It should take a single argument which is the stringified json object containing the registration data.
- `fetchPreviousRegistrations: () => rui_location[] | Promise<rui_location[]>` - A callback function called when the user wishes to see previous registered objects. It should take no arguments and return a list of previous registrations, possibly asynchronously.
- `useDownload: boolean` - Prefer downloading the json registration data rather than using the `register` callback.

The TypeScript definition for this configuration object is [here](projects/ccf-rui/src/app/core/services/config/config.ts).
