#!/usr/local/bin/node
import program from 'commander';
import packageData from '../../package.json';
import run from '..';

program
  .version(packageData.version)
  .description(packageData.description)
  .option('-o, --output <path>', 'input directory for saving')
  .arguments('<url>')
  .action(url => run(url, program.output))
  .parse(process.argv);

if (!program.args.length) {
  program.help();
}
