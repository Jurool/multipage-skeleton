/* eslint-disable no-empty-function */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Page, EvaluateFn, SerializableOrJSHandle } from 'puppeteer'
import { SkeletonConfig } from './type'
import evalScripts from './evalDOM'
import { log, getType, Spinner, calcText, parseParams } from './utils'

import fs from 'fs'
import path from 'path'
import cheerio from 'cheerio'
import ppteer from './ppteer'
import defaultHtml from './default.html'

const currentDirectory = process.cwd()

class Skeleton {
  url: SkeletonConfig['url']
  filepath: string
  injectSelector: string
  background: SkeletonConfig['background']
  skeletonColor: SkeletonConfig['skeletonColor']
  animation: SkeletonConfig['animation']
  rootNode: SkeletonConfig['rootNode']
  header: SkeletonConfig['header']
  device: SkeletonConfig['device']
  destroy: SkeletonConfig['destroy']
  mediaQuery: SkeletonConfig['mediaQuery']
  userAgent: SkeletonConfig['userAgent']
  viewport: SkeletonConfig['viewport']
  headless: SkeletonConfig['headless']
  extraHTTPHeaders: SkeletonConfig['extraHTTPHeaders']
  writePageStructure: SkeletonConfig['writePageStructure']
  includeElement: SkeletonConfig['includeElement']
  init: SkeletonConfig['init']

  constructor(
    {
      url,
      output,
      background = `#ecf0f2`,
      skeletonColor = `#eee`,
      animation = ``,
      rootNode = ``,
      header = ``,
      device = `iPhone 6`,
      destroy = ``,
      mediaQuery = ``,
      userAgent = ``,
      viewport = ``,
      headless,
      extraHTTPHeaders,
      writePageStructure,
      includeElement,
      init,
    }: SkeletonConfig = {} as SkeletonConfig
  ) {
    let filepath =
      !output?.filepath || path.isAbsolute(output?.filepath)
        ? output?.filepath
        : path.join(currentDirectory, output?.filepath)

    this.url = url
    this.filepath = filepath || ``
    this.injectSelector = output?.injectSelector || 'body'
    this.background = background
    this.skeletonColor = skeletonColor
    this.animation = animation
    this.rootNode = rootNode
    this.header = header
    this.device = device
    this.destroy = destroy
    this.mediaQuery = mediaQuery
    this.userAgent = userAgent
    this.viewport = viewport
    this.headless = headless
    this.extraHTTPHeaders = extraHTTPHeaders
    this.writePageStructure = writePageStructure
    this.includeElement = includeElement || function () {}
    this.init = init || function () {}

    if (this.headless === undefined) this.headless = true

    if (!url) {
      log.error(`please provide entry url !`, 1)
    }

    if (header && getType(header) !== `object`) {
      log.error(`[header] should be an object !`, 1)
    }

    if (filepath) {
      if (!fs.existsSync(filepath)) {
        log.error(
          '[output.filepath:404] please provide the output filepath !',
          1
        )
      } else {
        const fileStat = fs.statSync(filepath)
        if (fileStat.isDirectory()) {
          filepath = path.join(filepath, 'index.html')
          fs.writeFileSync(filepath, defaultHtml)
          this.filepath = filepath
        }
      }
    }
  }

  async generateSkeletonHTML(page: Page): Promise<string> {
    let html = ``

    try {
      const {
        init,
        includeElement,
        background,
        skeletonColor,
        animation,
        rootNode,
        header,
        injectSelector,
        mediaQuery,
        device,
        destroy,
      } = this

      const args = parseParams.create({
        init: {
          type: 'function',
          value: init?.toString(),
        },
        includeElement: {
          type: 'function',
          value: includeElement?.toString(),
        },
        background: {
          type: 'string',
          value: background,
        },
        skeletonColor: {
          type: 'string',
          value: skeletonColor,
        },
        animation: {
          type: 'string',
          value: animation,
        },
        rootNode: {
          type: 'string',
          value: rootNode,
        },
        header: {
          type: 'object',
          value: JSON.stringify(header),
        },
        injectSelector: {
          type: `string`,
          value: injectSelector,
        },
        mediaQuery: {
          type: 'string',
          value: mediaQuery,
        },
        device: {
          type: 'string',
          value: device,
        },
        destroy: {
          type: 'string',
          value: destroy,
        },
      })

      args?.unshift((evalScripts as unknown) as string)

      const { html: _html } = await page.evaluate(
        ...(args as [
          EvaluateFn<typeof evalScripts>,
          ...SerializableOrJSHandle[]
        ])
      )

      html = _html
    } catch (e) {
      log(`\n`, `error: `)
      log.error(`\n[page.evaluate] ${e.message}`)
    }

    return html
  }

  writeToFilepath(filepath: string, html: string): void {
    const fileHTML = fs.readFileSync(filepath, {
      encoding: `utf-8`,
    })

    const $ = cheerio.load(fileHTML, {
      decodeEntities: false,
    })

    /** this.injectSelector's outerHTML */
    const prevOuterHTML = $.html(this.injectSelector)

    // insert this.injectSelector's innerHTML
    $(this.injectSelector).html(html)

    /** OuterHTML after replacement */
    const currentOuterHTML = $.html(this.injectSelector)

    fs.writeFileSync(
      filepath,
      fileHTML.replace(prevOuterHTML, currentOuterHTML)
    )
  }

  async start(): Promise<string> {
    const {
      filepath,
      url: pageUrl,
      device,
      headless,
      userAgent,
      viewport,
    } = this
    const spinner = Spinner(`magentaBright`)

    spinner.text = `启动浏览器...`

    const browser = await ppteer({
      device,
      headless,
      userAgent,
      viewport,
    })

    spinner.text = `正在打开页面：${pageUrl}...`
    const page = await browser.openPage(pageUrl, this.extraHTTPHeaders)

    spinner.text = `正在生成骨架屏代码...`
    const html = await this.generateSkeletonHTML(page)
    const userWrite = getType(this.writePageStructure) === `function`

    userWrite && this.writePageStructure?.(html, filepath)

    filepath && this.writeToFilepath(filepath, html)

    if (!userWrite && !filepath) {
      const defaultPage = path.join(currentDirectory, `index.html`)

      fs.writeFileSync(defaultPage, defaultHtml)
      this.writeToFilepath(defaultPage, html)

      this.filepath = defaultPage

      spinner.clear()

      log.warn(`\nskeleton has created in a default page: ${defaultPage}`)
    }

    spinner
      .clear()
      .succeed(
        `skeleton screen has created and output to ${calcText(this.filepath)}`
      )

    if (this.headless) {
      await browser.browser.close()
    }

    return Promise.resolve(`successs`)
  }
}

export default Skeleton
