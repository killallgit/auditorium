import { useEntered } from '../hooks/useEntered'
import { useFocus } from '../hooks/useFocus'
import { useFocusedCharacter } from '../hooks/useFocusedCharacter'
import type { FocusedView } from '../viewmodels/characters'
import { FocusStage } from './FocusStage'

const Stage = ({ focused }: { focused: FocusedView }) => {
  const { focus, startListening, release } = useFocus()
  // Mounted fresh per call-on, so `entered` starts false and the transition runs.
  const entered = useEntered()
  const { character, excerpt, summary, question } = focused
  return (
    <FocusStage
      name={character.name}
      spec={character.spec}
      phase={focus.phase}
      entered={entered}
      onListen={startListening}
      onRelease={release}
      // CommandSink has no Command shapes yet, so a reply cannot be sent: just release.
      onSubmitReply={release}
      {...(excerpt === undefined ? {} : { excerpt })}
      {...(summary === undefined ? {} : { summary })}
      {...(question === undefined ? {} : { question })}
    />
  )
}

export const FocusStageContainer = () => {
  const focused = useFocusedCharacter()
  return focused ? <Stage focused={focused} /> : null
}
