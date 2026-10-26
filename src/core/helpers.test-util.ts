import type { Event } from './events'
import { initialState, reduce } from './reducer'

export const fold = (events: readonly Event[]) => events.reduce(reduce, initialState)
