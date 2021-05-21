const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  const files = [
    './dist/ccf-ui/runtime-es2015.js',
    './dist/ccf-ui/polyfills-es2015.js',
    './dist/ccf-ui/scripts.js',
    './dist/ccf-ui/main-es2015.js'
  ];
  await fs.ensureDir('ccf-ui-build');
  await concat(files, 'ccf-ui-build/ccf-ui.js');
  await fs.copy('./dist/ccf-ui/styles.css', 'ccf-ui-build/styles.css');
  await fs.copy('./dist/ccf-ui/assets/', 'ccf-ui/assets/');
})();
