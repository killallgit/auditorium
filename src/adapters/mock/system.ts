import type { Clock, Logger, Rng, Scheduler } from './ports'

export const systemClock: Clock = { now: () => Date.now() }
export const mathRng: Rng = { next: () => Math.random() }
export const intervalScheduler: Scheduler = {
  every: (ms, fn) => {
    const handle = setInterval(fn, ms)
    return () => clearInterval(handle)
  },
}
export const consoleLogger: Logger = { log: (m) => console.log(m) }
