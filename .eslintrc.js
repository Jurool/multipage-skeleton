module.exports = {
  ignorePatterns: ['src/common/libs'],
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    `plugin:@typescript-eslint/recommended`,
    `prettier/@typescript-eslint`,
    `plugin:prettier/recommended`,
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
  plugins: [`prettier`],
  rules: {
    eqeqeq: 1,
    'linebreak-style': ['error', 'unix'],
    'no-undef': 1,
    'no-var': [`error`],
    'prettier/prettier': `error`,
    'no-unreachable': 1,
    'dot-notation': 'error',
    'no-empty-pattern': 'error',
    'no-empty-function': 'error',
  },
}
