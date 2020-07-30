/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { SkeletonConfig } from './index.d'
import puppeteer from 'puppeteer'

const { devices } = puppeteer
import { log, getType } from './utils'

const extraDefaultDevices = {
  mobile: {
    viewport: { width: 375, height: 667 },
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
  },
  ipad: {
    viewport: { width: 1024, height: 1366 },
    userAgent:
      'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1',
  },
  pc: {
    viewport: { width: 1440, height: 1300 },
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36',
  },
}

export default async (
  {
    device,
    headless = true,
    userAgent,
    viewport,
  }: {
    device: SkeletonConfig['device']
    headless?: boolean
    userAgent?: string
    viewport?: SkeletonConfig['viewport']
  } = {} as {
    device: string
    headless: boolean
  }
) => {
  const browser = await puppeteer.launch({
    headless,
    ...(headless ? {} : { args: ['--no-sandbox'] }),
  })

  async function openPage(url: string, extraHTTPHeaders?: string) {
    const page = await browser.newPage()

    try {
      const defaultDevices = Object.keys(extraDefaultDevices)
      if (userAgent && viewport) {
        page.setUserAgent(userAgent)
        page.setViewport(viewport)
      } else if (device && defaultDevices.includes(device)) {
        const {
          userAgent: _userAgent,
          viewport: _viewport,
        } = extraDefaultDevices[device as keyof typeof extraDefaultDevices]

        page.setUserAgent(_userAgent)
        page.setViewport(_viewport)
      } else if (typeof device === `string`) {
        const _device = devices[device]
        await page.emulate(_device)
      }

      if (extraHTTPHeaders && getType(extraHTTPHeaders) === `object`) {
        await page.setExtraHTTPHeaders(
          (new Map(Object.entries(extraHTTPHeaders)) as unknown) as Record<
            string,
            string
          >
        )
      }
      await page.goto(url, {
        timeout: 2 * 60 * 1000,
        waitUntil: `networkidle0`,
      })
    } catch (e) {
      console.log(`\n`, `error: `)
      log.error(e.message)
    }
    return page
  }
  return {
    browser,
    openPage,
  }
}
