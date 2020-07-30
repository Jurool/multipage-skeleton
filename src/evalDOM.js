"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function evalDOM() {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    function kebabCase(str) {
        var hyphenateRE = /([^-])([A-Z])/g;
        return str.replace(hyphenateRE, '$1-$2').toLowerCase();
    }
    var random = function () { return Math.random().toString(16).slice(2); };
    var ELEMENTS = [
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
    var blocks = [];
    var innerWidth = window.innerWidth, innerHeight = window.innerHeight;
    var args = params;
    if (!args.length)
        args = [{}];
    var firstElem = args[0];
    // parse arguments
    if (args.length !== 1 || getType(firstElem) !== 'object') {
        args = parseParams(args);
    }
    // Skeleton screen DOM attributes
    var _a = ["skeleton-" + random(), "skeleton-" + random()], _ = _a[0], __ = _a[1];
    var classProps = {
        position: 'fixed',
        zIndex: args.zIndex,
        background: args.skeletonColor,
    };
    if (args.animation) {
        classProps.animation = args.animation;
    }
    createCommonClass(classProps);
    function drawBlock(_a) {
        var _b = _a === void 0 ? {} : _a, width = _b.width, height = _b.height, top = _b.top, left = _b.left, _c = _b.zIndex, zIndex = _c === void 0 ? String(+args.zIndex + 2) : _c, _d = _b.background, background = _d === void 0 ? args.skeletonColor : _d, radius = _b.radius, subClass = _b.subClass;
        var styles = ["height: " + height + "%"];
        if (!subClass) {
            styles.push("top: " + top + "%", "left: " + left + "%", "width: " + width + "%");
        }
        if (classProps.zIndex !== zIndex) {
            styles.push("z-index: " + zIndex);
        }
        if (classProps.background !== background) {
            styles.push("background: " + background);
        }
        radius && radius !== '0px' && styles.push("border-radius: " + radius);
        blocks.push("<div " + _ + " " + (subClass ? "" + __ : '') + " style=\"" + styles.join(';') + "\"></div>");
    }
    function getPercentage(molecular, denominator) {
        return parseFloat(String((molecular / denominator) * 100)).toFixed(3);
    }
    function getType(obj) {
        return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
    }
    function getCSSProperty(node, attr) {
        return (node.nodeType === 1 ? getComputedStyle(node)[attr] : "") || "";
    }
    function getRootNode(element) {
        if (!element)
            return null;
        return element instanceof HTMLElement
            ? element
            : getType(element) === "string"
                ? document.querySelector(element)
                : null;
    }
    function includeElement(elements, node) {
        return elements.includes((node.tagName || "").toLowerCase());
    }
    function isHideElem(node) {
        return (getCSSProperty(node, "display") === "none" ||
            getCSSProperty(node, "visibility") === "hidden" ||
            +getCSSProperty(node, "opacity") === 0 ||
            node.hidden);
    }
    function isCustomCardBlock(node) {
        var background = getCSSProperty(node, "background");
        var backgroundReg = /rgba\([\s\S]+?0\)/gi;
        var borderReg = /(0px)|(none)/;
        var hasBackground = !backgroundReg.test(background) || background.includes("gradient");
        var hasNoBorder = ["Top", "Left", "Right", "Bottom"].some(function (item) {
            return borderReg.test(getCSSProperty(node, "border" + item));
        });
        var _a = getRect(node), width = _a.width, height = _a.height;
        var customCardBlock = !!(hasBackground &&
            (!hasNoBorder || getCSSProperty(node, "boxShadow") !== "none") &&
            width > 0 &&
            height > 0 &&
            width < 0.95 * innerWidth &&
            height < 0.3 * innerHeight);
        return customCardBlock;
    }
    function getRect(node) {
        var _a = node.getBoundingClientRect(), top = _a.top, left = _a.left, width = _a.width, height = _a.height;
        return { top: top, left: left, width: width, height: height };
    }
    function getPadding(node) {
        return {
            paddingTop: parseInt(getCSSProperty(node, "paddingTop")),
            paddingLeft: parseInt(getCSSProperty(node, "paddingLeft")),
            paddingBottom: parseInt(getCSSProperty(node, "paddingBottom")),
            paddingRight: parseInt(getCSSProperty(node, "paddingRight")),
        };
    }
    function createCommonClass(props) {
        var scriptId = "SkeletonScirpt-" + random();
        var inlineStyle = ["<style> " + args.mediaQuery + " { [" + _ + "] {"];
        var mediaQuery = args.mediaQuery, injectSelector = args.injectSelector, destroyFunctionName = args.destroy, background = args.background;
        Object.entries(props).reduce(function (arr, _a) {
            var key = _a[0], value = _a[1];
            arr.push(kebabCase(key) + ": " + value + ";\n");
            return arr;
        }, inlineStyle);
        var destroy = "function () {\n        document\n          .querySelector('#" + scriptId + "')\n          .parentElement\n          .remove();\n      }";
        inlineStyle.push("}}\n      " + mediaQuery + " { [" + __ + "] {\n        top: 0%;\n        left: 0%;\n        width: 100%;\n      } }\n\n      @keyframes opacity {\n        0% {\n          opacity: 1;\n        } 50% {\n          opacity: .5;\n        } 100% {\n          opacity: 1;\n        }\n      }\n      " + (injectSelector
            ? mediaQuery + " {\n        " + injectSelector + " {\n          position: fixed;\n          top: 0;\n          right: 0;\n          bottom: 0;\n          left: 0;\n          z-index: " + +args.zIndex + ";\n          background: " + background + ";\n        }\n      }"
            : "") + "\n    </style>\n    <script id='" + scriptId + "'>\n    /**\n     * \u9ED8\u8BA4\u4E8EDOMContentLoaded\u4E8B\u4EF6\u4E2D\u79FB\u9664\u9AA8\u67B6\u5C4F\u76F8\u5173\u4EE3\u7801,\n     * \u5982\u679C\u63D0\u4F9B\u4E86destroy\u53C2\u6570\uFF0C\u5219\u5C06\u4EE5destroy\u547D\u540D\u7684\u51FD\u6570\u6CE8\u5165\u5230window\u4E2D\uFF0C\u4F9B\u7528\u6237\u81EA\u884C\u79FB\u9664\n     */\n\n    " + (destroyFunctionName
            ? "window." + destroyFunctionName + " = " + destroy
            : "window.addEventListener('DOMContentLoaded', " + destroy + ")") + "\n    </script>");
        blocks.push(inlineStyle.join("").replace(/\n/g, ""));
    }
    function parseParams(args) {
        if (args === void 0) { args = []; }
        var params = {};
        args.forEach(function (arg) {
            var index = arg.indexOf(":");
            var _a = arg.slice(0, index).split("-"), name = _a[1], type = _a[2];
            var val = arg.slice(index + 1);
            params[name] =
                type === "function"
                    ? eval("(" + val + ")")
                    : type === "object"
                        ? JSON.parse(val)
                        : val;
        });
        return params;
    }
    var DrawPageframe = /** @class */ (function () {
        function DrawPageframe(opts) {
            this.rootNode = getRootNode(opts.rootNode) || document.body;
            this.offsetTop = opts.offsetTop || 0;
            this.includeElement = opts.includeElement;
            this.init = opts.init;
            this.originStyle = {};
            return this instanceof DrawPageframe ? this : new DrawPageframe(opts);
        }
        DrawPageframe.prototype.resetDOM = function () {
            var _a = this, init = _a.init, offsetTop = _a.offsetTop, withHeader = _a.withHeader;
            var body = document.body;
            init && init();
            this.originStyle = {
                scrollTop: window.scrollY,
                bodyOverflow: getCSSProperty(body, "overflow"),
            };
            window.scrollTo(0, offsetTop);
            body.style.cssText += "overflow:hidden!important;";
            drawBlock({
                height: 100,
                zIndex: String(+args.zIndex + 1),
                background: args.background,
                subClass: true,
            });
            withHeader();
        };
        DrawPageframe.prototype.inHeader = function (node) {
            try {
                var height = args.header.height;
                height = parseInt(height);
                var top_1 = getRect(node).top;
                return height ? top_1 <= height : void 0;
            }
            catch (error) {
                return void 0;
            }
        };
        DrawPageframe.prototype.withHeader = function () {
            if (args.header) {
                var _a = args.header, height = _a.height, background = _a.background;
                height &&
                    drawBlock({
                        height: getPercentage(parseInt(height), innerHeight),
                        zIndex: String(+args.zIndex + 2),
                        background: background || args.skeletonColor,
                        subClass: true,
                    });
            }
        };
        DrawPageframe.prototype.showBlocks = function () {
            if (blocks.length) {
                var body = document.body;
                var blocksHTML = blocks.join("");
                var div = document.createElement("div");
                div.innerHTML = blocksHTML;
                body.appendChild(div);
                window.scrollTo(0, this.originStyle.scrollTop);
                document.body.style.overflow = this.originStyle.bodyOverflow;
                this.filterOverlap();
                return div.innerHTML;
            }
        };
        DrawPageframe.prototype.startDraw = function () {
            var _this = this;
            this.resetDOM();
            var nodes = this.rootNode.childNodes;
            var deepFindNode = function (nodes) {
                var _a, _b, _c, _d, _e;
                if (nodes.length) {
                    for (var i = 0, length_1 = nodes.length; i < length_1; i++) {
                        var node = nodes[i];
                        if (isHideElem(node) ||
                            (getType(_this.includeElement) === "function" &&
                                _this.includeElement(node, drawBlock) === false)) {
                            continue;
                        }
                        var childNodes = node.childNodes;
                        var hasChildText = false;
                        var background = getCSSProperty(node, "backgroundImage");
                        var backgroundHasUrl = background.match(/url\(.+?\)/);
                        backgroundHasUrl = backgroundHasUrl && backgroundHasUrl.length;
                        for (var j = 0, length_2 = childNodes.length; j < length_2; j++) {
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
                            !_this.inHeader(node)) {
                            var _f = getRect(node), top_2 = _f.top, left = _f.left, width = _f.width, height = _f.height;
                            if (width > 0 &&
                                height > 0 &&
                                left >= 0 &&
                                left < innerWidth &&
                                innerHeight - top_2 >= 20 &&
                                top_2 >= 0) {
                                var _g = getPadding(node), paddingTop = _g.paddingTop, paddingLeft = _g.paddingLeft, paddingBottom = _g.paddingBottom, paddingRight = _g.paddingRight;
                                if (!getCSSProperty(node, "border").startsWith("0px")) {
                                    paddingTop = paddingLeft = paddingBottom = paddingRight = 0;
                                }
                                drawBlock({
                                    width: getPercentage(width - paddingLeft - paddingRight, innerWidth),
                                    height: getPercentage(height - paddingTop - paddingBottom, innerHeight),
                                    top: getPercentage(top_2 + paddingTop, innerHeight),
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
        };
        /**
         * Filter overlaps
         */
        DrawPageframe.prototype.filterOverlap = function () {
            var $$ = function (selector) {
                return Array.from(document.querySelectorAll(selector));
            };
            var arr = $$("[" + _ + "]")
                .slice(1)
                .map(function (elem) {
                var _a = elem.getBoundingClientRect(), top = _a.top, right = _a.right, bottom = _a.bottom, left = _a.left;
                return { top: top, right: right, bottom: bottom, left: left, elem: elem };
            });
            var _arr = [];
            arr.forEach(function (_a) {
                var top = _a.top, right = _a.right, bottom = _a.bottom, left = _a.left;
                var __arr = arr
                    .slice() // copy
                    .filter(function (_a) {
                    var _top = _a.top, _right = _a.right, _bottom = _a.bottom, _left = _a.left;
                    return (top < _top && right > _right && bottom > _bottom && left < _left);
                });
                __arr.length && _arr.push.apply(_arr, __arr);
            });
            // remove
            _arr.forEach(function (_a) {
                var elem = _a.elem;
                return elem.remove();
            });
        };
        return DrawPageframe;
    }());
    return new Promise(function (resolve, reject) {
        return setTimeout(function () {
            try {
                var init = args.init, rootNode = args.rootNode, includeElement_1 = args.includeElement;
                var html = new DrawPageframe({
                    init: init,
                    rootNode: rootNode,
                    includeElement: includeElement_1,
                }).startDraw();
                resolve({ html: html, args: args, params: params, blocks: blocks });
            }
            catch (e) {
                reject(e);
            }
        }, 1000);
    });
}
exports.default = evalDOM;
