#!/usr/bin/env node

const fs = require('fs');
const stream = require('stream');
const util = require('util');
const chalk = require('chalk');
const program = require('commander');

const CaesarTransform = require('./module/transform');

const pipeline = util.promisify(stream.pipeline);

const actions = async _ => {
    const {input, output, action} = program.opts();


    const ReadableStream = (input) ? fs.createReadStream(input) : process.stdin;
    const WriteableStream = (output) ? fs.createWriteStream((output), { flags: 'a' }) : process.stdout;
    
    try {
      await pipeline(
        ReadableStream,
        new CaesarTransform(action),
        WriteableStream
      );
      process.stdout.write(`Text\n`);
    } catch (e) {
      process.stderr.write(` ${e.message}\n`);
      process.exit(1);
    }
}

process.stdin.setEncoding('utf8');
process.on('exit', code => console.log(chalk.yellow.bold('Code: ') + chalk.green.bold(code)));
process.on('SIGINT', _ => { process.exit(0); });

program
  .option('-i, --input <filename>', 'An input file')
  .option('-o --output <filename>', 'An output file')
  .requiredOption('-a --action <action>', 'An action string/array')
  .action(actions)

program.parse(process.argv);