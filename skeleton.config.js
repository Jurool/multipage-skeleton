const path = require('path')
module.exports = [
  {
    headless: true,
    url: 'https://www.baidu.com/',
    output: {
      filepath: './examples/index.html',
      injectSelector: '.test-wrapper-m',
    },
    mediaQuery: `@media only screen and (max-width: 768px)`,
    background: '#eee',
    animation: 'opacity 1.5s linear infinite;',
  },
  {
    headless: true,
    url: 'https://www.baidu.com/',
    output: {
      filepath: path.resolve(__dirname, './examples/index.html'),
      injectSelector: '.test-wrapper-pc',
    },
    device: 'pc',
    mediaQuery: '@media only screen and (min-width: 1025px)',
    background: '#eee',
    destroy: '__destroy__',
    animation: 'opacity 1.5s linear infinite;',
  },
]
