import type { CharacterView } from '../viewmodels/characters'
import { Label } from '../shared/Label'
import { Seat } from './Seat'

type Props = {
  readonly characters: readonly CharacterView[]
  readonly onCallOn: (projectId: CharacterView['projectId']) => void
}

/** A stage strip above rows of seats; each seat sits on a floor line. */
export const Room = ({ characters, onCallOn }: Props) => (
  <section className="flex flex-1 flex-col gap-8" aria-label="The room">
    <div className="bg-ink-1 py-3 text-center shadow-cut">
      <Label className="text-paper-1">Stage</Label>
    </div>
    <ul className="grid flex-1 grid-cols-[repeat(auto-fit,var(--spacing-seat))] content-evenly justify-center gap-x-8 gap-y-12">
      {characters.map((c) => (
        <li key={c.projectId} className="border-b-8 border-paper-3 pb-2">
          <Seat character={c} onCallOn={onCallOn} />
        </li>
      ))}
    </ul>
  </section>
)
