import { useCallback } from 'react'
import type { ProjectId } from '@/core/domain'
import { oldestAwaiting } from '../viewmodels/characters'
import { useFocus } from './useFocus'
import { usePorts } from './usePorts'
import { useSessionStore } from './useSessionStore'

/** Returns (projectId) => void: focuses the Character and speaks the oldest Awaiting summary. */
export const useCallOn = (): ((projectId: ProjectId) => void) => {
  const { voice } = usePorts()
  const store = useSessionStore()
  const { callOn } = useFocus()
  return useCallback(
    (projectId: ProjectId) => {
      callOn(projectId)
      const summary = oldestAwaiting(store, projectId)?.awaiting?.spokenSummary
      if (summary) voice.speak(summary)
    },
    [voice, store, callOn],
  )
}
