import type { PartFactory } from './part-factory'
import type { Rng } from './rng'
import { createSeededRng } from './seeded-rng'
import {
  accessoryFactory,
  bodyFactory,
  headFactory,
  outfitFactory,
  paletteFactory,
} from './registries'
import type { Accessory, Body, CharacterSpec, Head, Outfit, Palette } from './types'

export interface CharacterFactories {
  readonly body: PartFactory<Body>
  readonly head: PartFactory<Head>
  readonly outfit: PartFactory<Outfit>
  readonly accessory: PartFactory<Accessory>
  readonly palette: PartFactory<Palette>
}

export interface BuildOptions {
  readonly scale?: number
}

export const MIN_SCALE = 0.85
export const MAX_SCALE = 1.15

const seededScale = (rng: Rng): number => MIN_SCALE + rng.next() * (MAX_SCALE - MIN_SCALE)

export const buildCharacter = (
  deps: { readonly factories: CharacterFactories },
  seed: string,
  options: BuildOptions = {},
): CharacterSpec => {
  const { factories } = deps
  const rng = createSeededRng(seed)
  const body = factories.body.pick(rng)
  const head = factories.head.pick(rng)
  const outfit = factories.outfit.pick(rng)
  const accessory = factories.accessory.pick(rng)
  const palette = factories.palette.pick(rng)
  const derivedScale = seededScale(rng)
  return { body, head, outfit, accessory, palette, scale: options.scale ?? derivedScale }
}

export const defaultFactories: CharacterFactories = {
  body: bodyFactory,
  head: headFactory,
  outfit: outfitFactory,
  accessory: accessoryFactory,
  palette: paletteFactory,
}

export const buildCharacterDefault = (seed: string, options?: BuildOptions): CharacterSpec =>
  buildCharacter({ factories: defaultFactories }, seed, options)
