export type ProjectId = string
export type SessionId = string
/** Epoch milliseconds. */
export type Timestamp = number

export type Project = {
  readonly id: ProjectId
  readonly name: string
  readonly repoUrl?: string
}

export type Urgency = 'routine' | 'blocked'

export type SessionStatus = 'running' | 'awaiting' | 'ended' | 'failed'

/** Details of a Session whose Turn has ended. */
export type Awaiting = {
  readonly urgency: Urgency
  readonly lastTurn: string
  readonly spokenSummary: string
  readonly question?: string
  readonly since: Timestamp
}

export type Session = {
  readonly id: SessionId
  readonly projectId: ProjectId
  readonly tool: string
  readonly host: string
  readonly title: string
  readonly status: SessionStatus
  readonly updatedAt: Timestamp
  readonly awaiting?: Awaiting
}
