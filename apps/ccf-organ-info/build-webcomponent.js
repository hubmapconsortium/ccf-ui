const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  const files = [
    './dist/ccf-organ-info/runtime.js',
    './dist/ccf-organ-info/polyfills.js',
    './dist/ccf-organ-info/scripts.js',
    './dist/ccf-organ-info/main.js'
  ];
  await concat(files, './dist/ccf-organ-info/wc.js');
  await fs.copy('./apps/ccf-organ-info/src/webcomponent-example.html', 'dist/apps/ccf-organ-info/webcomponent-example.html');
})();
