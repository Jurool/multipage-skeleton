/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Devices, SkeletonConfig } from './type'
import puppeteer from 'puppeteer'

const { devices } = puppeteer
import { log, getType } from './utils'

const _devices_: Devices = {
  mobile: [
    375,
    667,
    'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
  ],
  ipad: [
    1024,
    1366,
    'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1',
  ],
  pc: [
    1440,
    1300,
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36',
  ],
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
  })

  async function openPage(url: string, extraHTTPHeaders?: string) {
    const page = await browser.newPage()

    try {
      const defaultDevices = [`mobile`, `ipad`, `pc`]
      if (userAgent && viewport) {
        page.setUserAgent(userAgent)
        page.setViewport(viewport)
      } else if (defaultDevices.includes(device as string)) {
        const deviceSet = _devices_[device as keyof Devices]
        page.setUserAgent(deviceSet[2])
        page.setViewport({ width: deviceSet[0], height: deviceSet[1] })
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
