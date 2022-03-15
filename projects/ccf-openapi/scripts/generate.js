const { Command } = require('commander');
const { exec } = require("child_process");
const { readdirSync } = require("fs");
const { extname, join, basename } = require("path");

const isConfigFile = entry => entry.isFile() && extname(entry.name) === '.yaml';
const getConfigs = dir => readdirSync(dir, { withFileTypes: true, encoding: 'utf-8' })
  .filter(isConfigFile)
  .map(entry => join(dir, entry.name));

const execAsync = command => {
  let resolve, reject;
  const result = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  exec(command, (error, stdout, stderr) => {
    if (error === null) {
      resolve({ stdout, stderr });
    } else {
      reject({ error, stderr });
    }
  });

  return result;
};

const print = (pre, value) => {
  if (value) {
    console.log(pre);
    console.log(value);
  }
}

const generate = async (config, input, output) => {
  const name = basename(config, '.yaml');
  const command = `npx openapi-generator-cli generate -c "${config}" -i "${input}" -o "${output}"`;

  try {
    console.log(`Starting ${name} generator`);

    const { stdout, stderr } = await execAsync(command);

    console.log(`Generator ${name} done`);
    print('Stdout:', stdout);
    print('Stderr:', stderr);
  } catch (data) {
    console.log(`Generator ${name} failed!`);
    print('Error:', data.error);
    print('Stderr:', data.stderr);
  }
};


const program = new Command()
  .name('generate')
  .description('CLI using openapi-generator-cli to generate code')
  .requiredOption('-i, --input <file>', 'openapi spec')
  .requiredOption('-c, --configs <dir>', 'directory with configuration files')
  .option('-o, --output <dir>', 'generated code output directory', 'generated');

program.parse();

const options = program.opts();
const input = options.input;
const configDir = options.configs;
const configs = getConfigs(configDir);
const outputDir = options.output;

const generators = [];
for (const config of configs) {
  const name = basename(config, '.yaml');
  const generator = generate(config, input, join(outputDir, name));
  generators.push(generator);
}

Promise.allSettled(generators);
