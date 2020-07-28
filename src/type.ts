import { Viewport } from 'puppeteer'

export interface SkeletonConfig {
  /** URL address that can be accessed */
  url: string

  /**
   * Whether to run browser in headless mode.
   * @default true unless the devtools option is true.
   */
  headless?: boolean

  output?: {
    /** Save path of skeleton screen code */
    filepath?: string

    /** Container for inserting skeleton screen */
    injectSelector?: string
  }

  header?:
    | {
        /** The height of the subject header */
        height?: string | number

        /** The background of the subject header */
        background?: string
      }
    | ``

  /**
   * background color
   * @default
   * default: #ecf0f2
   */
  background?: string

  /**
   * skeleton color
   * @default
   * default: #eee
   */
  skeletonColor?: string

  /** animation */
  animation?: string

  /**
   * Generate a skeleton screen for a module
   * @deprecated
   */
  rootNode?: HTMLElement | ``

  /** device */
  device?: string

  /** http headers */
  extraHTTPHeaders?: string

  /** init function */
  init?: (...args: unknown[]) => unknown

  /** Customize how a node is generated */
  includeElement?: (node: HTMLElement, draw: unknown) => boolean | void

  /** Custom write method */
  writePageStructure?: (html: string, filepath: string) => unknown

  /** The name of the method to destroy the skeleton screen code that will be injected into the window */
  destroy?: string | ``

  /** media query */
  mediaQuery?: string

  /**
   * userAgent.
   * `userAgent and viewport must be provided together`
   */
  userAgent?: string

  /**
   * viewport
   * `viewport and userAgent must be provided together`
   */
  viewport?: Viewport | ``
}

export interface ClassProps {
  position: string
  zIndex: string
  background: string
  animation?: string
}

export interface Attr {
  width?: string | number
  height?: string | number
  top?: string
  left?: string
  zIndex?: string
  background?: string
  radius?: string
  subClass?: boolean
}

type _Devices_ = `mobile` | `ipad` | `pc`

/**
 * In addition, three additional configurations of different sizes are provided
 * (it currently does not support configurations, and will be supported in the future)
```js
   {
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
```
 */
export type Devices = Record<_Devices_, [number, number, string]>
