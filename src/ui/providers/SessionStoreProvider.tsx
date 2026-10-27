import { useEffect, useReducer, type ReactNode } from 'react'
import { usePorts } from '../hooks/usePorts'
import { initialStore, storeReducer } from '../viewmodels/session-store'
import { SessionStoreContext } from './session-store-context'

export const SessionStoreProvider = ({ children }: { children: ReactNode }) => {
  const { feed } = usePorts()
  const [store, dispatch] = useReducer(storeReducer, initialStore)
  // The reducer dedupes by event id, so StrictMode re-subscription is safe.
  useEffect(() => feed.subscribe(dispatch), [feed])
  return <SessionStoreContext value={store}>{children}</SessionStoreContext>
}
