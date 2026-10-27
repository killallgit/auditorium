import type { ReactNode } from 'react'

/** Resolved CSS colours for one figure. */
export type Fills = {
  readonly skin: string
  readonly primary: string
  readonly secondary: string
  readonly accent: string
  readonly ink: string
}

/** Shared figure coordinate space. */
export const VIEW_BOX = '0 0 100 160'

export type PartShape = (f: Fills) => ReactNode
export type PartMap = Readonly<Record<string, PartShape>>
