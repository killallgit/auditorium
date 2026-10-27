import type { ReactNode } from 'react'

type Props = { readonly className?: string; readonly children: ReactNode }

/** Magazine-style caption. */
export const Label = ({ className = '', children }: Props) => (
  <span className={`font-label text-xs tracking-widest text-ink-1 uppercase ${className}`}>{children}</span>
)
