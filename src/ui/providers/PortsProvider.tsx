import type { ReactNode } from 'react'
import { PortsContext, type Ports } from './ports-context'

export const PortsProvider = ({ ports, children }: { ports: Ports; children: ReactNode }) => (
  <PortsContext value={ports}>{children}</PortsContext>
)
