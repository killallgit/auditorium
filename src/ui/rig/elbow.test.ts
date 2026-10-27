import { describe, expect, it } from 'vitest'
import { foreTransform, rotateAbout } from './elbow'

describe('rotateAbout', () => {
  it('rotates clockwise on screen', () => {
    const r = rotateAbout({ x: 1, y: 0 }, { x: 0, y: 0 }, 90)
    expect(r.x).toBeCloseTo(0)
    expect(r.y).toBeCloseTo(1)
  })
})

describe('foreTransform', () => {
  const shoulder = { x: 300, y: 392 }
  const elbow = { x: 90, y: 322 }
  it('is identity at zero angles', () => {
    const t = foreTransform(shoulder, elbow, 0, 0)
    expect(t.translate.x).toBeCloseTo(0)
    expect(t.translate.y).toBeCloseTo(0)
    expect(t.rotate).toBe(0)
  })
  it('moves the elbow with the upper arm and sums angles', () => {
    const t = foreTransform(shoulder, elbow, -90, -90)
    // elbow offset (-210,-70) rotated -90deg => (-70, 210) => elbow at (230, 602)
    expect(t.translate.x).toBeCloseTo(140)
    expect(t.translate.y).toBeCloseTo(280)
    expect(t.rotate).toBe(-180)
  })
})
