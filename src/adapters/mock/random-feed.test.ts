import { expect, test, vi } from 'vitest'
import { createSeededRng } from '../../core/character/seeded-rng'
import type { Event } from '../../core/events'
import { initialState, reduce } from '../../core/reducer'
import { createMockAdapters } from './index'
import { createRandomFeed } from './random-feed'
import type { Scheduler } from './ports'

const fakeScheduler = () => {
  let fn: (() => void) | undefined
  let starts = 0
  const scheduler: Scheduler = {
    every: (_ms, f) => {
      fn = f
      starts++
      return () => { fn = undefined }
    },
  }
  return { scheduler, tick: () => fn?.(), active: () => fn !== undefined, starts: () => starts }
}

const run = (seed: string, ticks: number): Event[] => {
  const sch = fakeScheduler()
  let t = 1000
  const feed = createRandomFeed({ clock: { now: () => (t += 10) }, rng: createSeededRng(seed), scheduler: sch.scheduler })
  const events: Event[] = []
  feed.subscribe((e) => events.push(e))
  for (let i = 0; i < ticks; i++) sch.tick()
  return events
}

test('stream is deterministic per seed', () => {
  expect(run('a', 300)).toEqual(run('a', 300))
  expect(run('a', 300)).not.toEqual(run('b', 300))
})

test('every event is accepted by reducer and ids are unique', () => {
  const events = run('x', 500)
  expect(events.length).toBeGreaterThan(50)
  expect(new Set(events.map((e) => e.id)).size).toBe(events.length)
  let state = initialState
  for (const e of events) {
    const next = reduce(state, e)
    expect(next).not.toBe(state)
    expect(next.seen[e.id]).toBe(true)
    if (e.type === 'turn.started' || e.type === 'turn.ended') {
      expect(next.sessions[e.sessionId]?.status).toBe(e.type === 'turn.started' ? 'running' : 'awaiting')
    }
    state = next
  }
})

test('turn.ended only after turn.started; sessions only after project appeared', () => {
  const running = new Set<string>()
  const done = new Set<string>()
  const projects = new Set<string>()
  for (const e of run('seq', 500)) {
    if (e.type === 'project.appeared') projects.add(e.projectId)
    else expect(projects.has(e.projectId)).toBe(true)
    if (e.type === 'turn.started') running.add(e.sessionId)
    if (e.type === 'turn.ended') expect(running.has(e.sessionId)).toBe(true)
    if ('sessionId' in e && e.type !== 'session.started') expect(done.has(e.sessionId)).toBe(false)
    if (e.type === 'session.ended' || e.type === 'session.failed') done.add(e.sessionId)
  }
  expect(done.size).toBeGreaterThan(0)
})

test('scheduler starts on first subscriber and stops on last unsubscribe', () => {
  const sch = fakeScheduler()
  const feed = createRandomFeed({ clock: { now: () => 1 }, rng: createSeededRng('s'), scheduler: sch.scheduler })
  const u1 = feed.subscribe(() => undefined)
  const u2 = feed.subscribe(() => undefined)
  expect(sch.starts()).toBe(1)
  u1()
  expect(sch.active()).toBe(true)
  u2()
  expect(sch.active()).toBe(false)
})

test('getTranscript returns longer fake text', async () => {
  const sch = fakeScheduler()
  const feed = createRandomFeed({ clock: { now: () => 1 }, rng: createSeededRng('t'), scheduler: sch.scheduler })
  const ids: string[] = []
  feed.subscribe((e) => e.type === 'session.started' && ids.push(e.sessionId))
  for (let i = 0; i < 20; i++) sch.tick()
  expect(ids.length).toBeGreaterThan(0)
  expect((await feed.getTranscript(ids[0] as string)).length).toBeGreaterThan(20)
})

test('mock adapters: voice logs, commands no-op', () => {
  const logger = { log: vi.fn() }
  const sch = fakeScheduler()
  const a = createMockAdapters({ clock: { now: () => 1 }, rng: createSeededRng('m'), scheduler: sch.scheduler, logger })
  a.voice.speak('hi')
  expect(logger.log).toHaveBeenCalledWith('[voice] hi')
  expect(() => a.commands.send(undefined as never)).not.toThrow()
})
