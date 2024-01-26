const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  const files = [
    './dist/apps/ccf-ui/runtime.js',
    './dist/apps/ccf-ui/polyfills.js',
    './dist/apps/ccf-ui/scripts.js',
    './dist/apps/ccf-ui/main.js'
  ];
  await concat(files, './dist/ccf-ui/wc.js');
  await fs.copy('./apps/ccf-eui/src/webcomponent-example.html', 'dist/apps/ccf-ui/webcomponent-example.html');
})();
