import type { Project, ProjectId, Session, SessionId } from './domain'
import type { Event } from './events'

export type ProjectEntry = Project & { readonly departed: boolean }

export type State = {
  readonly projects: Readonly<Record<ProjectId, ProjectEntry>>
  readonly sessions: Readonly<Record<SessionId, Session>>
  readonly seen: Readonly<Record<string, true>>
}

export const initialState: State = { projects: {}, sessions: {}, seen: {} }

const clearAwaiting = (s: Session): Session => {
  const copy = { ...s }
  delete copy.awaiting
  return copy
}

const updateSession = (
  state: State,
  sessionId: SessionId,
  at: number,
  patch: (s: Session) => Session,
): State => {
  const s = state.sessions[sessionId]
  // unknown, stale, or finished sessions ignore further events
  if (!s || at < s.updatedAt || s.status === 'ended' || s.status === 'failed') return state
  return { ...state, sessions: { ...state.sessions, [sessionId]: { ...patch(s), updatedAt: at } } }
}

const apply = (state: State, e: Event): State => {
  switch (e.type) {
    case 'project.appeared': {
      const prev = state.projects[e.projectId]
      const entry: ProjectEntry = {
        id: e.projectId,
        name: e.name,
        departed: false,
        ...(e.repoUrl === undefined ? {} : { repoUrl: e.repoUrl }),
      }
      return prev && !prev.departed && prev.name === e.name && prev.repoUrl === e.repoUrl
        ? state
        : { ...state, projects: { ...state.projects, [e.projectId]: entry } }
    }
    case 'project.departed': {
      const prev = state.projects[e.projectId]
      return prev
        ? { ...state, projects: { ...state.projects, [e.projectId]: { ...prev, departed: true } } }
        : state
    }
    case 'session.started':
      if (state.sessions[e.sessionId]) return state
      return {
        ...state,
        sessions: {
          ...state.sessions,
          [e.sessionId]: {
            id: e.sessionId,
            projectId: e.projectId,
            tool: e.tool,
            host: e.host,
            title: e.title,
            status: 'running',
            updatedAt: e.at,
          },
        },
      }
    case 'session.ended':
      return updateSession(state, e.sessionId, e.at, (s) => ({
        ...clearAwaiting(s),
        status: 'ended',
      }))
    case 'session.failed':
      return updateSession(state, e.sessionId, e.at, (s) => ({
        ...clearAwaiting(s),
        status: 'failed',
      }))
    case 'turn.started':
      return updateSession(state, e.sessionId, e.at, (s) => ({
        ...clearAwaiting(s),
        status: 'running',
      }))
    case 'turn.ended':
      return updateSession(state, e.sessionId, e.at, (s) => ({
        ...s,
        status: 'awaiting',
        awaiting: {
          urgency: e.urgency,
          lastTurn: e.lastTurn,
          spokenSummary: e.spokenSummary,
          since: e.at,
          ...(e.question === undefined ? {} : { question: e.question }),
        },
      }))
    case 'session.needs-input':
      return updateSession(state, e.sessionId, e.at, (s) => ({
        ...s,
        status: 'awaiting',
        awaiting: s.awaiting
          ? { ...s.awaiting, urgency: e.urgency }
          : { urgency: e.urgency, lastTurn: '', spokenSummary: '', since: e.at },
      }))
  }
}

export const reduce = (state: State, event: Event): State => {
  if (state.seen[event.id]) return state
  const next = apply(state, event)
  return { ...next, seen: { ...next.seen, [event.id]: true } }
}
