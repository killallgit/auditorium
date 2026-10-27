export type Point = { readonly x: number; readonly y: number }

const rad = (deg: number): number => (deg * Math.PI) / 180

/** Rotate `p` clockwise (screen, y down) by `deg` degrees about `origin`. */
export const rotateAbout = (p: Point, origin: Point, deg: number): Point => {
  const dx = p.x - origin.x
  const dy = p.y - origin.y
  const c = Math.cos(rad(deg))
  const s = Math.sin(rad(deg))
  return { x: origin.x + dx * c - dy * s, y: origin.y + dx * s + dy * c }
}

export type ForeTransform = {
  /** Offset of the elbow after the upper arm rotates. */
  readonly translate: Point
  /** Total rotation about the elbow. */
  readonly rotate: number
}

/** The forearm follows the upper arm: translate to the moved elbow, rotate by upper + local fore. */
export const foreTransform = (shoulder: Point, elbow: Point, upper: number, fore: number): ForeTransform => {
  const moved = rotateAbout(elbow, shoulder, upper)
  return { translate: { x: moved.x - elbow.x, y: moved.y - elbow.y }, rotate: upper + fore }
}
