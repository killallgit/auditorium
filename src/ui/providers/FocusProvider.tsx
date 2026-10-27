import { useMemo, useReducer, type ReactNode } from 'react'
import { focusReducer, initialFocus as rest, type Focus } from '@/core/focus'
import { FocusContext } from './focus-context'

export const FocusProvider = ({ initial = rest, children }: { initial?: Focus; children: ReactNode }) => {
  const [focus, dispatch] = useReducer(focusReducer, initial)
  const api = useMemo(
    () => ({
      focus,
      callOn: (projectId: string) => dispatch({ type: 'callOn', projectId }),
      startListening: () => dispatch({ type: 'startListening' }),
      release: () => dispatch({ type: 'release' }),
    }),
    [focus],
  )
  return <FocusContext value={api}>{children}</FocusContext>
}
