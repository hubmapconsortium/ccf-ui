import { copyFile } from 'node:fs/promises';
import concat from 'concat';
import { argv, exit } from 'node:process';
import { glob } from 'glob';

async function build(app_name) {
  const exampleHtmlFile = 'webcomponent-example.html'
  const srcDir = `./apps/${app_name}/src`;
  const distDir = `./dist/apps/${app_name}`;
  const jsFiles = await glob([
    `${distDir}/runtime*.js`,
    `${distDir}/polyfills*.js`,
    `${distDir}/scripts*.js`,
    `${distDir}/main*.js`,
  ]);

  if (jsFiles.length !== 4) {
    console.log('Failed to find all application js files');
    exit(1);
  }

  await concat(jsFiles, `${distDir}/wc.js`);
  await copyFile(`${srcDir}/${exampleHtmlFile}`, `${distDir}/${exampleHtmlFile}`);
}

async function main() {
  const userArguments = argv.slice(2);
  if (userArguments.length !== 1) {
    console.error('Expected the application directory name as the only argument');
    exit(1);
  }

  await build(userArguments[0]);
}

await main();
