#!/usr/bin/env node
"use strict";
/* eslint-disable @typescript-eslint/no-var-requires */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const path_1 = __importDefault(require("path"));
const src_1 = __importDefault(require("../src"));
const { version } = require('../package.json');
const currentDirectory = process.cwd();
commander_1.default.version(version, `-v, --version`, `latest version`);
commander_1.default
    .command('start')
    .description('start create a skeleton screen')
    .action(() => src_1.default(require(getConfigFile())));
commander_1.default.parse(process.argv);
function getConfigFile() {
    return path_1.default.resolve(currentDirectory, `./skeleton.config.js`);
}
