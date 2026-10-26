import { expect, test } from 'vitest'
import type { Event } from './events'
import { focusReducer, initialFocus } from './focus'
import { fold } from './helpers.test-util'
import { selectCharacterState, selectQueue, selectRaisedHand } from './selectors'

const base: Event[] = [
  { id: 'a', at: 1, type: 'project.appeared', projectId: 'p', name: 'P' },
  { id: 'b', at: 2, type: 'session.started', projectId: 'p', sessionId: 's1', tool: 't', host: 'h', title: '1' },
  { id: 'c', at: 2, type: 'session.started', projectId: 'p', sessionId: 's2', tool: 't', host: 'h', title: '2' },
]
const turnEnd = (id: string, at: number, sessionId: string, urgency: 'routine' | 'blocked'): Event => ({
  id, at, type: 'turn.ended', projectId: 'p', sessionId, lastTurn: 'x', spokenSummary: 'y', urgency,
})

test('idle then working', () => {
  expect(selectCharacterState(fold([base[0]!]), initialFocus, 'p')).toBe('idle')
  expect(selectCharacterState(fold(base), initialFocus, 'p')).toBe('working')
})

test('queue is oldest first; raised hand counts and escalates', () => {
  const s = fold([...base, turnEnd('d', 10, 's2', 'routine'), turnEnd('e', 5, 's1', 'routine')])
  expect(selectQueue(s, 'p').map((x) => x.id)).toEqual(['s1', 's2'])
  expect(selectRaisedHand(s, 'p')).toMatchObject({ count: 2, urgency: 'routine' })
  expect(selectCharacterState(s, initialFocus, 'p')).toBe('hand-raised-routine')
  const b = fold([...base, turnEnd('d', 10, 's2', 'blocked'), turnEnd('e', 5, 's1', 'routine')])
  expect(selectRaisedHand(b, 'p')?.urgency).toBe('blocked')
  expect(selectCharacterState(b, initialFocus, 'p')).toBe('hand-raised-blocked')
})

test('no raised hand when nothing awaiting', () => {
  expect(selectRaisedHand(fold(base), 'p')).toBeUndefined()
})

test('speaking and listening outrank raised hand', () => {
  const s = fold([...base, turnEnd('d', 10, 's1', 'blocked')])
  const speaking = focusReducer(initialFocus, { type: 'callOn', projectId: 'p' })
  expect(selectCharacterState(s, speaking, 'p')).toBe('speaking')
  const listening = focusReducer(speaking, { type: 'startListening' })
  expect(selectCharacterState(s, listening, 'p')).toBe('listening')
  expect(selectCharacterState(s, focusReducer(listening, { type: 'release' }), 'p')).toBe('hand-raised-blocked')
})

test('focus on another project does not affect this one', () => {
  const s = fold(base)
  const f = focusReducer(initialFocus, { type: 'callOn', projectId: 'other' })
  expect(selectCharacterState(s, f, 'p')).toBe('working')
})

test('startListening without speaking is a no-op', () => {
  expect(focusReducer(initialFocus, { type: 'startListening' })).toBe(initialFocus)
})

test('departed project is absent; unknown is absent', () => {
  const s = fold([...base, { id: 'z', at: 20, type: 'project.departed', projectId: 'p' }])
  expect(selectCharacterState(s, initialFocus, 'p')).toBe('absent')
  expect(selectCharacterState(s, initialFocus, 'nope')).toBe('absent')
})
