import type { CharacterView } from '../viewmodels/characters'
import { CharacterView as CharacterPhoto } from '../characters/CharacterView'
import { poseFor } from '../rig/pose'
import { HandBadge } from '../shared/HandBadge'
import { Label } from '../shared/Label'
import { isHandRaised, SEAT_CLASSES, STATE_LABEL } from './seat-classes'

type Props = {
  readonly character: CharacterView
  readonly onCallOn: (projectId: CharacterView['projectId']) => void
}

export const Seat = ({ character, onCallOn }: Props) => {
  const { state, hand, name, spec, projectId } = character
  const c = SEAT_CLASSES[state]
  const raised = isHandRaised(state)
  const body = (
    <>
      <span className="relative mx-auto block aspect-[5/8] h-figure">
        <CharacterPhoto spec={spec} pose={poseFor(state)} className={`h-full w-full ${c.figure}`} />
        {raised && hand && (
          <span className="absolute top-0 left-2">
            <HandBadge count={hand.count} urgency={hand.urgency} />
          </span>
        )}
      </span>
      <Label className={`block truncate text-center ${c.caption}`}>{name}</Label>
    </>
  )
  const base = `relative block w-full p-2 ${c.seat}`
  return raised ? (
    <button
      type="button"
      className={`${base} cursor-pointer focus-visible:outline-4 focus-visible:outline-accent-2`}
      aria-label={`Call on ${name}: ${STATE_LABEL[state]}${hand ? `, ${hand.count} awaiting` : ''}`}
      onClick={() => onCallOn(projectId)}
    >
      {body}
    </button>
  ) : (
    <div className={base} role="group" aria-label={`${name}: ${STATE_LABEL[state]}`}>
      {body}
    </div>
  )
}
