# Embedding the CCF UIs

## Code

To embed *CCF-RUI* the following code snippet should be used.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>HuBMAP CCF Registration User Interface (CCF-RUI)</title>
  <!-- For Registration User Interface -->
  <base href="https://cdn.jsdelivr.net/gh/hubmapconsortium/ccf-ui@2/rui/">

  <!-- For Exploration User Interface -->
  <base href="https://cdn.jsdelivr.net/gh/hubmapconsortium/ccf-ui@2/">
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
  <script src="wc.js" async></script>
</head>
<body class="mat-typography">
  <!-- For Registration User Interface -->
  <ccf-rui></ccf-rui>

  <!-- For Exploration User Interface  -->
  <ccf-eui></ccf-eui>
  <ccf-eui
    hubmap-data-service="..."
    hubmap-portal-url="..."
    hubmap-data-url="..."
    hubmap-asset-url="..."
    hubmap-token="..."
    hubmap-data-sources="..."
  ></ccf-eui>
</body>
</html>
```

## Configuration

*CCF-RUI* and CCF-EUI can be customized by adding code to the their respective elements. I.e.

```js
window.addEventListener('DOMContentLoaded', () => {
  const rui = document.querySelector('ccf-rui');
  rui.baseHref = 'https://...';

  const eui = document.querySelector('ccf-eui');
  eui.hubmapDataService = '...';
}
```

*Some configuration values (strings, booleans) can be passed directly in to the HTML tag element. I.e.

```html
<ccf-eui hubmap-data-service="search-api"></ccf-eui>

<ccf-rui embedded="true"></ccf-rui>
````

*Short-hands are available for boolean values. I.e.

```html
<ccf-rui embedded></ccf-rui>
````

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
window.addEventListener('DOMContentLoaded', () => {
  const rui = document.querySelector('ccf-rui');
  rui.baseHref = 'https://cdn.jsdelivr.net/gh/hubmapconsortium/ccf-ui@staging/rui/';
  rui.embedded = true;
  rui.useDownload = true;
  rui.user = {firstName: 'Jane', lastName: 'Doe'};
  rui.organ = { name: 'kidney', side: 'left', sex: 'female' };
  rui.editRegistration = sampleRegistration;
  rui.register = (data) => {
    prompt('Copy the JSON code to clipboard', data);
  };
  rui.fetchPreviousRegistrations = () => {
    return Promise.resolve([sampleRegistration]);
  };
  rui.cancelRegistration = () => {
    window.location.href = 'https://ingest.hubmapconsortium.org/'
  };
});
</pre>
</details>

The following options are available for configuration

- `baseHref: string` - The base href for CCF-RUI code/build
- `embedded: boolean` - Whether the *CCF-RUI* is embedded as a part of HUBMap or as a standalone app. If not specified it is inferred from the presence of the `user` configuration option.
- `homeUrl: string` - URL that the user will be redirected to when clicking the HUBMap logo or back button in the upper left corner of the app.
- `user: { firstName: string, lastName: string })` - The user of the app. Should always be specified when the app is in embedded mode!
- `organ: { name: 'large intestine' | 'heart' | 'kidney' | 'spleen', sex?: 'male' | 'female', side?: 'left' | 'right' }` - the reference organ to preload.
- `register: (rui_location: string) => void` A callback function called whenever the user hits registers. It should take a single argument which is the stringified json object containing the registration data.
- `fetchPreviousRegistrations: () => rui_location[] | Promise<rui_location[]>` - A callback function called when the user wishes to see previous registered objects. It should take no arguments and return a list of previous registrations, possibly asynchronously.
- `useDownload: boolean` - Prefer downloading the json registration data rather than using the `register` callback.

The TypeScript definition for this configuration object is [here](projects/ccf-rui/src/app/core/services/config/config.ts).
