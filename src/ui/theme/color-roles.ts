import type { ColorRole } from '@/core/character'

/** Theme tokens are emitted as CSS variables (`@theme static`), so SVG fills reference them directly. */
const ROLES = ['paper-1', 'paper-2', 'paper-3', 'ink-1', 'ink-2', 'ink-3', 'accent-1', 'accent-2', 'accent-3', 'accent-4', 'accent-5'] as const

export const INK: ColorRole = 'ink-1'

const isKnown = (role: string): boolean => (ROLES as readonly string[]).includes(role)

/** Resolve an abstract colour role to a CSS value; unknown roles fall back to ink. */
export const colorVar = (role: ColorRole): string => `var(--color-${isKnown(role) ? role : INK})`
