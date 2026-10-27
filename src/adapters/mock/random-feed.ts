import type { Event } from '../../core/events'
import type { SessionFeed } from '../../core/ports'
import { fakeTranscript } from './content'
import { initialSim, nextEvent, type SimState } from './next-event'
import type { Clock, Rng, Scheduler } from './ports'

export type RandomFeedDeps = {
  readonly clock: Clock
  readonly rng: Rng
  readonly scheduler: Scheduler
  readonly options?: { readonly tickMs?: number; readonly maxProjects?: number }
}

export const createRandomFeed = ({ clock, rng, scheduler, options }: RandomFeedDeps): SessionFeed => {
  const tickMs = options?.tickMs ?? 2000
  const maxProjects = options?.maxProjects ?? 5
  const listeners = new Set<(e: Event) => void>()
  let sim: SimState = initialSim
  let stop: (() => void) | undefined

  const tick = () => {
    const [event, next] = nextEvent(sim, rng, clock.now(), { maxProjects })
    sim = next
    if (event) [...listeners].forEach((l) => l(event))
  }

  return {
    subscribe: (listener) => {
      listeners.add(listener)
      stop ??= scheduler.every(tickMs, tick)
      return () => {
        listeners.delete(listener)
        if (listeners.size === 0 && stop) {
          stop()
          stop = undefined
        }
      }
    },
    getTranscript: (sessionId) => {
      const s = sim.sessions.find((x) => x.id === sessionId)
      return Promise.resolve(s ? fakeTranscript(s.title, s.lines) : '')
    },
  }
}
