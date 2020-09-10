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
const puppeteer_1 = __importDefault(require("puppeteer"));
const { devices } = puppeteer_1.default;
const utils_1 = require("./utils");
const extraDefaultDevices = {
    mobile: {
        viewport: { width: 375, height: 667 },
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
    },
    ipad: {
        viewport: { width: 1024, height: 1366 },
        userAgent: 'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1',
    },
    pc: {
        viewport: { width: 1440, height: 1300 },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36',
    },
};
exports.default = ({ device, headless = true, userAgent, viewport, } = {}) => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch(Object.assign({ headless }, (headless ? {} : { args: ['--no-sandbox'] })));
    function openPage(url, extraHTTPHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = yield browser.newPage();
            try {
                const defaultDevices = Object.keys(extraDefaultDevices);
                if (userAgent && viewport) {
                    page.setUserAgent(userAgent);
                    page.setViewport(viewport);
                }
                else if (device && defaultDevices.includes(device)) {
                    const { userAgent: _userAgent, viewport: _viewport, } = extraDefaultDevices[device];
                    page.setUserAgent(_userAgent);
                    page.setViewport(_viewport);
                }
                else if (typeof device === `string`) {
                    const _device = devices[device];
                    yield page.emulate(_device);
                }
                if (extraHTTPHeaders && utils_1.getType(extraHTTPHeaders) === `object`) {
                    yield page.setExtraHTTPHeaders(new Map(Object.entries(extraHTTPHeaders)));
                }
                yield page.goto(url, {
                    timeout: 2 * 60 * 1000,
                    waitUntil: `networkidle0`,
                });
            }
            catch (e) {
                console.log(`\n`, `error: `);
                utils_1.log.error(e.message);
            }
            return page;
        });
    }
    return {
        browser,
        openPage,
    };
});
