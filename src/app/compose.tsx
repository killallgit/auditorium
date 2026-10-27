import type { ReactNode } from 'react'
import { buildCharacterDefault } from '@/core/character'
import {
  consoleLogger,
  createMockAdapters,
  intervalScheduler,
  mathRng,
  systemClock,
} from '@/adapters/mock'
import { createDemoFeed, DEMO_PROJECT } from './demo-feed'
import { FocusProvider } from '@/ui/providers/FocusProvider'
import { PortsProvider } from '@/ui/providers/PortsProvider'
import { SessionStoreProvider } from '@/ui/providers/SessionStoreProvider'

const params = new URLSearchParams(window.location.search)
const demo = params.get('demo') === 'focus'
const phase = params.get('phase') === 'listening' ? 'listening' : 'speaking'

const mock = createMockAdapters({
  clock: systemClock,
  rng: mathRng,
  scheduler: intervalScheduler,
  logger: consoleLogger,
})
const ports = {
  ...mock,
  ...(demo ? { feed: createDemoFeed() } : {}),
  buildCharacter: (seed: string) => buildCharacterDefault(seed),
}

export const Composed = ({ children }: { children: ReactNode }) => (
  <PortsProvider ports={ports}>
    <SessionStoreProvider>
      <FocusProvider {...(demo ? { initial: { phase, calledOn: DEMO_PROJECT } } : {})}>{children}</FocusProvider>
    </SessionStoreProvider>
  </PortsProvider>
)
