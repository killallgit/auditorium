export type Clock = { now(): number }
export type Scheduler = { every(ms: number, fn: () => void): () => void }
export type Logger = { log(message: string): void }
export type { Rng } from '../../core/character/rng'
