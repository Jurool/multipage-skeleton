import { SkeletonConfig } from './index.d'
import Skeleton from './skeleton'

/**
 * generate skeleton screen code
 * @param {{}[]} configs
 */
export = async function skeleton(configs: SkeletonConfig[]): Promise<void> {
  if (!Array.isArray(configs)) {
    throw new Error(`\`skeleton.config.js\` must export an array.`)
  }

  for (const config of configs) {
    await new Skeleton(config).start()
  }

  process.exit(0)
}
