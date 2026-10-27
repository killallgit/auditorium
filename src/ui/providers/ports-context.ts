import { createContext } from 'react'
import type { CommandSink, SessionFeed, VoiceChannel } from '@/core/ports'
import type { CharacterSpec } from '@/core/character'

export type Ports = {
  readonly feed: SessionFeed
  readonly voice: VoiceChannel
  readonly commands: CommandSink
  /** Builds a Character's look from a seed (the project id). */
  readonly buildCharacter: (seed: string) => CharacterSpec
}

export const PortsContext = createContext<Ports | null>(null)
