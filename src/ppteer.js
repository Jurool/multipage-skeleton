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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var puppeteer_1 = __importDefault(require("puppeteer"));
var devices = puppeteer_1.default.devices;
var utils_1 = require("./utils");
var _devices_ = {
    mobile: [
        375,
        667,
        'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
    ],
    ipad: [
        1024,
        1366,
        'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1',
    ],
    pc: [
        1440,
        1300,
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36',
    ],
};
exports.default = (function (_a) {
    var _b = _a === void 0 ? {} : _a, device = _b.device, _c = _b.headless, headless = _c === void 0 ? true : _c, userAgent = _b.userAgent, viewport = _b.viewport;
    return __awaiter(void 0, void 0, void 0, function () {
        function openPage(url, extraHTTPHeaders) {
            return __awaiter(this, void 0, void 0, function () {
                var page, defaultDevices, deviceSet, _device, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, browser.newPage()];
                        case 1:
                            page = _a.sent();
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 10, , 11]);
                            defaultDevices = ["mobile", "ipad", "pc"];
                            if (!(userAgent && viewport)) return [3 /*break*/, 3];
                            page.setUserAgent(userAgent);
                            page.setViewport(viewport);
                            return [3 /*break*/, 6];
                        case 3:
                            if (!defaultDevices.includes(device)) return [3 /*break*/, 4];
                            deviceSet = _devices_[device];
                            page.setUserAgent(deviceSet[2]);
                            page.setViewport({ width: deviceSet[0], height: deviceSet[1] });
                            return [3 /*break*/, 6];
                        case 4:
                            if (!(typeof device === "string")) return [3 /*break*/, 6];
                            _device = devices[device];
                            return [4 /*yield*/, page.emulate(_device)];
                        case 5:
                            _a.sent();
                            _a.label = 6;
                        case 6:
                            if (!(extraHTTPHeaders && utils_1.getType(extraHTTPHeaders) === "object")) return [3 /*break*/, 8];
                            return [4 /*yield*/, page.setExtraHTTPHeaders(new Map(Object.entries(extraHTTPHeaders)))];
                        case 7:
                            _a.sent();
                            _a.label = 8;
                        case 8: return [4 /*yield*/, page.goto(url, {
                                timeout: 2 * 60 * 1000,
                                waitUntil: "networkidle0",
                            })];
                        case 9:
                            _a.sent();
                            return [3 /*break*/, 11];
                        case 10:
                            e_1 = _a.sent();
                            console.log("\n", "error: ");
                            utils_1.log.error(e_1.message);
                            return [3 /*break*/, 11];
                        case 11: return [2 /*return*/, page];
                    }
                });
            });
        }
        var browser;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, puppeteer_1.default.launch({
                        headless: headless,
                    })];
                case 1:
                    browser = _d.sent();
                    return [2 /*return*/, {
                            browser: browser,
                            openPage: openPage,
                        }];
            }
        });
    });
});
