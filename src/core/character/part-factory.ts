import type { Rng } from './rng'

export interface PartFactory<T> {
  readonly kind: string
  readonly variants: readonly T[]
  pick(rng: Rng): T
}

export const createPartFactory = <T>(kind: string, variants: readonly T[]): PartFactory<T> => {
  if (variants.length === 0) throw new Error(`PartFactory "${kind}" needs at least one variant`)
  return {
    kind,
    variants,
    pick: (rng) => variants[Math.floor(rng.next() * variants.length)] as T,
  }
}
