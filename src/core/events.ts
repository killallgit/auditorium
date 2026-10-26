import type { ProjectId, SessionId, Timestamp, Urgency } from './domain'

type Base = { readonly id: string; readonly at: Timestamp }

export type ProjectAppeared = Base & {
  readonly type: 'project.appeared'
  readonly projectId: ProjectId
  readonly name: string
  readonly repoUrl?: string
}
export type ProjectDeparted = Base & {
  readonly type: 'project.departed'
  readonly projectId: ProjectId
}
export type SessionStarted = Base & {
  readonly type: 'session.started'
  readonly projectId: ProjectId
  readonly sessionId: SessionId
  readonly tool: string
  readonly host: string
  readonly title: string
}
export type SessionEnded = Base & {
  readonly type: 'session.ended'
  readonly projectId: ProjectId
  readonly sessionId: SessionId
}
export type SessionFailed = Base & {
  readonly type: 'session.failed'
  readonly projectId: ProjectId
  readonly sessionId: SessionId
  readonly reason?: string
}
export type TurnStarted = Base & {
  readonly type: 'turn.started'
  readonly projectId: ProjectId
  readonly sessionId: SessionId
}
export type TurnEnded = Base & {
  readonly type: 'turn.ended'
  readonly projectId: ProjectId
  readonly sessionId: SessionId
  readonly lastTurn: string
  readonly spokenSummary: string
  readonly question?: string
  readonly urgency: Urgency
}
export type SessionNeedsInput = Base & {
  readonly type: 'session.needs-input'
  readonly projectId: ProjectId
  readonly sessionId: SessionId
  readonly urgency: Urgency
}

export type Event =
  | ProjectAppeared
  | ProjectDeparted
  | SessionStarted
  | SessionEnded
  | SessionFailed
  | TurnStarted
  | TurnEnded
  | SessionNeedsInput
