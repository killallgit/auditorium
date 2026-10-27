import { use } from 'react'
import { SessionStoreContext } from '../providers/session-store-context'
import type { SessionStore } from '../viewmodels/session-store'

export const useSessionStore = (): SessionStore => {
  const s = use(SessionStoreContext)
  if (!s) throw new Error('useSessionStore must be used inside <SessionStoreProvider>')
  return s
}
