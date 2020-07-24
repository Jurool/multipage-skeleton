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
var evalDOM_1 = __importDefault(require("./evalDOM"));
var utils_1 = require("./utils");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var cheerio_1 = __importDefault(require("cheerio"));
var ppteer_1 = __importDefault(require("./ppteer"));
var default_html_1 = __importDefault(require("./default.html"));
var currDir = process.cwd();
var Skeleton = /** @class */ (function () {
    function Skeleton(_a) {
        var _b = _a === void 0 ? {} : _a, url = _b.url, output = _b.output, background = _b.background, _c = _b.animation, animation = _c === void 0 ? "" : _c, _d = _b.rootNode, rootNode = _d === void 0 ? "" : _d, _e = _b.header, header = _e === void 0 ? "" : _e, _f = _b.device, device = _f === void 0 ? "iPhone 6" : _f, _g = _b.destroy, destroy = _g === void 0 ? "" : _g, _h = _b.mediaQuery, mediaQuery = _h === void 0 ? "" : _h, headless = _b.headless, extraHTTPHeaders = _b.extraHTTPHeaders, writePageStructure = _b.writePageStructure, includeElement = _b.includeElement, init = _b.init;
        var filepath = !(output === null || output === void 0 ? void 0 : output.filepath) || path_1.default.isAbsolute(output === null || output === void 0 ? void 0 : output.filepath)
            ? output === null || output === void 0 ? void 0 : output.filepath : path_1.default.join(path_1.default.dirname(fs_1.default.realpathSync(__filename)), "../", output === null || output === void 0 ? void 0 : output.filepath);
        this.url = url;
        this.filepath = filepath || "";
        this.injectSelector = (output === null || output === void 0 ? void 0 : output.injectSelector) || 'body';
        this.background = background || '#ecf0f2';
        this.animation = animation;
        this.rootNode = rootNode;
        this.header = header;
        this.device = device;
        this.destroy = destroy;
        this.mediaQuery = mediaQuery;
        this.headless = headless;
        this.extraHTTPHeaders = extraHTTPHeaders;
        this.writePageStructure = writePageStructure;
        this.includeElement = includeElement || function () { };
        this.init = init || function () { };
        if (this.headless === undefined)
            this.headless = true;
        if (!url) {
            utils_1.log.error("please provide entry url !", 1);
        }
        if (header && utils_1.getType(header) !== "object") {
            utils_1.log.error("[header] should be an object !", 1);
        }
        if (filepath) {
            console.log('filepath: ', filepath);
            if (!fs_1.default.existsSync(filepath)) {
                utils_1.log.error('[output.filepath:404] please provide the output filepath !', 1);
            }
            else {
                var fileStat = fs_1.default.statSync(filepath);
                if (fileStat.isDirectory()) {
                    filepath = path_1.default.join(filepath, 'index.html');
                    fs_1.default.writeFileSync(filepath, default_html_1.default);
                    this.filepath = filepath;
                }
            }
        }
    }
    Skeleton.prototype.generateSkeletonHTML = function (page) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var html, args, _html, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        html = "";
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        args = utils_1.parseParams.create({
                            init: {
                                type: 'function',
                                value: (_a = this.init) === null || _a === void 0 ? void 0 : _a.toString(),
                            },
                            includeElement: {
                                type: 'function',
                                value: (_b = this.includeElement) === null || _b === void 0 ? void 0 : _b.toString(),
                            },
                            background: {
                                type: 'string',
                                value: this.background,
                            },
                            animation: {
                                type: 'string',
                                value: this.animation,
                            },
                            rootNode: {
                                type: 'string',
                                value: this.rootNode,
                            },
                            header: {
                                type: 'object',
                                value: JSON.stringify(this.header),
                            },
                            selector: {
                                type: "string",
                                value: this.injectSelector,
                            },
                            mediaQuery: {
                                type: 'string',
                                value: this.mediaQuery,
                            },
                            device: {
                                type: 'string',
                                value: this.device,
                            },
                            destroy: {
                                type: 'string',
                                value: this.destroy,
                            },
                        });
                        args === null || args === void 0 ? void 0 : args.unshift(evalDOM_1.default);
                        return [4 /*yield*/, page.evaluate.apply(page, args)];
                    case 2:
                        _html = (_c.sent()).html;
                        html = _html;
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _c.sent();
                        utils_1.log("\n", "error: ");
                        utils_1.log.error("\n[page.evaluate] " + e_1.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, html];
                }
            });
        });
    };
    Skeleton.prototype.writeToFilepath = function (filepath, html) {
        var fileHTML = fs_1.default.readFileSync(filepath, {
            encoding: "utf-8",
        });
        var $ = cheerio_1.default.load(fileHTML, {
            decodeEntities: false,
        });
        /** this.injectSelector's outerHTML */
        var prevOuterHTML = $.html(this.injectSelector);
        // insert this.injectSelector's innerHTML
        $(this.injectSelector).html(html);
        /** OuterHTML after replacement */
        var currentOuterHTML = $.html(this.injectSelector);
        fs_1.default.writeFileSync(filepath, fileHTML.replace(prevOuterHTML, currentOuterHTML));
    };
    Skeleton.prototype.start = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, filepath, pageUrl, spinner, browser, page, html, userWrite, defaultPage;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = this, filepath = _b.filepath, pageUrl = _b.url;
                        spinner = utils_1.Spinner("magentaBright");
                        spinner.text = "\u542F\u52A8\u6D4F\u89C8\u5668...";
                        return [4 /*yield*/, ppteer_1.default({
                                device: this.device || "",
                                headless: this.headless,
                            })];
                    case 1:
                        browser = _c.sent();
                        spinner.text = "\u6B63\u5728\u6253\u5F00\u9875\u9762\uFF1A" + pageUrl + "...";
                        return [4 /*yield*/, browser.openPage(pageUrl, this.extraHTTPHeaders)];
                    case 2:
                        page = _c.sent();
                        spinner.text = "\u6B63\u5728\u751F\u6210\u9AA8\u67B6\u5C4F\u4EE3\u7801...";
                        return [4 /*yield*/, this.generateSkeletonHTML(page)];
                    case 3:
                        html = _c.sent();
                        userWrite = utils_1.getType(this.writePageStructure) === "function";
                        userWrite && ((_a = this.writePageStructure) === null || _a === void 0 ? void 0 : _a.call(this, html, filepath));
                        filepath && this.writeToFilepath(filepath, html);
                        if (!userWrite && !filepath) {
                            defaultPage = path_1.default.join(currDir, "index.html");
                            fs_1.default.writeFileSync(defaultPage, default_html_1.default);
                            this.writeToFilepath(defaultPage, html);
                            this.filepath = defaultPage;
                            spinner.clear();
                            utils_1.log.warn("\nskeleton has created in a default page: " + defaultPage);
                        }
                        spinner
                            .clear()
                            .succeed("skeleton screen has created and output to " + utils_1.calcText(this.filepath));
                        if (!this.headless) return [3 /*break*/, 5];
                        return [4 /*yield*/, browser.browser.close()];
                    case 4:
                        _c.sent();
                        _c.label = 5;
                    case 5: return [2 /*return*/, Promise.resolve("successs")];
                }
            });
        });
    };
    return Skeleton;
}());
exports.default = Skeleton;
