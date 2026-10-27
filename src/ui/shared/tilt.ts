export type Tilt = -2 | -1 | 0 | 1 | 2

/** Full literal class names so Tailwind detects them. */
export const TILT_CLASS: Readonly<Record<Tilt, string>> = {
  [-2]: '-rotate-2',
  [-1]: '-rotate-1',
  0: 'rotate-0',
  1: 'rotate-1',
  2: 'rotate-2',
}
