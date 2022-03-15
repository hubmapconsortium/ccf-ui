const { Command } = require('commander');
const { exec } = require("child_process");
const { join } = require('path');


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

const build = async (project, dir, outDir) => {
  const projectDir = join(dir, project);
  const distDir = join(projectDir, 'dist');
  const distOutDir = join(outDir, project);
  const command = `cd "${projectDir}" && npm i && npm run build`;
  const copy = `npx mkdirp "${distOutDir}" && cp -RT "${distDir}" "${distOutDir}"`;
  let stdout, stderr;

  try {
    console.log(`Starting ${project} build`);
    ({ stdout, stderr } = await execAsync(command));
    console.log(`Build ${project} done`);
    print('Stdout:', stdout);
    print('Stderr:', stderr);

    console.log('Copying build artifacts');
    ({ stdout, stderr } = await execAsync(copy));
    console.log('Copying build artifacts done');
    print('Stdout:', stdout);
    print('Stderr:', stderr);
  } catch (data) {
    console.log(`Build ${project} failed!`);
    print('Error:', data.error);
    print('Stderr:', data.stderr);
  }
}


const program = new Command()
  .name('build')
  .description('CLI to build generated libraries')
  .argument('<projects...>', 'projects to build')
  .requiredOption('-i, --input <dir>', 'generated code directory')
  .option('-o, --output <dir>', 'built libraries output directory', 'dist/ccf-openapi');

program.parse();

const options = program.opts();
const projects = program.args;
const inputDir = options.input;
const outputDir = options.output;

(async () => {
  const builders = [];
  for (const project of projects) {
    const builder = build(project, inputDir, outputDir);
    builders.push(builder);
    await builder; // Remove this to make it run in parallel
  }

  await Promise.allSettled(builders);
})();
