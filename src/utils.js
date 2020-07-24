"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseParams = exports.emoji = exports.Spinner = exports.getType = exports.calcText = exports.log = void 0;
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
var chalk_1 = __importDefault(require("chalk"));
var ora_1 = __importDefault(require("ora"));
var node_emoji_1 = __importDefault(require("node-emoji"));
exports.emoji = node_emoji_1.default;
var appName = "skeleton";
var likeLinux = process.env.TERM === "cygwin" || process.platform !== "win32";
var parseParams = {
    prefixName: appName + "-",
    create: function (args) {
        var _this = this;
        if (getType(args) !== "object")
            return;
        return Object.keys(args).map(function (item) {
            var _a = args[item], type = _a.type, value = _a.value;
            return _this.prefixName + item + "-" + type + ":" + value;
        });
    },
};
exports.parseParams = parseParams;
function calcText(str) {
    if (str.length > 40) {
        return (str.slice(0, 15) + "..." + (str.match(/([\/\\][^\/\\]+)$/) || ["", ""])[1]);
    }
    return str;
}
exports.calcText = calcText;
function log() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    console.log.apply(console, args);
}
exports.log = log;
log.error = function (msg, exit) {
    log(chalk_1.default.gray("[" + appName + "]:", chalk_1.default.red(msg)));
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
    var opt = likeLinux
        ? {
            spinner: {
                interval: 125,
                frames: ["\u2219\u2219\u2219", "\u25CF\u2219\u2219", "\u2219\u25CF\u2219", "\u2219\u2219\u25CF", "\u2219\u2219\u2219"],
            },
        }
        : "";
    var spinner = ora_1.default(opt).start();
    spinner.color = color;
    return spinner;
}
exports.Spinner = Spinner;
var emoji_get = node_emoji_1.default.get.bind(node_emoji_1.default);
node_emoji_1.default.get = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return !likeLinux ? "\u00B7" : emoji_get.apply(node_emoji_1.default, args);
};
