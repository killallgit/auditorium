import type { CommandSink, SessionFeed, VoiceChannel } from '../../core/ports'
import type { Logger } from './ports'
import { createRandomFeed, type RandomFeedDeps } from './random-feed'
import { createLoggingVoice, createNoopCommands } from './voice-and-commands'

export type MockAdapters = {
  readonly feed: SessionFeed
  readonly voice: VoiceChannel
  readonly commands: CommandSink
}

export const createMockAdapters = (deps: RandomFeedDeps & { readonly logger: Logger }): MockAdapters => ({
  feed: createRandomFeed(deps),
  voice: createLoggingVoice(deps.logger),
  commands: createNoopCommands(),
})

export * from './ports'
export * from './system'
