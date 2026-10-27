import type { CharacterSpec } from '@/core/character'
import type { Focus } from '@/core/focus'
import type { ProjectId, Session, Urgency } from '@/core/domain'
import { selectCharacterState, selectRaisedHand, type CharacterState } from '@/core/selectors'
import type { SessionStore } from './session-store'

export type CharacterView = {
  readonly projectId: ProjectId
  readonly name: string
  readonly spec: CharacterSpec
  readonly state: CharacterState
  readonly hand?: { readonly count: number; readonly urgency: Urgency }
}

export type FocusedView = {
  readonly character: CharacterView
  /** Oldest Awaiting Session, if any. */
  readonly session?: Session
  readonly excerpt?: string
  readonly summary?: string
  readonly question?: string
}

export const deriveCharacters = (
  store: SessionStore,
  focus: Focus,
  build: (seed: string) => CharacterSpec,
): readonly CharacterView[] =>
  store.seats.flatMap((projectId) => {
    const project = store.state.projects[projectId]
    if (!project) return []
    const hand = selectRaisedHand(store.state, projectId)
    return [
      {
        projectId,
        name: project.name,
        spec: build(projectId),
        state: selectCharacterState(store.state, focus, projectId),
        ...(hand ? { hand: { count: hand.count, urgency: hand.urgency } } : {}),
      },
    ]
  })

export const oldestAwaiting = (store: SessionStore, projectId: ProjectId): Session | undefined =>
  selectRaisedHand(store.state, projectId)?.queue[0]

export const deriveFocused = (
  characters: readonly CharacterView[],
  store: SessionStore,
  focus: Focus,
): FocusedView | undefined => {
  if (focus.phase === 'none') return undefined
  const character = characters.find((c) => c.projectId === focus.calledOn)
  if (!character) return undefined
  const session = oldestAwaiting(store, character.projectId)
  const a = session?.awaiting
  return {
    character,
    ...(session ? { session } : {}),
    ...(a ? { excerpt: a.lastTurn, summary: a.spokenSummary } : {}),
    ...(a?.question === undefined ? {} : { question: a.question }),
  }
}
