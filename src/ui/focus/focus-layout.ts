import type { Focus } from '@/core/focus'

export type FocusPhase = Focus['phase']

/** Visuals per phase. 'none' is the pre/post state: everything is at rest, nothing is shown.
 *  Full literal class strings so Tailwind detects them. Motion is gated by motion-safe. */
export type FocusLayout = {
  readonly backdrop: string
  readonly figure: string
  readonly panel: string
  /** Whether the stage accepts pointer input and is exposed to assistive tech. */
  readonly interactive: boolean
  readonly showReply: boolean
}

const MOTION = 'motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-out'

export const FOCUS_LAYOUT: Readonly<Record<FocusPhase, FocusLayout>> = {
  none: {
    backdrop: `${MOTION} opacity-0 backdrop-blur-none`,
    figure: `${MOTION} translate-x-full scale-50 opacity-0 blur-sm`,
    panel: `${MOTION} translate-x-8 opacity-0`,
    interactive: false,
    showReply: false,
  },
  speaking: {
    backdrop: `${MOTION} opacity-100 backdrop-blur-md`,
    figure: `${MOTION} translate-x-0 scale-105 opacity-100 blur-none`,
    panel: `${MOTION} translate-x-0 opacity-100`,
    interactive: true,
    showReply: false,
  },
  listening: {
    backdrop: `${MOTION} opacity-100 backdrop-blur-md`,
    figure: `${MOTION} translate-x-0 scale-105 opacity-100 blur-none`,
    panel: `${MOTION} translate-x-0 opacity-100`,
    interactive: true,
    showReply: true,
  },
}

/** The phase to render: lags one frame behind the real one on entry so CSS transitions run. */
export const displayPhase = (phase: FocusPhase, entered: boolean): FocusPhase => (entered ? phase : 'none')
