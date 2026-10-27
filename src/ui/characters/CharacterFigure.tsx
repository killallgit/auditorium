import type { CharacterSpec } from '@/core/character'
import { colorVar, INK } from '../theme/color-roles'
import { accessoryShapes } from './Accessory'
import { bodyShapes } from './Body'
import { headShapes } from './Head'
import { outfitShapes } from './Outfit'
import { VIEW_BOX, type Fills, type PartMap } from './types'

const fillsFor = (spec: CharacterSpec, silhouette: boolean): Fills => {
  if (silhouette) {
    const ink = colorVar(INK)
    return { skin: ink, primary: ink, secondary: ink, accent: ink, ink }
  }
  const p = spec.palette
  return {
    skin: colorVar(p.skin),
    primary: colorVar(p.primary),
    secondary: colorVar(p.secondary),
    accent: colorVar(p.accent),
    ink: colorVar(INK),
  }
}

const render = (map: PartMap, id: string, f: Fills) => map[id]?.(f) ?? null

type Props = {
  readonly spec: CharacterSpec
  /** Multiplier applied to the figure's rendered size. */
  readonly scale?: number
  /** Render the whole figure as one flat ink colour. */
  readonly silhouette?: boolean
  readonly className?: string
}

export const CharacterFigure = ({ spec, scale = 1, silhouette = false, className }: Props) => {
  const f = fillsFor(spec, silhouette)
  return (
    <svg
      viewBox={VIEW_BOX}
      className={className}
      style={{ transform: `scale(${scale})`, transformOrigin: 'bottom center' }}
      aria-hidden="true"
    >
      {render(bodyShapes, spec.body.id, f)}
      {render(outfitShapes, spec.outfit.id, f)}
      {render(headShapes, spec.head.id, f)}
      {render(accessoryShapes, spec.accessory.id, f)}
    </svg>
  )
}
