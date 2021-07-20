const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  const files = [
    './dist/ccf-rui/runtime.js',
    './dist/ccf-rui/polyfills.js',
    './dist/ccf-rui/scripts.js',
    './dist/ccf-rui/main.js'
  ];
  await concat(files, './dist/ccf-rui/wc.js');
  await fs.copy('./projects/ccf-rui/src/webcomponent-example.html', 'dist/ccf-rui/webcomponent-example.html');
})();