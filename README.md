# Multi-page skeleton screen

base on [dps](https://github.com/famanoder/dps)

# Usage

### via skeleton.config.js

Create skeleton.config.js in the root directory of the project, the file will export the following configuration

```js
const path = require(`path`)

module.exports = [
  {
    headless: true, // puppeteer config.headless
    url: `http://localhost:8080/`, // URL address that can be accessed
    output: {
      filepath: path.resolve(__dirname, `./index.html`), // Save path of skeleton screen code
      injectSelector: `.test-wrapper-m`, // Container for inserting skeleton screen code
    },
    device: `iPhone 6`, // default device
    mediaQuery: `@media only screen and (max-width: 768px)`, // mediaQuery
    background: `#eee`, // background color
    animation: `opacity 1.5s linear infinite;`, // animation
  },
  {
    headless: true,
    url: `https://www.baidu.com/`,
    output: {
      filepath: `path/to/file.html`,
      injectSelector: `.test-wrapper-pc`,
    },
    device: `pc`,
    mediaQuery: `@media only screen and (min-width: 1440px)`,
    background: `#eee`,
    // The function of destroying the skeleton screen injected into the window
    // If not provided, it will be removed in the DOMContentLoaded event
    destroy: `__destroy__`,
    animation: `opacity 1.5s linear infinite;`,
  },
]
```

### or

```js
// import
const skeleton = require(`multipage-skeleton`)

// run
skeleton(parameter)
```

The parameters of the skeleton screen are like skeleton.config.js.

Detailed configuration can refer to [type.ts](./src/type.ts)
