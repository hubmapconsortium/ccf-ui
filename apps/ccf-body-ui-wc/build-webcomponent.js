const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  const files = [
    './dist/ccf-body-ui-wc/runtime.js',
    './dist/ccf-body-ui-wc/polyfills.js',
    './dist/ccf-body-ui-wc/scripts.js',
    './dist/ccf-body-ui-wc/main.js',
  ];
  await concat(files, './dist/ccf-body-ui-wc/wc.js');
  await fs.copy(
    './apps/ccf-body-ui-wc/src/webcomponent-example.html',
    'dist/apps/ccf-body-ui-wc/webcomponent-example.html'
  );
})();
