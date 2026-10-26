import { createPartFactory } from './part-factory'
import type { Accessory, Body, Head, Outfit, Palette } from './types'

const part = <K extends string>(kind: K, names: readonly string[]) =>
  names.map((id) => ({ id, kind }) as const)

export const bodyFactory = createPartFactory<Body>(
  'body',
  part('body', ['slim', 'round', 'tall', 'stout', 'lanky', 'broad']),
)
export const headFactory = createPartFactory<Head>(
  'head',
  part('head', ['oval', 'round', 'square', 'long', 'heart', 'bean', 'tiny']),
)
export const outfitFactory = createPartFactory<Outfit>(
  'outfit',
  part('outfit', ['sweater', 'blazer', 'hoodie', 'dress', 'overalls', 'coat']),
)
export const accessoryFactory = createPartFactory<Accessory>(
  'accessory',
  part('accessory', ['none', 'glasses', 'hat', 'scarf', 'headphones', 'bowtie']),
)

const palette = (id: string, skin: string, primary: string, secondary: string, accent: string): Palette => ({
  id,
  kind: 'palette',
  skin,
  primary,
  secondary,
  accent,
})

export const paletteFactory = createPartFactory<Palette>('palette', [
  palette('warm', 'paper-1', 'ink-1', 'paper-2', 'accent-1'),
  palette('cool', 'paper-2', 'ink-2', 'paper-3', 'accent-2'),
  palette('sunny', 'paper-1', 'accent-3', 'ink-1', 'accent-1'),
  palette('moss', 'paper-3', 'accent-4', 'paper-1', 'ink-2'),
  palette('dusk', 'paper-2', 'ink-3', 'accent-2', 'accent-3'),
  palette('berry', 'paper-1', 'accent-5', 'paper-3', 'ink-1'),
])
