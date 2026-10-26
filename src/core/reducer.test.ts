import { expect, test } from 'vitest'
import type { Event } from './events'
import { fold } from './helpers.test-util'

const appeared: Event = { id: 'e1', at: 1, type: 'project.appeared', projectId: 'p', name: 'P' }
const started: Event = {
  id: 'e2', at: 2, type: 'session.started', projectId: 'p', sessionId: 's',
  tool: 'claude', host: 'local', title: 'T',
}
const ended: Event = {
  id: 'e3', at: 3, type: 'turn.ended', projectId: 'p', sessionId: 's',
  lastTurn: 'done', spokenSummary: 'Done.', urgency: 'routine',
}

test('turn.ended makes session awaiting; turn.started clears it', () => {
  const s = fold([appeared, started, ended])
  expect(s.sessions['s']?.status).toBe('awaiting')
  expect(s.sessions['s']?.awaiting?.spokenSummary).toBe('Done.')
  const t = fold([appeared, started, ended, { id: 'e4', at: 4, type: 'turn.started', projectId: 'p', sessionId: 's' }])
  expect(t.sessions['s']?.status).toBe('running')
  expect(t.sessions['s']?.awaiting).toBeUndefined()
})

test('duplicate events are ignored', () => {
  expect(fold([appeared, started, ended, ended])).toEqual(fold([appeared, started, ended]))
})

test('out-of-order stale events are ignored', () => {
  const stale: Event = { id: 'e0', at: 2, type: 'turn.started', projectId: 'p', sessionId: 's' }
  expect(fold([appeared, started, ended, stale]).sessions['s']?.status).toBe('awaiting')
})

test('events for unknown sessions are ignored', () => {
  expect(fold([ended]).sessions).toEqual({})
})

test('ended sessions stay ended', () => {
  const end: Event = { id: 'e4', at: 4, type: 'session.ended', projectId: 'p', sessionId: 's' }
  const late: Event = { ...ended, id: 'e5', at: 5 }
  expect(fold([appeared, started, end, late]).sessions['s']?.status).toBe('ended')
})

test('needs-input escalates urgency', () => {
  const n: Event = { id: 'e4', at: 4, type: 'session.needs-input', projectId: 'p', sessionId: 's', urgency: 'blocked' }
  expect(fold([appeared, started, ended, n]).sessions['s']?.awaiting?.urgency).toBe('blocked')
})

test('project.departed marks project departed', () => {
  const d: Event = { id: 'e4', at: 4, type: 'project.departed', projectId: 'p' }
  expect(fold([appeared, d]).projects['p']?.departed).toBe(true)
})
