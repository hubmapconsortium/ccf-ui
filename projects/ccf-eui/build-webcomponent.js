const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  const files = [
    './dist/ccf-ui/runtime-es2015.js',
    './dist/ccf-ui/polyfills-es2015.js',
    './dist/ccf-ui/scripts.js',
    './dist/ccf-ui/main-es2015.js'
  ];
  await concat(files, './dist/ccf-ui/wc.js');
  await fs.copy('./projects/ccf-eui/src/webcomponent-example.html', 'dist/ccf-ui/webcomponent-example.html');
})();
