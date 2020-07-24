/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import chalk from 'chalk'
import ora, { Color } from 'ora'
import emoji from 'node-emoji'

const appName = `skeleton`

const likeLinux = process.env.TERM === `cygwin` || process.platform !== `win32`

const parseParams = {
  prefixName: `${appName}-`,
  create(args: { [key: string]: any }) {
    if (getType(args) !== `object`) return
    return Object.keys(args).map((item) => {
      const { type, value } = args[item]
      return `${this.prefixName + item}-${type}:${value}`
    })
  },
}

function calcText(str: string): string {
  if (str.length > 40) {
    return (
      str.slice(0, 15) + `...` + (str.match(/([\/\\][^\/\\]+)$/) || [``, ``])[1]
    )
  }
  return str
}

function log(...args: Parameters<Console['log']>) {
  console.log(...args)
}

log.error = function (msg: string, exit?: unknown) {
  log(chalk.gray(`[${appName}]:`, chalk.red(msg)))
  exit && process.exit(0)
}

log.warn = function (msg: string) {
  log(chalk.yellow(msg))
}

log.info = function (msg: string) {
  log(chalk.greenBright(msg))
}

function getType(obj: unknown) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}

function Spinner(color: string) {
  const opt = likeLinux
    ? {
        spinner: {
          interval: 125,
          frames: [`∙∙∙`, `●∙∙`, `∙●∙`, `∙∙●`, `∙∙∙`],
        },
      }
    : ``
  const spinner = ora(opt).start()
  spinner.color = color as Color
  return spinner
}

const emoji_get = emoji.get.bind(emoji)

emoji.get = function (...args: [string]) {
  return !likeLinux ? `·` : emoji_get.apply(emoji, args)
}

export { log, calcText, getType, Spinner, emoji, parseParams }
