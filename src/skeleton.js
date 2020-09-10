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
Object.defineProperty(exports, "__esModule", { value: true });
const evalDOM_1 = __importDefault(require("./evalDOM"));
const utils_1 = require("./utils");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const cheerio_1 = __importDefault(require("cheerio"));
const ppteer_1 = __importDefault(require("./ppteer"));
const default_html_1 = __importDefault(require("./default.html"));
const currentDirectory = process.cwd();
class Skeleton {
    constructor({ url, output, background = `#ecf0f2`, skeletonColor = `#eee`, animation = ``, zIndex = `999`, rootNode = ``, header = ``, device = `iPhone 6`, destroy = ``, mediaQuery = ``, userAgent = ``, viewport = ``, headless, extraHTTPHeaders, writePageStructure, includeElement, init, } = {}) {
        let filepath = !(output === null || output === void 0 ? void 0 : output.filepath) || path_1.default.isAbsolute(output === null || output === void 0 ? void 0 : output.filepath)
            ? output === null || output === void 0 ? void 0 : output.filepath : path_1.default.join(currentDirectory, output === null || output === void 0 ? void 0 : output.filepath);
        this.url = url;
        this.filepath = filepath || ``;
        this.injectSelector = (output === null || output === void 0 ? void 0 : output.injectSelector) || 'body';
        this.background = background;
        this.skeletonColor = skeletonColor;
        this.animation = animation;
        this.zIndex = zIndex;
        this.rootNode = rootNode;
        this.header = header;
        this.device = device;
        this.destroy = destroy;
        this.mediaQuery = mediaQuery;
        this.userAgent = userAgent;
        this.viewport = viewport;
        this.headless = headless;
        this.extraHTTPHeaders = extraHTTPHeaders;
        this.writePageStructure = writePageStructure;
        this.includeElement = includeElement || function () { };
        this.init = init || function () { };
        if (this.headless === undefined)
            this.headless = true;
        if (!url) {
            utils_1.log.error(`please provide entry url !`, 1);
        }
        if (header && utils_1.getType(header) !== `object`) {
            utils_1.log.error(`[header] should be an object !`, 1);
        }
        if (filepath) {
            if (!fs_1.default.existsSync(filepath)) {
                utils_1.log.error('[output.filepath:404] please provide the output filepath !', 1);
            }
            else {
                const fileStat = fs_1.default.statSync(filepath);
                if (fileStat.isDirectory()) {
                    filepath = path_1.default.join(filepath, 'index.html');
                    fs_1.default.writeFileSync(filepath, default_html_1.default);
                    this.filepath = filepath;
                }
            }
        }
    }
    generateSkeletonHTML(page) {
        return __awaiter(this, void 0, void 0, function* () {
            let html = ``;
            try {
                const { init, includeElement, background, skeletonColor, animation, zIndex, rootNode, header, injectSelector, mediaQuery, device, destroy, } = this;
                const args = utils_1.parseParams.create({
                    init: {
                        type: 'function',
                        value: init === null || init === void 0 ? void 0 : init.toString(),
                    },
                    includeElement: {
                        type: 'function',
                        value: includeElement === null || includeElement === void 0 ? void 0 : includeElement.toString(),
                    },
                    background: {
                        type: 'string',
                        value: background,
                    },
                    skeletonColor: {
                        type: 'string',
                        value: skeletonColor,
                    },
                    animation: {
                        type: 'string',
                        value: animation,
                    },
                    zIndex: {
                        type: 'string',
                        value: zIndex,
                    },
                    rootNode: {
                        type: 'string',
                        value: rootNode,
                    },
                    header: {
                        type: 'object',
                        value: JSON.stringify(header),
                    },
                    injectSelector: {
                        type: `string`,
                        value: injectSelector,
                    },
                    mediaQuery: {
                        type: 'string',
                        value: mediaQuery,
                    },
                    device: {
                        type: 'string',
                        value: device,
                    },
                    destroy: {
                        type: 'string',
                        value: destroy,
                    },
                });
                args === null || args === void 0 ? void 0 : args.unshift(evalDOM_1.default);
                const { html: _html } = yield page.evaluate(...args);
                html = _html;
            }
            catch (e) {
                utils_1.log(`\n`, `error: `);
                utils_1.log.error(`\n[page.evaluate] ${e.message}`);
            }
            return html;
        });
    }
    writeToFilepath(filepath, html) {
        const fileHTML = fs_1.default.readFileSync(filepath, {
            encoding: `utf-8`,
        });
        const $ = cheerio_1.default.load(fileHTML, {
            decodeEntities: false,
        });
        /** this.injectSelector's outerHTML */
        const prevOuterHTML = $.html(this.injectSelector);
        // insert this.injectSelector's innerHTML
        $(this.injectSelector).html(html);
        /** OuterHTML after replacement */
        const currentOuterHTML = $.html(this.injectSelector);
        fs_1.default.writeFileSync(filepath, fileHTML.replace(prevOuterHTML, currentOuterHTML));
    }
    start() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { filepath, url: pageUrl, device, headless, userAgent, viewport, } = this;
            const spinner = utils_1.Spinner(`magentaBright`);
            spinner.text = `启动浏览器...`;
            const browser = yield ppteer_1.default({
                device,
                headless,
                userAgent,
                viewport,
            });
            spinner.text = `正在打开页面：${pageUrl}...`;
            const page = yield browser.openPage(pageUrl, this.extraHTTPHeaders);
            spinner.text = `正在生成骨架屏代码...`;
            const html = yield this.generateSkeletonHTML(page);
            const userWrite = utils_1.getType(this.writePageStructure) === `function`;
            userWrite && ((_a = this.writePageStructure) === null || _a === void 0 ? void 0 : _a.call(this, html, filepath));
            filepath && this.writeToFilepath(filepath, html);
            if (!userWrite && !filepath) {
                const defaultPage = path_1.default.join(currentDirectory, `index.html`);
                fs_1.default.writeFileSync(defaultPage, default_html_1.default);
                this.writeToFilepath(defaultPage, html);
                this.filepath = defaultPage;
                spinner.clear();
                utils_1.log.warn(`\nskeleton has created in a default page: ${defaultPage}`);
            }
            spinner
                .clear()
                .succeed(`skeleton screen has created and output to ${utils_1.calcText(this.filepath)}`);
            if (this.headless) {
                yield browser.browser.close();
            }
            return Promise.resolve(`successs`);
        });
    }
}
exports.default = Skeleton;
