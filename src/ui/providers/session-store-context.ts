import { createContext } from 'react'
import type { SessionStore } from '../viewmodels/session-store'

export const SessionStoreContext = createContext<SessionStore | null>(null)
