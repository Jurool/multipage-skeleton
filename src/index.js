"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const skeleton_1 = __importDefault(require("./skeleton"));
module.exports = function skeleton(configs) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!Array.isArray(configs)) {
            throw new Error(`\`skeleton.config.js\` must export an array.`);
        }
        for (const config of configs) {
            yield new skeleton_1.default(config).start();
        }
        process.exit(0);
    });
};
