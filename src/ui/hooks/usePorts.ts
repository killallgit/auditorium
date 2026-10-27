import { use } from 'react'
import { PortsContext, type Ports } from '../providers/ports-context'

export const usePorts = (): Ports => {
  const ports = use(PortsContext)
  if (!ports) throw new Error('usePorts must be used inside <PortsProvider>')
  return ports
}
