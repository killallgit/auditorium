import { describe, expect, it } from 'vitest'
import type { CharacterState } from '@/core/selectors'
import { poseFor } from './pose'

describe('poseFor', () => {
  it('raises the arm as cut for a routine raised hand', () => {
    expect(poseFor('hand-raised-routine')).toEqual({ head: 0, upper: 0, fore: 0 })
  })
  it('keeps the arm raised when blocked', () => {
    const p = poseFor('hand-raised-blocked')
    expect(p.upper).toBe(0)
    expect(p.fore).toBe(0)
  })
  it('lowers the arm in every other state (total forearm -180)', () => {
    const lowered: CharacterState[] = ['speaking', 'listening', 'working', 'idle', 'absent']
    for (const s of lowered) {
      const p = poseFor(s)
      expect(p.upper).toBe(-90)
      expect(p.upper + p.fore).toBe(-180)
    }
  })
  it('tips the head down more when working than idle', () => {
    expect(poseFor('working').head).toBeGreaterThan(poseFor('idle').head)
  })
})
