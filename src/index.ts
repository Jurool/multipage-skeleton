import { SkeletonConfig } from './type'
import Skeleton from './skeleton'

/**
 * generate skeleton screen code
 * @param {{}[]} configs
 */
export default async function writeSkeleton(
  configs: SkeletonConfig[]
): Promise<void> {
  if (!Array.isArray(configs)) {
    throw new Error(`\`skeleton.config.js\` must export an array.`)
  }

  for (const config of configs) {
    await new Skeleton(config).start()
  }

  process.exit(0)
}
