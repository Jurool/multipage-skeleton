#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

import program from 'commander'
import path from 'path'
import skeleton from '../src'
const { version } = require('../package.json')

const currentDirectory = process.cwd()

program.version(version, `-v, --version`, `latest version`)

program
  .command('start')
  .description('start create a skeleton screen')
  .action(() => skeleton(require(getConfigFile())))

program.parse(process.argv)

function getConfigFile() {
  return path.resolve(currentDirectory, `./skeleton.config.js`)
}
