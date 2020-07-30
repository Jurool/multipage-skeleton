/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

/**
 * @param {string} _path
 */
const resolve = (_path) => path.resolve(__dirname, _path)

module.exports = [
  {
    headless: true,
    url: 'http://localhost:8080/',
    output: {
      filepath: resolve(`./index.html`),
      injectSelector: '.test-wrapper-m',
    },
    mediaQuery: `@media only screen and (max-width: 768px)`,
    background: '#fff',
    skeletonColor: `#eee`,
    animation: 'opacity 1.5s linear infinite;',
  },
  {
    headless: false,
    url: 'https://www.baidu.com/',
    output: {
      filepath: resolve(`./index.html`),
      injectSelector: '.test-wrapper-pc',
    },
    device: `pc`,
    mediaQuery: `@media only screen and (min-width: 1025px)`,
    background: '#000',
    skeletonColor: `#fff`,
    destroy: `__destroy__`,
    animation: 'opacity 1.5s linear infinite;',
  },
]
