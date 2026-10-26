import { describe, expect, it } from 'vitest'
import { buildCharacterDefault, MAX_SCALE, MIN_SCALE } from './build-character'
import { createPartFactory } from './part-factory'
import { createSeededRng } from './seeded-rng'

describe('createSeededRng', () => {
  it('is deterministic per seed', () => {
    const a = createSeededRng('p1')
    const b = createSeededRng('p1')
    expect(Array.from({ length: 10 }, () => a.next())).toEqual(Array.from({ length: 10 }, () => b.next()))
  })
  it('stays in [0,1)', () => {
    const r = createSeededRng('range')
    for (let i = 0; i < 1000; i++) {
      const n = r.next()
      expect(n).toBeGreaterThanOrEqual(0)
      expect(n).toBeLessThan(1)
    }
  })
})

describe('createPartFactory', () => {
  it('picks from variants using rng', () => {
    const f = createPartFactory('x', ['a', 'b'])
    expect(f.pick({ next: () => 0 })).toBe('a')
    expect(f.pick({ next: () => 0.99 })).toBe('b')
  })
})

describe('buildCharacterDefault', () => {
  it('is deterministic', () => {
    expect(buildCharacterDefault('proj')).toEqual(buildCharacterDefault('proj'))
  })
  it('overrides scale', () => {
    expect(buildCharacterDefault('proj', { scale: 2 }).scale).toBe(2)
  })
  it('derives bounded scale', () => {
    for (let i = 0; i < 100; i++) {
      const s = buildCharacterDefault(`s${i}`).scale
      expect(s).toBeGreaterThanOrEqual(MIN_SCALE)
      expect(s).toBeLessThanOrEqual(MAX_SCALE)
    }
  })
  it('varies across seeds', () => {
    const specs = new Set(Array.from({ length: 30 }, (_, i) => JSON.stringify(buildCharacterDefault(`seed-${i}`))))
    expect(specs.size).toBeGreaterThan(25)
  })
})
