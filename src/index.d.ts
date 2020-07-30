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
   * skeleton code z-index
   * @default
   * 999
   */
  zIndex?: string | number

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

export default function skeleton(configs: SkeletonConfig[]): Promise<void>
