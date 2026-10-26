# Auditorium consumes sessions through a bidirectional port, not kaiser-soze directly

Auditorium depends only on `SessionFeed` (inbound ordered, replayable Events; outbound Commands) and a separate `VoiceChannel`. Adapters are the only code that knows kaiser-soze exists, and the seam is enforced by import-boundary lint.

Kaiser-soze is still in development and its wire format will change, so we design the Events we want and mock them, then write an adapter later. The cost is a translation layer. The alternatives were coding to kaiser-soze's shape as it evolves, or a snapshot-based feed. We chose events because they map onto "a Turn ended, raise a hand" and replay easily.
