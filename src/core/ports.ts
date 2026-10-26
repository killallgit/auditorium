import type { SessionId } from './domain'
import type { Event } from './events'

export type Unsubscribe = () => void

export type SessionFeed = {
  subscribe(listener: (event: Event) => void): Unsubscribe
  getTranscript(sessionId: SessionId): Promise<string>
}

/** Outbound Commands. No shapes yet; nothing can be sent. */
export type CommandSink = {
  send(command: never): void
}

export type VoiceChannel = {
  speak(text: string): void
}
