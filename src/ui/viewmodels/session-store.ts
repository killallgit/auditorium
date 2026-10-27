import type { ProjectId } from '@/core/domain'
import type { Event } from '@/core/events'
import { initialState, reduce, type State } from '@/core/reducer'

/** Core state plus seat order: projects in order of first appearance. */
export type SessionStore = { readonly state: State; readonly seats: readonly ProjectId[] }

export const initialStore: SessionStore = { state: initialState, seats: [] }

export const storeReducer = (store: SessionStore, event: Event): SessionStore => {
  const state = reduce(store.state, event)
  if (state === store.state) return store
  const seats = Object.keys(state.projects).filter((id) => !store.seats.includes(id))
  return { state, seats: seats.length ? [...store.seats, ...seats] : store.seats }
}
