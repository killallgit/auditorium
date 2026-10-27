import type { PartMap } from './types'

export const headShapes: PartMap = {
  oval: (f) => <ellipse cx="51" cy="44" rx="15" ry="19" fill={f.skin} />,
  round: (f) => <circle cx="49" cy="44" r="18" fill={f.skin} />,
  square: (f) => <rect x="34" y="27" width="32" height="33" rx="3" fill={f.skin} transform="rotate(-3 50 44)" />,
  long: (f) => <ellipse cx="50" cy="42" rx="12" ry="23" fill={f.skin} />,
  heart: (f) => <path d="M32 34 Q50 20 68 34 Q64 52 52 64 Q38 52 32 34 Z" fill={f.skin} />,
  bean: (f) => <path d="M34 40 Q36 22 54 26 Q70 30 64 50 Q58 64 44 58 Q32 54 34 40 Z" fill={f.skin} />,
  tiny: (f) => <circle cx="51" cy="48" r="11" fill={f.skin} />,
}
