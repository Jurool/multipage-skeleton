"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function evalDOM(...params) {
    function kebabCase(str) {
        const hyphenateRE = /([^-])([A-Z])/g;
        return str.replace(hyphenateRE, '$1-$2').toLowerCase();
    }
    const random = () => Math.random().toString(16).slice(2);
    const ELEMENTS = [
        'audio',
        'button',
        'canvas',
        'code',
        'img',
        'input',
        'pre',
        'svg',
        'textarea',
        'video',
        'xmp',
    ];
    //** Used to save the skeleton screen code */
    const blocks = [];
    const { innerWidth, innerHeight } = window;
    let args = params;
    if (!args.length)
        args = [{}];
    const [firstElem] = args;
    // parse arguments
    if (args.length !== 1 || getType(firstElem) !== 'object') {
        args = parseParams(args);
    }
    // Skeleton screen DOM attributes
    const [_, __] = [`skeleton-${random()}`, `skeleton-${random()}`];
    const classProps = {
        position: 'fixed',
        zIndex: args.zIndex,
        background: args.skeletonColor,
    };
    if (args.animation) {
        classProps.animation = args.animation;
    }
    createCommonClass(classProps);
    function drawBlock({ width, height, top, left, zIndex = String(+args.zIndex + 2), background = args.skeletonColor, radius, subClass, } = {}) {
        const styles = [`height: ${height}%`];
        if (!subClass) {
            styles.push(`top: ${top}%`, `left: ${left}%`, `width: ${width}%`);
        }
        if (classProps.zIndex !== zIndex) {
            styles.push(`z-index: ${zIndex}`);
        }
        if (classProps.background !== background) {
            styles.push(`background: ${background}`);
        }
        radius && radius !== '0px' && styles.push(`border-radius: ${radius}`);
        blocks.push(`<div ${_} ${subClass ? `${__}` : ''} style="${styles.join(';')}"></div>`);
    }
    function getPercentage(molecular, denominator) {
        return parseFloat(String((molecular / denominator) * 100)).toFixed(3);
    }
    function getType(obj) {
        return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
    }
    function getCSSProperty(node, attr) {
        return (node.nodeType === 1 ? getComputedStyle(node)[attr] : ``) || ``;
    }
    function getRootNode(element) {
        if (!element)
            return null;
        return element instanceof HTMLElement
            ? element
            : getType(element) === `string`
                ? document.querySelector(element)
                : null;
    }
    function includeElement(elements, node) {
        return elements.includes((node.tagName || ``).toLowerCase());
    }
    function isHideElem(node) {
        return (getCSSProperty(node, `display`) === `none` ||
            getCSSProperty(node, `visibility`) === `hidden` ||
            +getCSSProperty(node, `opacity`) === 0 ||
            node.hidden);
    }
    function isCustomCardBlock(node) {
        const background = getCSSProperty(node, `background`);
        const backgroundReg = /rgba\([\s\S]+?0\)/gi;
        const borderReg = /(0px)|(none)/;
        const hasBackground = !backgroundReg.test(background) || background.includes(`gradient`);
        const hasNoBorder = [`Top`, `Left`, `Right`, `Bottom`].some((item) => borderReg.test(getCSSProperty(node, `border${item}`)));
        const { width, height } = getRect(node);
        const customCardBlock = !!(hasBackground &&
            (!hasNoBorder || getCSSProperty(node, `boxShadow`) !== `none`) &&
            width > 0 &&
            height > 0 &&
            width < 0.95 * innerWidth &&
            height < 0.3 * innerHeight);
        return customCardBlock;
    }
    function getRect(node) {
        const { top, left, width, height } = node.getBoundingClientRect();
        return { top, left, width, height };
    }
    function getPadding(node) {
        return {
            paddingTop: parseInt(getCSSProperty(node, `paddingTop`)),
            paddingLeft: parseInt(getCSSProperty(node, `paddingLeft`)),
            paddingBottom: parseInt(getCSSProperty(node, `paddingBottom`)),
            paddingRight: parseInt(getCSSProperty(node, `paddingRight`)),
        };
    }
    function createCommonClass(props) {
        const scriptId = `SkeletonScirpt-${random()}`;
        const { mediaQuery, injectSelector, destroy: destroyFunctionName, background, } = args;
        const inlineStyle = [
            `<style> ${mediaQuery ? `${mediaQuery} {` : ``} [${_}] {`,
        ];
        Object.entries(props).reduce((arr, [key, value]) => {
            arr.push(`${kebabCase(key)}: ${value};\n`);
            return arr;
        }, inlineStyle);
        const destroy = `function () {
        var parentElement = document
          .querySelector('#${scriptId}')
          .parentElement;
        try {
          parentElement.remove();
        } catch (error) {
          parentElement.parentElement.removeChild(parentElement);
        }
      }`;
        inlineStyle.push(`}
      ${mediaQuery
            ? `} ${mediaQuery} { [${__}] {
        top: 0%;
        left: 0%;
        width: 100%;
      } }`
            : `[${__}] {
        top: 0%;
        left: 0%;
        width: 100%;
      }`}

      @keyframes opacity {
        0% {
          opacity: 1;
        } 50% {
          opacity: .5;
        } 100% {
          opacity: 1;
        }
      }
      ${injectSelector
            ? `${mediaQuery ? `${mediaQuery} {` : ``}
        ${injectSelector} {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: ${+args.zIndex};
          background: ${background};
        }
      ${mediaQuery ? `}` : ``}`
            : ``}
    </style>
    <script id='${scriptId}'>
    /**
     * 默认于DOMContentLoaded事件中移除骨架屏相关代码,
     * 如果提供了destroy参数，则将以destroy命名的函数注入到window中，供用户自行移除
     */

    ${destroyFunctionName
            ? `window.${destroyFunctionName} = ${destroy}`
            : `window.addEventListener('DOMContentLoaded', ${destroy})`}
    </script>`);
        blocks.push(inlineStyle.join(``).replace(/\n/g, ``));
    }
    function parseParams(args = []) {
        const params = {};
        args.forEach((arg) => {
            const index = arg.indexOf(`:`);
            const [, name, type] = arg.slice(0, index).split(`-`);
            const val = arg.slice(index + 1);
            params[name] =
                type === `function`
                    ? eval(`(${val})`)
                    : type === `object`
                        ? JSON.parse(val)
                        : val;
        });
        return params;
    }
    class DrawPageframe {
        constructor(opts) {
            this.rootNode = getRootNode(opts.rootNode) || document.body;
            this.offsetTop = opts.offsetTop || 0;
            this.includeElement = opts.includeElement;
            this.init = opts.init;
            this.originStyle = {};
            return this instanceof DrawPageframe ? this : new DrawPageframe(opts);
        }
        resetDOM() {
            const { init, offsetTop, withHeader } = this;
            const { body } = document;
            init && init();
            this.originStyle = {
                scrollTop: window.scrollY,
                bodyOverflow: getCSSProperty(body, `overflow`),
            };
            window.scrollTo(0, offsetTop);
            body.style.cssText += `overflow:hidden!important;`;
            drawBlock({
                height: 100,
                zIndex: String(+args.zIndex + 1),
                background: args.background,
                subClass: true,
            });
            withHeader();
        }
        inHeader(node) {
            try {
                let { header: { height }, } = args;
                height = parseInt(height);
                const { top } = getRect(node);
                return height ? top <= height : void 0;
            }
            catch (error) {
                return void 0;
            }
        }
        withHeader() {
            if (args.header) {
                const { height, background } = args.header;
                height &&
                    drawBlock({
                        height: getPercentage(parseInt(height), innerHeight),
                        zIndex: String(+args.zIndex + 2),
                        background: background || args.skeletonColor,
                        subClass: true,
                    });
            }
        }
        showBlocks() {
            if (blocks.length) {
                const { body } = document;
                const blocksHTML = blocks.join(``);
                const div = document.createElement(`div`);
                div.innerHTML = blocksHTML;
                body.appendChild(div);
                window.scrollTo(0, this.originStyle.scrollTop);
                document.body.style.overflow = this.originStyle.bodyOverflow;
                this.filterOverlap();
                return div.innerHTML;
            }
        }
        startDraw() {
            this.resetDOM();
            const nodes = this.rootNode.childNodes;
            const deepFindNode = (nodes) => {
                var _a, _b, _c, _d, _e;
                if (nodes.length) {
                    for (let i = 0, length = nodes.length; i < length; i++) {
                        const node = nodes[i];
                        if (isHideElem(node) ||
                            (getType(this.includeElement) === `function` &&
                                this.includeElement(node, drawBlock) === false)) {
                            continue;
                        }
                        const childNodes = node.childNodes;
                        let hasChildText = false;
                        const background = getCSSProperty(node, `backgroundImage`);
                        let backgroundHasUrl = background.match(/url\(.+?\)/);
                        backgroundHasUrl = backgroundHasUrl && backgroundHasUrl.length;
                        for (let j = 0, length = childNodes.length; j < length; j++) {
                            if (((_a = childNodes[j]) === null || _a === void 0 ? void 0 : _a.nodeType) === 3 && ((_d = (_c = (_b = childNodes[j]) === null || _b === void 0 ? void 0 : _b.textContent) === null || _c === void 0 ? void 0 : _c.trim()) === null || _d === void 0 ? void 0 : _d.length)) {
                                hasChildText = true;
                                break;
                            }
                        }
                        if ((includeElement(ELEMENTS, node) ||
                            backgroundHasUrl ||
                            (node.nodeType === 3 && ((_e = node.textContent) === null || _e === void 0 ? void 0 : _e.trim().length)) ||
                            hasChildText ||
                            isCustomCardBlock(node)) &&
                            !this.inHeader(node)) {
                            const { top, left, width, height } = getRect(node);
                            if (width > 0 &&
                                height > 0 &&
                                left >= 0 &&
                                left < innerWidth &&
                                innerHeight - top >= 20 &&
                                top >= 0) {
                                let { paddingTop, paddingLeft, paddingBottom, paddingRight, } = getPadding(node);
                                if (!getCSSProperty(node, `border`).startsWith(`0px`)) {
                                    paddingTop = paddingLeft = paddingBottom = paddingRight = 0;
                                }
                                drawBlock({
                                    width: getPercentage(width - paddingLeft - paddingRight, innerWidth),
                                    height: getPercentage(height - paddingTop - paddingBottom, innerHeight),
                                    top: getPercentage(top + paddingTop, innerHeight),
                                    left: getPercentage(left + paddingLeft, innerWidth),
                                    radius: getCSSProperty(node, 'borderRadius'),
                                });
                            }
                        }
                        else if (childNodes && childNodes.length) {
                            !hasChildText &&
                                deepFindNode(childNodes);
                        }
                    }
                }
            };
            deepFindNode(nodes);
            return this.showBlocks();
        }
        /**
         * Filter overlaps
         */
        filterOverlap() {
            const $$ = (selector) => Array.from(document.querySelectorAll(selector));
            const arr = $$(`[${_}]`)
                .slice(1)
                .map((elem) => {
                const { top, right, bottom, left } = elem.getBoundingClientRect();
                return { top, right, bottom, left, elem };
            });
            const _arr = [];
            arr.forEach(({ top, right, bottom, left }) => {
                const __arr = arr
                    .slice() // copy
                    .filter(({ top: _top, right: _right, bottom: _bottom, left: _left }) => {
                    return (top < _top && right > _right && bottom > _bottom && left < _left);
                });
                __arr.length && _arr.push(...__arr);
            });
            // remove
            _arr.forEach(({ elem }) => elem.remove());
        }
    }
    return new Promise((resolve, reject) => setTimeout(() => {
        try {
            const { init, rootNode, includeElement } = args;
            const html = new DrawPageframe({
                init,
                rootNode,
                includeElement,
            }).startDraw();
            resolve({ html, args, params, blocks });
        }
        catch (e) {
            reject(e);
        }
    }, 1000));
}
exports.default = evalDOM;
