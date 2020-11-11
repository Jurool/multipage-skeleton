/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

/**
 * @param {string} _path
 */
const resolve = (_path) => path.resolve(__dirname, _path)

module.exports = [
  {
    headless: false,
    url: 'https://www.baidu.com/',
    output: {
      filepath: resolve(`./index.html`),
      injectSelector: '.test-wrapper-pc',
    },
    device: `pc`,
    mediaQuery: `@media only screen and (min-width: 1440px)`,
    background: '#000',
    skeletonColor: `#fff`,
    destroy: `__destroyPc__`,
    animation: 'opacity 1.5s linear infinite;',
  },
  {
    headless: true,
    url: 'https://www.baidu.com/',
    output: {
      filepath: resolve(`./index.html`),
      injectSelector: '.test-wrapper-m',
    },
    mediaQuery: `@media only screen and (max-width: 768px)`,
    background: '#000',
    skeletonColor: `#fff`,
    destroy: `__destroyM__`,
    animation: 'opacity 1.5s linear infinite;',
  },
  {
    headless: true,
    url: 'https://www.baidu.com/',
    output: {
      filepath: resolve(`./index-2.html`),
      injectSelector: '.test-wrapper-pc-2',
    },
    background: '#000',
    device: `pc`,
    skeletonColor: `#fff`,
    destroy: `__destroy__`,
    animation: 'opacity 1.5s linear infinite;',
  },
  {
    headless: true,
    url: 'https://www.baidu.com/',
    output: {
      filepath: resolve(`./index-3.html`),
      injectSelector: '.test-wrapper-m-2',
    },
    // device: `mobile`,
    device: `iPhone 6`,
    background: '#fff',
    skeletonColor: `#eee`,
    // destroy: `__destroy__`,
    animation: 'opacity 1.5s linear infinite;',
  },
]
