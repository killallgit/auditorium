# Auditorium

A desktop alert manager for coding agents. It shows each active project as a character in an auditorium and lets the user hear and answer agents when their turns end.

## Language

**Auditorium**:
The whole desktop experience: the room of Characters and the user's place in it.

**Project**:
A stable identity, such as a repo or workspace, that one or more Sessions work in.
_Avoid_: Workspace, repo, folder

**Character**:
The on-screen persona of a Project. Each Project has exactly one Character and one seat.
_Avoid_: Avatar, person, seat (as a synonym)

**Session**:
A single agent run inside a Project, from any tool, local or remote.
_Avoid_: Agent (as a noun for the run), thread, job

**Turn**:
One agent response cycle within a Session. Ending a Turn makes the Session Awaiting.
_Avoid_: Response, message, step

**Awaiting**:
The state of a Session whose Turn has ended and which is ready to be heard and answered.
_Avoid_: Idle, done, waiting

**Raised Hand**:
A Character's signal that at least one of its Sessions is Awaiting. There is one per Project, carrying a count and a queue.
_Avoid_: Notification, alert, badge

**Queue**:
The ordered list of Awaiting Sessions behind a Raised Hand, oldest first.

**Calling On**:
The user choosing a Character with a Raised Hand so it speaks the oldest Awaiting Session's last transcript part.
_Avoid_: Opening, selecting

## The seam

**Kaiser-soze**:
The separate service that emits real-time messages from all coding tools and agents. Auditorium never depends on its wire format.

**Seam**:
The boundary between Auditorium and everything outside it. Everything above it is Auditorium; everything below is an Adapter.

**SessionFeed**:
The port across the seam that carries inbound Events and outbound Commands for Sessions.

**VoiceChannel**:
The separate port that carries text to speak and returns transcribed utterances and recognised intents.

**Adapter**:
The only code that knows how an outside system works. It translates that system into a port's shape.

**Event**:
An ordered, timestamped, replayable inbound fact on SessionFeed. Auditorium derives all its state from the Event stream.
_Avoid_: Message, notification, snapshot

**Command**:
An outbound user intent on SessionFeed, such as replying to a Session, dismissing it, or sending direction.
_Avoid_: Action, request
