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

The following options are available for configuration

- `embedded: boolean` - Whether the *CCF-RUI* is embedded as a part of HUBMap or as a standalone app. If not specified it is inferred from the presence of the `user` configuration option.
- `tutorialMode: boolean` - Whether to present *CCF-RUI* in tutorial mode with additional textual information.
- `homeUrl: string` - URL that the user will be redirected to when clicking the HUBMap logo or back button in the upper left corner of the app.
- `organ: { name: 'colon' | 'heart' | 'kidney' | 'spleen', sex?: 'male' | 'female', side?: 'left' | 'right' }` - the reference organ to preload.
- `user: { firstName: string, lastName: string })` - The user of the app. Should always be specified when the app is in embedded mode!
- `register: (rui_location: string) => void` A callback function called whenever the user hits registers. It should take a single argument which is the stringified json object containing the registration data.
- `useDownload: boolean` - Prefer downloading the json registration data rather than using the `register` callback.
- `fetchPreviousRegistrations: () => rui_location[] | Promise<rui_location[]>` - A callback function called when the user wishes to see previous registered objects. It should take no arguments and return a list of previous registrations, possibly asynchronously.

The TypeScript definition for this configuration object is [here](projects/ccf-rui/src/app/core/services/config/config.ts).
