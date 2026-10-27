import type { CharacterState } from '@/core/selectors'

/** Visuals per state. Full literal class strings so Tailwind detects them. */
export type SeatClasses = {
  readonly figure: string
  readonly caption: string
  readonly seat: string
}

export const SEAT_CLASSES: Readonly<Record<CharacterState, SeatClasses>> = {
  working: { figure: 'motion-safe:animate-bob', caption: 'text-ink-2', seat: '' },
  idle: { figure: 'opacity-90', caption: 'text-ink-3', seat: '' },
  'hand-raised-routine': { figure: '', caption: 'text-ink-1 font-bold', seat: 'bg-paper-2 shadow-cut' },
  'hand-raised-blocked': {
    figure: '',
    caption: 'text-accent-1 font-bold',
    seat: 'bg-paper-2 shadow-cut-accent motion-safe:animate-pulse-ring',
  },
  speaking: { figure: 'motion-safe:animate-bob', caption: 'text-accent-2 font-bold', seat: 'bg-paper-3 shadow-cut' },
  listening: { figure: '', caption: 'text-accent-4 font-bold', seat: 'bg-paper-3 shadow-cut' },
  absent: { figure: 'opacity-30 grayscale', caption: 'text-ink-3 line-through', seat: 'opacity-60' },
}

export const isHandRaised = (s: CharacterState): boolean =>
  s === 'hand-raised-routine' || s === 'hand-raised-blocked'

export const STATE_LABEL: Readonly<Record<CharacterState, string>> = {
  working: 'working',
  idle: 'idle',
  'hand-raised-routine': 'hand raised',
  'hand-raised-blocked': 'hand raised, blocked',
  speaking: 'speaking',
  listening: 'listening',
  absent: 'absent',
}
