import type { PartMap } from './types'

export const accessoryShapes: PartMap = {
  none: () => null,
  glasses: (f) => (
    <g fill="none" stroke={f.ink} strokeWidth="2">
      <circle cx="44" cy="42" r="5" />
      <circle cx="58" cy="43" r="5" />
      <path d="M49 42 L53 43" />
    </g>
  ),
  hat: (f) => (
    <>
      <rect x="28" y="22" width="46" height="5" fill={f.accent} transform="rotate(-2 50 24)" />
      <rect x="37" y="8" width="26" height="16" fill={f.accent} />
    </>
  ),
  scarf: (f) => <rect x="35" y="62" width="32" height="9" rx="2" fill={f.accent} transform="rotate(-3 50 66)" />,
  headphones: (f) => (
    <>
      <path d="M32 44 Q32 18 52 22 Q68 24 68 44" fill="none" stroke={f.accent} strokeWidth="3" />
      <rect x="28" y="40" width="7" height="12" fill={f.accent} />
      <rect x="66" y="42" width="7" height="12" fill={f.accent} />
    </>
  ),
  bowtie: (f) => <path d="M44 66 L58 70 L44 74 L58 66 Z" fill={f.accent} />,
}
