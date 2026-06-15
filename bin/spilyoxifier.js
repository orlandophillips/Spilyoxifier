#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import readline from 'readline';
import path from 'path';
import { patchDefaultsVariable } from '../src/patcher.js';

const program = new Command();

program
  .name('spilyoxify')
  .description('Patch spicylyrics build assets with custom routing configurations.')
  .version('1.0.0')
  .option('-p, --proxy <url>', 'Proxy server destination URL')
  .option('-f, --file <path>', 'Path to build target file');

program.parse(process.argv);
const options = program.opts();

// Simple promise-based readline helper for interactive fallback mode
const askQuestion = (query) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise((resolve) => rl.question(query, (ans) => {
    rl.close();
    resolve(ans.trim());
  }));
};

// Clean terminal spinner implementation using native interval frames
function createSpinner(text) {
  const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  let i = 0;
  
  process.stdout.write('\x1B[?25l'); // Hide terminal cursor
  const interval = setInterval(() => {
    process.stdout.write(`\r${chalk.cyan(frames[i++ % frames.length])} ${text}`);
  }, 80);

  return {
    stop: (successText, isError = false) => {
      clearInterval(interval);
      process.stdout.write('\r\x1B[K'); // Clear line buffer
      process.stdout.write('\x1B[?25h'); // Restore terminal cursor
      if (isError) {
        console.log(`${chalk.red('✖')} ${successText}`);
      } else {
        console.log(`${chalk.green('✔')} ${successText}`);
      }
    }
  };
}

async function main() {
  let proxyUrl = options.proxy;
  let filePath = options.file;

  // Manual fallback check if command line arguments are missing
  if (!proxyUrl || !filePath) {
    console.log(chalk.bold.gray('\n--- Spilyoxifier Configuration Setup ---'));
    
    if (!proxyUrl) {
      proxyUrl = await askQuestion(`${chalk.blue('ℹ')} Enter proxy destination URL: `);
      if (!proxyUrl) {
        console.log(`${chalk.red('✖')} Error: Proxy URL is required.`);
        process.exit(1);
      }
    }
    
    if (!filePath) {
      filePath = await askQuestion(`${chalk.blue('ℹ')} Enter path to target file [./src/build.mjs]: `);
      filePath = filePath || './src/build.mjs';
    }
    console.log(); // Spacing block
  }

  const absolutePath = path.resolve(filePath);
  
  console.log(`${chalk.gray('[*] Target file:')} ${absolutePath}`);
  console.log(`${chalk.gray('[*] Injecting proxy:')} ${proxyUrl}\n`);

  const spinner = createSpinner('Parsing structure and applying source patch...');

  try {
    await patchDefaultsVariable(absolutePath, proxyUrl);
    spinner.stop('Patch successfully applied to target files.');
  } catch (err) {
    spinner.stop('Operation failed.', true);
    console.error(`\n${chalk.red('Details:')} ${err.message}`);
    process.exit(1);
  }
}

main();
