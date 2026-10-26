import type { Rng } from './rng'

/** FNV-1a string hash to a 32-bit unsigned integer. */
const hashSeed = (seed: string): number => {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/** Seeded mulberry32 generator; same seed yields the same sequence. */
export const createSeededRng = (seed: string): Rng => {
  let state = hashSeed(seed)
  return {
    next: () => {
      state = (state + 0x6d2b79f5) >>> 0
      let t = state
      t = Math.imul(t ^ (t >>> 15), t | 1)
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    },
  }
}
