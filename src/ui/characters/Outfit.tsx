import type { PartMap } from './types'

export const outfitShapes: PartMap = {
  sweater: (f) => <rect x="32" y="74" width="38" height="34" rx="4" fill={f.secondary} transform="rotate(2 50 90)" />,
  blazer: (f) => (
    <>
      <path d="M33 72 L67 74 L66 112 L34 110 Z" fill={f.secondary} />
      <path d="M50 74 L44 94 L52 112 Z" fill={f.accent} />
    </>
  ),
  hoodie: (f) => (
    <>
      <rect x="31" y="76" width="40" height="38" rx="6" fill={f.secondary} />
      <path d="M36 72 Q51 84 66 74 L62 80 Q51 90 40 80 Z" fill={f.accent} />
    </>
  ),
  dress: (f) => <path d="M38 72 L62 74 L74 130 L28 126 Z" fill={f.secondary} />,
  overalls: (f) => (
    <>
      <rect x="36" y="92" width="30" height="40" fill={f.secondary} />
      <rect x="39" y="72" width="5" height="22" fill={f.secondary} />
      <rect x="58" y="74" width="5" height="20" fill={f.secondary} />
    </>
  ),
  coat: (f) => <path d="M30 72 L70 74 L74 142 L28 140 Z" fill={f.secondary} />,
}
