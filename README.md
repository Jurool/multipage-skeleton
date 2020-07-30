# Multi-page skeleton screen

base on [dps](https://github.com/famanoder/dps)

# Usage

### install

```
yarn add multipage-skeleton -D
// or
npm i multipage-skeleton -D
```

or

```
yarn global add multipage-skeleton
// or
npm i multipage-skeleton -g
```

### via skeleton.config.js

Create skeleton.config.js in the root directory of the project, the file will export the following configuration

```js
const path = require(`path`)

module.exports = [
  {
    // puppeteer config.headless
    headless: true,
    // URL address that can be accessed
    url: `http://localhost:8080/`,
    output: {
      // Save path of skeleton screen code
      filepath: path.resolve(__dirname, `./index.html`),
      // Container for inserting skeleton screen code
      injectSelector: `.test-wrapper-m`,
    },
    // default device
    device: `iPhone 6`,
    // mediaQuery
    mediaQuery: `@media only screen and (max-width: 768px)`,
    // background color
    background: '#fff',
    // skeleton color
    skeletonColor: `#eee`,
    // animation
    animation: `opacity 1.5s linear infinite;`,
  },
  {
    headless: true,
    url: `https://www.baidu.com/`,
    output: {
      filepath: `path/to/file.html`,
      injectSelector: `.test-wrapper-pc`,
    },
    device: `pc`,
    // userAgent
    // userAgent and viewport must be provided together
    userAgent: `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36`,
    // viewport
    // viewport and userAgent must be provided together
    viewport: {
      // width
      width: 1440,
      // height
      height: 1300,
    },
    mediaQuery: `@media only screen and (min-width: 1440px)`,
    background: '#000',
    skeletonColor: `#fff`,
    // The name of the method injected into the window to destroy the skeleton screen code
    // If not provided, it will be removed in the DOMContentLoaded event
    destroy: `__destroy__`,
    animation: `opacity 1.5s linear infinite;`,
  },
]
```

then

```
npx skeleton start

// If you installed it globally
skeleton start
```

### or

```js
// import
const skeleton = require(`multipage-skeleton`)

// run
skeleton(parameter)
```

The parameter of the skeleton screen are like skeleton.config.js.

Detailed configuration can refer to [index.d.ts](./src/index.d.ts)

# Tip

Note that if your previous version is lower than 1.2.2, you need to update the configuration after upgrading the version. Change the original `background` property to the `skeletonColor` property to make it more semantic and easy to understand.
