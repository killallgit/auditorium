import { expect, test } from 'vitest'
import type { Event } from '@/core/events'
import { initialFocus } from '@/core/focus'
import type { CharacterSpec } from '@/core/character'
import { initialStore, storeReducer } from './session-store'
import { deriveCharacters, deriveFocused } from './characters'

const build = (seed: string) => ({ seed }) as unknown as CharacterSpec
const app = (id: string, p: string): Event => ({ id, at: 1, type: 'project.appeared', projectId: p, name: p.toUpperCase() })
const evs: Event[] = [
  app('1', 'z'),
  app('2', '10'),
  app('3', 'a'),
  { id: '4', at: 2, type: 'session.started', projectId: 'a', sessionId: 's', tool: 't', host: 'h', title: 'T' },
  { id: '5', at: 3, type: 'turn.ended', projectId: 'a', sessionId: 's', lastTurn: 'long', spokenSummary: 'Sum', question: 'Q?', urgency: 'blocked' },
]
const store = evs.reduce(storeReducer, initialStore)

test('seat order is first appearance, even for numeric ids', () => {
  expect(deriveCharacters(store, initialFocus, build).map((c) => c.projectId)).toEqual(['z', '10', 'a'])
})

test('departed characters stay seated as absent', () => {
  const s = storeReducer(store, { id: '9', at: 9, type: 'project.departed', projectId: 'z' })
  const c = deriveCharacters(s, initialFocus, build)
  expect(c[0]?.state).toBe('absent')
  expect(c).toHaveLength(3)
})

test('hand and focused view', () => {
  const focus = { phase: 'speaking', calledOn: 'a' } as const
  const chars = deriveCharacters(store, focus, build)
  expect(chars[2]).toMatchObject({ state: 'speaking', hand: { count: 1, urgency: 'blocked' } })
  expect(deriveFocused(chars, store, focus)).toMatchObject({ excerpt: 'long', summary: 'Sum', question: 'Q?' })
  expect(deriveFocused(chars, store, initialFocus)).toBeUndefined()
})
