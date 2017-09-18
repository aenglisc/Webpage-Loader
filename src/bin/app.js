#!/usr/local/bin/node
import program from 'commander';
import path from 'path';
import packageData from '../../package.json';
import run from '..';

program
  .version(packageData.version)
  .description(packageData.description)
  .option('-o, --output <path>', 'input directory for saving')
  .arguments('<url>')
  .action((url) => {
    const dir = path.resolve(program.output || './tmp');
    console.log(`Downloading ${url} to ${dir}...\n`);
    return run(url, program.output)
      .then(() => console.log(`\n${url} has been downloaded to ${dir}`))
      .catch(e => console.error(e.message));
  })
  .parse(process.argv);

if (!program.args.length) {
  program.help();
}
