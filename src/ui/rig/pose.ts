import type { CharacterState } from '@/core/selectors'

/** Degrees, CSS convention (positive = clockwise). 0/0/0 is the arm raised as cut. */
export type Pose = {
  readonly head: number
  /** Upper arm about the shoulder. */
  readonly upper: number
  /** Forearm relative to the upper arm, about the elbow. */
  readonly fore: number
}

const RAISED: Pose = { head: 0, upper: 0, fore: 0 }
const LOWERED: Pose = { head: 0, upper: -90, fore: -90 }

const POSES: Readonly<Record<CharacterState, Pose>> = {
  'hand-raised-routine': RAISED,
  'hand-raised-blocked': { ...RAISED, head: -4 },
  speaking: { ...LOWERED, head: 2 },
  listening: { ...LOWERED, head: 4 },
  working: { ...LOWERED, head: 12 },
  idle: { ...LOWERED, head: 5 },
  absent: LOWERED,
}

export const poseFor = (state: CharacterState): Pose => POSES[state]
