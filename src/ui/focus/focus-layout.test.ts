import { describe, expect, it } from 'vitest'
import { displayPhase, FOCUS_LAYOUT } from './focus-layout'

describe('focus layout', () => {
  it('covers every phase', () => {
    expect(Object.keys(FOCUS_LAYOUT).sort()).toEqual(['listening', 'none', 'speaking'])
  })
  it('only listening shows the reply form', () => {
    expect(FOCUS_LAYOUT.listening.showReply).toBe(true)
    expect(FOCUS_LAYOUT.speaking.showReply).toBe(false)
    expect(FOCUS_LAYOUT.none.showReply).toBe(false)
  })
  it('is interactive only when focused', () => {
    expect(FOCUS_LAYOUT.none.interactive).toBe(false)
    expect(FOCUS_LAYOUT.speaking.interactive).toBe(true)
  })
  it('gates all motion behind motion-safe', () => {
    for (const l of Object.values(FOCUS_LAYOUT)) {
      expect(l.figure).toContain('motion-safe:transition-all')
      expect(l.figure).not.toMatch(/(^| )transition-/)
    }
  })
  it('starts at rest until entered', () => {
    expect(displayPhase('speaking', false)).toBe('none')
    expect(displayPhase('speaking', true)).toBe('speaking')
  })
})
