import type { Event } from '@/core/events'
import type { SessionFeed } from '@/core/ports'

export const DEMO_PROJECT = 'demo-auditorium'

const events: readonly Event[] = [
  { id: 'd1', at: 1, type: 'project.appeared', projectId: DEMO_PROJECT, name: 'auditorium' },
  { id: 'd2', at: 2, type: 'session.started', projectId: DEMO_PROJECT, sessionId: 's1', tool: 'claude', host: 'local', title: 'Focus view' },
  { id: 'd3', at: 3, type: 'project.appeared', projectId: 'demo-kaiser', name: 'kaiser-soze' },
  { id: 'd4', at: 4, type: 'session.started', projectId: 'demo-kaiser', sessionId: 's2', tool: 'codex', host: 'local', title: 'Wire' },
  {
    id: 'd5', at: 5, type: 'turn.ended', projectId: DEMO_PROJECT, sessionId: 's1', urgency: 'blocked',
    lastTurn: 'I added the FocusStage and wired it into App.\nTests pass; lint is clean.\nThe reply path has no Command shape yet.',
    spokenSummary: 'The focus view is done, but replies have nowhere to go.',
    question: 'Should I define a Reply command now?',
  },
]

/** Dev-only feed (?demo=focus): replays a fixed script on subscribe. */
export const createDemoFeed = (): SessionFeed => ({
  subscribe: (listener) => {
    events.forEach(listener)
    return () => undefined
  },
  getTranscript: () => Promise.resolve(''),
})
