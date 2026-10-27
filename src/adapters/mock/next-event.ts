import type { Event } from '../../core/events'
import { failReasons, hosts, lastTurns, pick, projectNames, questions, summaries, tools, titles } from './content'
import type { Rng } from './ports'

export type SimSession = {
  readonly id: string
  readonly projectId: string
  readonly title: string
  readonly phase: 'new' | 'running' | 'awaiting' | 'done'
  /** Tick at which the session next acts. */
  readonly due: number
  readonly lines: readonly string[]
}
export type SimProject = { readonly id: string; readonly name: string; readonly departed: boolean; readonly sessions: number }
export type SimState = {
  readonly tick: number
  readonly counter: number
  readonly lastAt: number
  readonly projects: readonly SimProject[]
  readonly sessions: readonly SimSession[]
}
export type SimOptions = { readonly maxProjects: number }

export const initialSim: SimState = { tick: 0, counter: 0, lastAt: 0, projects: [], sessions: [] }

const setSession = (s: SimState, id: string, patch: Partial<SimSession>): readonly SimSession[] =>
  s.sessions.map((x) => (x.id === id ? { ...x, ...patch } : x))

type Step = readonly [Event | undefined, SimState]

/** Advance one tick; emits at most one valid Event. */
export const nextEvent = (state: SimState, rng: Rng, now: number, opts: SimOptions): Step => {
  const tick = state.tick + 1
  const at = Math.max(now, state.lastAt)
  const n = state.counter + 1
  const base = { id: `evt-${n}`, at }
  const s: SimState = { ...state, tick, counter: n, lastAt: at }
  const live = s.projects.filter((p) => !p.departed)

  // 1. Departure: a project whose sessions have all finished.
  const idle = live.find((p) => p.sessions > 0 && s.sessions.filter((x) => x.projectId === p.id).every((x) => x.phase === 'done'))
  if (idle && rng.next() < 0.5) {
    return [{ ...base, type: 'project.departed', projectId: idle.id },
      { ...s, projects: s.projects.map((p) => (p.id === idle.id ? { ...p, departed: true } : p)) }]
  }

  // 2. A project with no session yet gets one.
  const fresh = live.find((p) => p.sessions === 0)
  if (fresh) {
    const id = `session-${n}`
    const title = pick(rng, titles)
    return [{ ...base, type: 'session.started', projectId: fresh.id, sessionId: id,
      tool: pick(rng, tools), host: pick(rng, hosts), title },
      { ...s, projects: s.projects.map((p) => (p.id === fresh.id ? { ...p, sessions: 1 } : p)),
        sessions: [...s.sessions, { id, projectId: fresh.id, title, phase: 'new', due: tick + 1, lines: [] }] }]
  }

  // 3. A session that is due acts.
  const due = s.sessions.filter((x) => x.phase !== 'done' && x.due <= tick)
  const sess = due[0]
  if (sess) {
    const { id, projectId } = sess
    const ids = { projectId, sessionId: id }
    const delay = () => tick + 2 + Math.floor(rng.next() * 5)
    if (sess.phase === 'new') {
      return [{ ...base, type: 'turn.started', ...ids }, { ...s, sessions: setSession(s, id, { phase: 'running', due: delay() }) }]
    }
    if (sess.phase === 'running') {
      if (rng.next() < 0.15) {
        return [{ ...base, type: 'session.needs-input', ...ids, urgency: 'blocked' },
          { ...s, sessions: setSession(s, id, { phase: 'awaiting', due: delay() }) }]
      }
      const lastTurn = pick(rng, lastTurns)
      const question = rng.next() < 0.5 ? pick(rng, questions) : undefined
      return [{ ...base, type: 'turn.ended', ...ids, lastTurn, spokenSummary: pick(rng, summaries),
        ...(question === undefined ? {} : { question }),
        urgency: rng.next() < 0.2 ? 'blocked' : 'routine' },
        { ...s, sessions: setSession(s, id, { phase: 'awaiting', due: delay(), lines: [...sess.lines, lastTurn] }) }]
    }
    const roll = rng.next()
    if (roll < 0.7) {
      return [{ ...base, type: 'turn.started', ...ids }, { ...s, sessions: setSession(s, id, { phase: 'running', due: delay() }) }]
    }
    const done = { ...s, sessions: setSession(s, id, { phase: 'done' as const }) }
    return roll < 0.9
      ? [{ ...base, type: 'session.ended', ...ids }, done]
      : [{ ...base, type: 'session.failed', ...ids, reason: pick(rng, failReasons) }, done]
  }

  // 4. A new project may appear.
  if (live.length < opts.maxProjects && (live.length === 0 || rng.next() < 0.2)) {
    const id = `project-${n}`
    const name = `${pick(rng, projectNames)}-${n}`
    return [{ ...base, type: 'project.appeared', projectId: id, name, repoUrl: `https://example.com/${name}.git` },
      { ...s, projects: [...s.projects, { id, name, departed: false, sessions: 0 }] }]
  }
  return [undefined, s]
}
