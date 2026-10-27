import type { ReactNode } from 'react'
import { TILT_CLASS, type Tilt } from './tilt'

type Props = {
  readonly tilt?: Tilt
  readonly className?: string
  readonly children?: ReactNode
}

/** Cut-paper panel with a hard offset shadow. */
export const Paper = ({ tilt = 0, className = '', children }: Props) => (
  <div className={`bg-paper-1 shadow-cut ${TILT_CLASS[tilt]} ${className}`}>{children}</div>
)
