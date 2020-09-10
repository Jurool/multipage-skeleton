"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseParams = exports.emoji = exports.Spinner = exports.getType = exports.calcText = exports.log = void 0;
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
const chalk_1 = __importDefault(require("chalk"));
const ora_1 = __importDefault(require("ora"));
const node_emoji_1 = __importDefault(require("node-emoji"));
exports.emoji = node_emoji_1.default;
const appName = `skeleton`;
const likeLinux = process.env.TERM === `cygwin` || process.platform !== `win32`;
const parseParams = {
    prefixName: `${appName}-`,
    create(args) {
        if (getType(args) !== `object`)
            return;
        return Object.keys(args).map((item) => {
            const { type, value } = args[item];
            return `${this.prefixName + item}-${type}:${value}`;
        });
    },
};
exports.parseParams = parseParams;
function calcText(str) {
    if (str.length > 40) {
        return (str.slice(0, 15) + `...` + (str.match(/([\/\\][^\/\\]+)$/) || [``, ``])[1]);
    }
    return str;
}
exports.calcText = calcText;
function log(...args) {
    console.log(...args);
}
exports.log = log;
log.error = function (msg, exit) {
    log(chalk_1.default.gray(`[${appName}]:`, chalk_1.default.red(msg)));
    exit && process.exit(0);
};
log.warn = function (msg) {
    log(chalk_1.default.yellow(msg));
};
log.info = function (msg) {
    log(chalk_1.default.greenBright(msg));
};
function getType(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}
exports.getType = getType;
function Spinner(color) {
    const opt = likeLinux
        ? {
            spinner: {
                interval: 125,
                frames: [`∙∙∙`, `●∙∙`, `∙●∙`, `∙∙●`, `∙∙∙`],
            },
        }
        : ``;
    const spinner = ora_1.default(opt).start();
    spinner.color = color;
    return spinner;
}
exports.Spinner = Spinner;
const emoji_get = node_emoji_1.default.get.bind(node_emoji_1.default);
node_emoji_1.default.get = function (...args) {
    return !likeLinux ? `·` : emoji_get.apply(node_emoji_1.default, args);
};
