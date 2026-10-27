import type { CommandSink, VoiceChannel } from '../../core/ports'
import type { Logger } from './ports'

export const createLoggingVoice = (logger: Logger): VoiceChannel => ({
  speak: (text) => logger.log(`[voice] ${text}`),
})

export const createNoopCommands = (): CommandSink => ({ send: () => undefined })
