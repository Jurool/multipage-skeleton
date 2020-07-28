import path from 'path'

export default [
  {
    headless: true,
    url: 'http://localhost:8080/',
    output: {
      filepath: path.resolve(__dirname, './index.html'),
      injectSelector: '.test-wrapper-m',
    },
    mediaQuery: `@media only screen and (max-width: 768px)`,
    background: '#fff',
    skeletonColor: `#eee`,
    animation: 'opacity 1.5s linear infinite;',
  },
  {
    headless: true,
    url: 'https://www.baidu.com/',
    output: {
      filepath: path.resolve(__dirname, './index.html'),
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
