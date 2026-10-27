import { createContext } from 'react'
import type { Focus } from '@/core/focus'
import type { ProjectId } from '@/core/domain'

export type FocusApi = {
  readonly focus: Focus
  readonly callOn: (projectId: ProjectId) => void
  readonly startListening: () => void
  readonly release: () => void
}

export const FocusContext = createContext<FocusApi | null>(null)
