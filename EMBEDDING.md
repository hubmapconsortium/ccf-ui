# Embedding the CCF-RUI

## Code

To embed *CCF-RUI* the following code snippet should be used.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>HuBMAP CCF Registration User Interface (CCF-RUI)</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&amp;display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/gh/hubmapconsortium/ccf-ui@2/rui/styles.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/gh/hubmapconsortium/ccf-ui@2/rui/wc.js" defer></script>
</head>
<body class="mat-typography">
  <ccf-rui
    base-href="https://cdn.jsdelivr.net/gh/hubmapconsortium/ccf-ui@2/rui/"
  ></ccf-rui>
</body>
</html>
```

## Configuration

*CCF-RUI* can be customized in the following ways:

```js
window.addEventListener('DOMContentLoaded', () => {
  const rui = document.querySelector('ccf-rui');
  rui.baseHref = 'https://.....';
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
    window.location.href = 'https://i.....'
  };
});
```

This format of configuration only works with certain data types, namely strings and booleans.
(Note that variables are kebab-case, not camel-case)

````html
<ccf-rui use-download="true" base-href="https://..."></ccf-rui>
````

Full RUI Example

````html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>HuBMAP CCF Registration User Interface (CCF-RUI)</title>
  <base href="https://cdn.jsdelivr.net/gh/hubmapconsortium/ccf-ui@2/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&amp;display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined" rel="stylesheet">
  <link href="styles.css" rel="stylesheet">
  <script src="wc.js" async></script>
  <script>
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
      "slice_thickness": 1,
      "slice_count": 2,
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
  </script>
</head>
<body class="mat-typography">
  <ccf-rui></ccf-rui>
</body>
</html>
````

The following options are available for configuration

- `baseHref: string` - The base href for CCF-RUI code/build
- `homeUrl: string` - URL that the user will be redirected to when clicking the HUBMap logo or back button in the upper left corner of the app.
- `user: { firstName: string, lastName: string })` - The user of the app. Should always be specified when the app is in embedded mode.
- `organ: { name: 'large intestine' | 'heart' | 'kidney' | 'spleen', sex?: 'male' | 'female', side?: 'left' | 'right' }` - the reference organ to preload.
- `register: (rui_location: string) => void` A callback function called whenever the user hits registers. It should take a single argument which is the stringified json object containing the registration data.
- `fetchPreviousRegistrations: () => rui_location[] | Promise<rui_location[]>` - A callback function called when the user wishes to see previous registered objects. It should take no arguments and return a list of previous registrations, possibly asynchronously.
- `useDownload: boolean` - Prefer downloading the json registration data rather than using the `register` callback.

The TypeScript definition for this configuration object is [here](projects/ccf-rui/src/app/core/services/config/config.ts).


# Embedding the CCF-EUI

## Code

To embed *CCF-EUI* the following code snippet should be used.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>HuBMAP CCF Exploration User Interface (CCF-EUI)</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&amp;display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined" rel="stylesheet">
  <link href="styles.css" rel="stylesheet">
  <script src="wc.js" defer></script>
</head>
<body class="mat-typography">
  <ccf-eui></ccf-eui>
</body>
</html>
```

## Configuration

*CCF-EUI* can be customized in the following ways:

```js
window.addEventListener('DOMContentLoaded', () => {
  const eui = document.querySelector('ccf-eui');
  eui.dataSources = ['https://.....jsonld', 'https://.....jsonld'];
  eui.hubmapDataService = 'search-api';
  eui.hubmapPortalUrl = 'https://.....';
  eui.hubmapDataUrl = 'https://.....';
  eui.hubmapAssetUrl = 'https://.....';
});
```

This format of configuration only works with certain data types, namely strings and booleans.
(Note that variables are kebab-case, not camel-case)

````html
<ccf-eui
  hubmap-data-service="search-api"
  hubmap-portal-url="https://...."
  hubmap-data-url="https://...."
  hubmap-asset-url="https://...."
></ccf-eui>
````

Full RUI Example

````html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>HuBMAP CCF Exploration User Interface (CCF-EUI)</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&amp;display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined" rel="stylesheet">
  <link href="styles.css" rel="stylesheet">
  <script src="wc.js" defer></script>
</head>
<body class="mat-typography">
  <ccf-eui
    hubmap-data-service="search-api"
    hubmap-portal-url="https://portal.test.hubmapconsortium.org/"
    hubmap-data-url="https://search.api.hubmapconsortium.org/entities/search"
    hubmap-asset-url="https://assets.test.hubmapconsortium.org"
  ></ccf-eui>
</body>
</html>
````

The following options are available for configuration

- `ccfOwlUrl: string` - A url to load data from.
- `ccfContextUrl: string` - Context.
- `dataSources: string[]` - A list of data sources (in .jsonld format)
- `hubmapDataService: 'static' | 'search-api'` - Data service type.
- `hubmapPortalUrl: string` - Hubmap Portal url.
- `hubmapDataUrl: string` - Hubmap data url.
- `hubmapAssetsUrl: string` - Hubmap assets api url.
- `hubmapToken: string` - Hubmap service token.

The TypeScript definition for this configuration object is [here](projects/ccf-database/src/lib/ccf-database.ts).


# Embedding the CCF-ORGAN-INFO

## Code

To embed *CCF-ORGAN-INFO* the following code snippet should be used.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>HuBMAP CCF Organ Info</title>
  <base href="./">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&amp;display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined" rel="stylesheet">
  <link href="styles.css" rel="stylesheet">
  <script src="wc.js" async></script>
</head>
<body class="mat-typography">
  <ccf-organ-info></ccf-organ-info>
</body>
</html>
```

## Configuration

*CCF-ORGAN-INFO* can be customized in the following ways:

```js
window.addEventListener('DOMContentLoaded', () => {
  const organInfo = document.querySelector('ccf-organ-info');
  organInfo.organIri = "http://purl.obolibrary.org/obo/UBERON_0004538";
  organInfo.sex = 'Female';
  organInfo.side = 'Right';
  organInfo.dataSources = ['https://.....jsonld', 'https://.....jsonld'];
  organInfo.hubmapDataService = 'search-api';
  organInfo.hubmapPortalUrl = 'https://.....';
  organInfo.hubmapDataUrl = 'https://.....';
  organInfo.hubmapAssetUrl = 'https://.....';
});
```

This format of configuration only works with certain data types, namely strings and booleans.
(Note that variables are kebab-case, not camel-case)

````html
<ccf-organ-info
  organ-iri="http://purl.obolibrary.org/obo/UBERON_0004538"
  sex="Female"
  side="Right"
  hubmap-data-service="search-api"
  hubmap-portal-url="https://...."
  hubmap-data-url="https://...."
  hubmap-asset-url="https://...."
></ccf-organ-info>
````

Full ORGAN-INFO Example

````html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>HuBMAP CCF Organ Info</title>
  <base href="./">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&amp;display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined" rel="stylesheet">
  <link href="styles.css" rel="stylesheet">
  <script src="wc.js" async></script>
</head>
<body class="mat-typography">
  <ccf-eui
    organ-iri="http://purl.obolibrary.org/obo/UBERON_0004538"
    sex="Female"
    side="Right"
    hubmap-data-service="search-api"
    hubmap-portal-url="https://portal.test.hubmapconsortium.org/"
    hubmap-data-url="https://search.api.hubmapconsortium.org/entities/search"
    hubmap-asset-url="https://assets.test.hubmapconsortium.org"
  ></ccf-eui>
</body>
</html>
````

The following options are available for configuration

- `organIri: string` - A url to load data from.
- `sex: 'Female' | 'Male'` - The sex of the selected organ.
- `side: 'Left' | 'Right'` - The selected organ side.
- `dataSources: string[]` - A list of data sources (in .jsonld format)
- `hubmapDataService: 'static' | 'search-api'` - Data service type.
- `hubmapPortalUrl: string` - Hubmap Portal url.
- `hubmapDataUrl: string` - Hubmap data url.
- `hubmapAssetsUrl: string` - Hubmap assets api url.
- `hubmapToken: string` - Hubmap service token.



# Embedding the CCF-BODY-UI-WC

## Code

To embed *CCF-BODY-UI-WC* the following code snippet should be used.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>HuBMAP CCF Body UI</title>
  <base href="./">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&amp;display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined" rel="stylesheet">
  <link href="styles.css" rel="stylesheet">
  <script src="wc.js" async></script>
</head>
<body class="mat-typography">
  <ccf-body-ui-wc></ccf-body-ui-wc>
</body>
</html>
```

## Configuration

*CCF-BODY-UI-WC* can be customized in the following ways:

```js
    window.addEventListener('DOMContentLoaded', () => {
      const bodyUI = document.querySelector('ccf-body-ui-wc');
      bodyUI.data = sampleData;
      bodyUI.highlightID = '8cdf44a106338aada6da04c71eeb767e';
      bodyUI.zoomToID = 'http://purl.org/ccf/latest/ccf.owl#VHFColon';

      bodyUI.addEventListener('onMouseEnter', (id) => {
        console.log('onMouseEnter', id);
      });

      bodyUI.addEventListener('onMouseLeave', (id) => {
        console.log('onMouseLeave', id);
      });

      bodyUI.addEventListener('onClick', (id) => {
        console.log('onClick', id);
      });
    });
```

This format of configuration only works with certain data types, namely strings and booleans.
(Note that variables are kebab-case, not camel-case)

````html
<ccf-body-ui-wc
  highlight-id="8cdf44a106338aada6da04c71eeb767e"
  zoom-to-id="http://purl.org/ccf/latest/ccf.owl#VHFColon"
></ccf-body-ui-wc>
````

Full BODY-UI-WC Example

````html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>HuBMAP CCF Body UI</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <script>
    const sampleData = [
      {
        "id": "8b0a4cc904cadaccddd37633411fdbdd",
        "rui_location": {
          "@context": "https://hubmapconsortium.github.io/hubmap-ontology/ccf-context.jsonld",
          "@id": "http://purl.org/ccf/1.5/886e391d-0151-46d3-8a51-084bf6a06910",
          "@type": "SpatialEntity",
          "ccf_annotations": [
            "http://purl.obolibrary.org/obo/UBERON_0002084",
            "http://purl.obolibrary.org/obo/UBERON_0002494",
            "http://purl.org/sig/ont/fma/fma72655",
            "http://purl.obolibrary.org/obo/UBERON_0002080",
            "http://purl.obolibrary.org/obo/UBERON_0002094"
          ],
          "creation_date": "2021-10-25",
          "creator": "Andreas Bueckle",
          "creator_first_name": "Andreas",
          "creator_last_name": "Bueckle",
          "dimension_units": "millimeter",
          "placement": {
            "@context": "https://hubmapconsortium.github.io/hubmap-ontology/ccf-context.jsonld",
            "@id": "http://purl.org/ccf/1.5/886e391d-0151-46d3-8a51-084bf6a06910_placement",
            "@type": "SpatialPlacement",
            "placement_date": "2021-10-25",
            "rotation_order": "XYZ",
            "rotation_units": "degree",
            "scaling_units": "ratio",
            "target": "http://purl.org/ccf/latest/ccf.owl#VHMHeart",
            "translation_units": "millimeter",
            "x_rotation": 41,
            "x_scaling": 1,
            "x_translation": 102.382,
            "y_rotation": 12,
            "y_scaling": 1,
            "y_translation": 54.602,
            "z_rotation": -25,
            "z_scaling": 1,
            "z_translation": 69.821
          },
          "x_dimension": 10,
          "y_dimension": 16,
          "z_dimension": 10
        }
      },
      {
      "id": "8cdf44a106338aada6da04c71eeb767e",
      "rui_location": {
        "@context": "https://hubmapconsortium.github.io/hubmap-ontology/ccf-context.jsonld",
        "@id": "http://purl.org/ccf/1.5/93286ce3-669a-4f3f-a85a-7eaaedc15c59",
        "@type": "SpatialEntity",
        "ccf_annotations": [
          "http://purl.obolibrary.org/obo/UBERON_0001156",
          "http://purl.obolibrary.org/obo/UBERON_0001157",
          "http://purl.obolibrary.org/obo/UBERON_0001159",
          "http://purl.obolibrary.org/obo/UBERON_0001154",
          "http://purl.obolibrary.org/obo/UBERON_0001158",
          "http://purl.obolibrary.org/obo/UBERON_0001052"
        ],
        "creation_date": "2021-10-19",
        "creator": "Yiing Lin",
        "creator_first_name": "Yiing",
        "creator_last_name": "Lin",
        "dimension_units": "millimeter",
        "placement": {
          "@context": "https://hubmapconsortium.github.io/hubmap-ontology/ccf-context.jsonld",
          "@id": "http://purl.org/ccf/1.5/93286ce3-669a-4f3f-a85a-7eaaedc15c59_placement",
          "@type": "SpatialPlacement",
          "placement_date": "2021-10-19",
          "rotation_order": "XYZ",
          "rotation_units": "degree",
          "scaling_units": "ratio",
          "target": "http://purl.org/ccf/latest/ccf.owl#VHFColon",
          "translation_units": "millimeter",
          "x_rotation": 90,
          "x_scaling": 1,
          "x_translation": 122.658,
          "y_rotation": 0,
          "y_scaling": 1,
          "y_translation": 94.075,
          "z_rotation": 78,
          "z_scaling": 1,
          "z_translation": 101.565
        },
        "x_dimension": 20,
        "y_dimension": 50,
        "z_dimension": 5
      }
    }
    ];

    window.addEventListener('DOMContentLoaded', () => {
      const bodyUI = document.querySelector('ccf-body-ui-wc');
      bodyUI.data = sampleData;
      bodyUI.highlightID = '8cdf44a106338aada6da04c71eeb767e';
      bodyUI.zoomToID = 'http://purl.org/ccf/latest/ccf.owl#VHFColon';

      bodyUI.addEventListener('onMouseEnter', (id) => {
        console.log('onMouseEnter', id);
      });

      bodyUI.addEventListener('onMouseLeave', (id) => {
        console.log('onMouseLeave', id);
      });

      bodyUI.addEventListener('onClick', (id) => {
        console.log('onClick', id);
      });
    });
  </script>
</head>

<body class="mat-typography">
  <ccf-body-ui-wc></ccf-body-ui-wc>
</body>

</html>
````

The following options are available for configuration

- `organIri: string` - A url to load data from.
- `highlightID: string` - The id of the object to highlight.
- `zoomToID: string` - The id of the object to zoom to.
- `data: { id: string, rui_location: JsonLdObj }[]` - An array of JsonLd organ objects to display.

The following events are available
- `onMouseEnter: () => string` - Emits the id of the object that was moused over.
- `onMouseLeave: () => string` - Emits the id of the object that was moused out of.
- `onClick: () => string` - Emits the id of the object that was clicked.
