export interface Rng {
  /** Returns a number in [0, 1). */
  next(): number
}
