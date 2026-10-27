import { use } from 'react'
import { FocusContext, type FocusApi } from '../providers/focus-context'

/** { focus, callOn, startListening, release } */
export const useFocus = (): FocusApi => {
  const f = use(FocusContext)
  if (!f) throw new Error('useFocus must be used inside <FocusProvider>')
  return f
}
