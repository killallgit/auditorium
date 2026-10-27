import { describe, expect, it } from 'vitest'
import { isHandRaised, SEAT_CLASSES, STATE_LABEL } from './seat-classes'

const states = ['working', 'idle', 'hand-raised-routine', 'hand-raised-blocked', 'speaking', 'listening', 'absent'] as const

describe('seat classes', () => {
  it('covers every state', () => {
    expect(Object.keys(SEAT_CLASSES).sort()).toEqual([...states].sort())
    expect(Object.keys(STATE_LABEL).sort()).toEqual([...states].sort())
  })
  it('only hand-raised states are clickable', () => {
    expect(states.filter(isHandRaised)).toEqual(['hand-raised-routine', 'hand-raised-blocked'])
  })
  it('blocked looks different from routine', () => {
    expect(SEAT_CLASSES['hand-raised-blocked']).not.toEqual(SEAT_CLASSES['hand-raised-routine'])
  })
})
