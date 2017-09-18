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
    const listr = true;
    const dir = path.resolve(program.output || './tmp');
    console.log(`Downloading ${url} to ${dir}...\n`);
    return run(url, program.output, listr)
      .then(() => console.log(`\n${url} has been downloaded to ${dir}`))
      .catch((e) => {
        const errmsg = `Unable to download ${url} to ${dir}\n >${e.message}`;
        console.error(errmsg);
        process.exit(1);
      });
  })
  .parse(process.argv);

if (!program.args.length) {
  program.help();
}
