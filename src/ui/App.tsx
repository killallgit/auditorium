import { FocusStageContainer } from './focus/FocusStageContainer'
import { useFocus } from './hooks/useFocus'
import { RoomContainer } from './room/RoomContainer'
import { Label } from './shared/Label'
import { Paper } from './shared/Paper'
import { BackdropPhoto } from './shared/BackdropPhoto'
import theatre from './assets/background/theatre-1921.jpg'

export const App = () => {
  const { focus } = useFocus()
  const focused = focus.phase !== 'none'
  return (
    <>
      <main
        inert={focused}
        aria-hidden={focused}
        className={`relative isolate flex min-h-screen flex-col gap-8 bg-paper-2 p-8 font-display text-ink-1 motion-safe:transition-[filter] motion-safe:duration-500 ${focused ? 'blur-sm' : 'blur-none'}`}
      >
        <BackdropPhoto src={theatre} />
        <header>
          <Paper tilt={-1} className="inline-block px-6 py-3">
            <Label className="block text-accent-1">Vol. 1 — the room</Label>
            <h1 className="text-5xl font-black tracking-tight">Auditorium</h1>
          </Paper>
        </header>
        <RoomContainer />
      </main>
      <FocusStageContainer />
    </>
  )
}
