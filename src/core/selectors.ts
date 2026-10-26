import type { Focus } from './focus'
import type { ProjectId, Session, Urgency } from './domain'
import type { State } from './reducer'

export type RaisedHand = {
  readonly count: number
  readonly queue: readonly Session[]
  readonly urgency: Urgency
}

export type CharacterState =
  | 'speaking'
  | 'listening'
  | 'hand-raised-blocked'
  | 'hand-raised-routine'
  | 'working'
  | 'idle'
  | 'absent'

const awaitingSince = (s: Session): number => s.awaiting?.since ?? s.updatedAt

/** Awaiting Sessions of a Project, oldest first. */
export const selectQueue = (state: State, projectId: ProjectId): readonly Session[] =>
  Object.values(state.sessions)
    .filter((s) => s.projectId === projectId && s.status === 'awaiting')
    .sort((a, b) => awaitingSince(a) - awaitingSince(b) || a.id.localeCompare(b.id))

/** Undefined when nothing is Awaiting. */
export const selectRaisedHand = (state: State, projectId: ProjectId): RaisedHand | undefined => {
  const queue = selectQueue(state, projectId)
  if (queue.length === 0) return undefined
  const blocked = queue.some((s) => s.awaiting?.urgency === 'blocked')
  return { count: queue.length, queue, urgency: blocked ? 'blocked' : 'routine' }
}

export const selectCharacterState = (
  state: State,
  focus: Focus,
  projectId: ProjectId,
): CharacterState => {
  const project = state.projects[projectId]
  if (!project || project.departed) return 'absent'
  if (focus.phase !== 'none' && focus.calledOn === projectId) return focus.phase
  const hand = selectRaisedHand(state, projectId)
  if (hand) return hand.urgency === 'blocked' ? 'hand-raised-blocked' : 'hand-raised-routine'
  const working = Object.values(state.sessions).some(
    (s) => s.projectId === projectId && s.status === 'running',
  )
  return working ? 'working' : 'idle'
}
