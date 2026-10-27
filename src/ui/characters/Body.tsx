import type { PartMap } from './types'

export const bodyShapes: PartMap = {
  slim: (f) => <path d="M42 70 L60 72 L58 150 L52 150 L50 118 L47 150 L40 149 Z" fill={f.primary} />,
  round: (f) => <path d="M30 88 Q32 66 52 68 Q74 70 70 100 L66 150 L36 148 Z" fill={f.primary} />,
  tall: (f) => <path d="M40 66 L62 68 L60 154 L40 152 Z" fill={f.primary} />,
  stout: (f) => <path d="M26 80 L72 76 L76 130 L68 150 L32 152 L24 128 Z" fill={f.primary} />,
  lanky: (f) => <path d="M44 68 L58 66 L62 100 L56 156 L50 156 L48 112 L44 156 L38 154 L42 100 Z" fill={f.primary} />,
  broad: (f) => <path d="M22 74 L78 72 L70 108 L66 152 L34 150 L30 108 Z" fill={f.primary} />,
}
