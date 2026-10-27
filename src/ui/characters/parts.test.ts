import { describe, expect, it } from 'vitest'
import { accessoryFactory, bodyFactory, headFactory, outfitFactory } from '@/core/character'
import { accessoryShapes } from './Accessory'
import { bodyShapes } from './Body'
import { headShapes } from './Head'
import { outfitShapes } from './Outfit'
import type { PartMap } from './types'

const cases: [string, readonly { id: string }[], PartMap][] = [
  ['body', bodyFactory.variants, bodyShapes],
  ['head', headFactory.variants, headShapes],
  ['outfit', outfitFactory.variants, outfitShapes],
  ['accessory', accessoryFactory.variants, accessoryShapes],
]

describe('part renderers', () => {
  for (const [kind, variants, map] of cases)
    it(`has a renderer for every ${kind} variant and no extras`, () => {
      expect(Object.keys(map).sort()).toEqual(variants.map((v) => v.id).sort())
    })
})
