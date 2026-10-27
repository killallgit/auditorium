import type { CharacterSpec } from '@/core/character'
import { useFocusWithin } from '../hooks/useFocusWithin'
import { displayPhase, FOCUS_LAYOUT, type FocusPhase } from './focus-layout'
import { FocusedFigure } from './FocusedFigure'
import { TranscriptPanel } from './TranscriptPanel'

type Props = {
  readonly name: string
  readonly spec: CharacterSpec
  readonly phase: FocusPhase
  /** False on first paint so transitions run from the rest state. */
  readonly entered: boolean
  readonly excerpt?: string
  readonly summary?: string
  readonly question?: string
  readonly onListen: () => void
  readonly onRelease: () => void
  readonly onSubmitReply: (text: string) => void
}

export const FocusStage = ({ name, spec, phase, entered, excerpt, summary, question, onListen, onRelease, onSubmitReply }: Props) => {
  const layout = FOCUS_LAYOUT[displayPhase(phase, entered)]
  const ref = useFocusWithin<HTMLDivElement>()
  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-labelledby="focus-title"
      tabIndex={-1}
      className="fixed inset-0 z-50 grid grid-cols-2 items-center gap-8 p-8 outline-none"
      onKeyDown={(e) => {
        if (e.key === 'Escape') onRelease()
      }}
    >
      <div
        data-testid="focus-backdrop"
        aria-hidden="true"
        className={`absolute inset-0 -z-10 bg-ink-1/60 ${layout.backdrop}`}
        onClick={onRelease}
      />
      <div className={`h-[65vh] justify-self-center ${layout.figure}`}>
        <FocusedFigure spec={spec} />
      </div>
      <div className={`max-h-full ${layout.panel}`}>
        <TranscriptPanel
          name={name}
          showReply={layout.showReply}
          onListen={onListen}
          onRelease={onRelease}
          onSubmitReply={onSubmitReply}
          {...(excerpt === undefined ? {} : { excerpt })}
          {...(summary === undefined ? {} : { summary })}
          {...(question === undefined ? {} : { question })}
        />
      </div>
    </div>
  )
}
