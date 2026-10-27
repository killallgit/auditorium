import { describe, expect, it } from 'vitest'
import { paletteFactory } from '@/core/character'
import { colorVar } from './color-roles'

describe('colorVar', () => {
  it('resolves every palette role to a token var', () => {
    for (const p of paletteFactory.variants)
      for (const r of [p.skin, p.primary, p.secondary, p.accent])
        expect(colorVar(r)).toBe(`var(--color-${r})`)
  })
  it('falls back to ink for unknown roles', () => {
    expect(colorVar('nope')).toBe('var(--color-ink-1)')
  })
})
