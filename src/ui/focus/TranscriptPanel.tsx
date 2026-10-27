import { useId, useState, type SubmitEvent } from 'react'
import { Label } from '../shared/Label'
import { Paper } from '../shared/Paper'

type Props = {
  readonly name: string
  readonly excerpt?: string
  readonly summary?: string
  readonly question?: string
  readonly showReply: boolean
  readonly onListen: () => void
  readonly onRelease: () => void
  readonly onSubmitReply: (text: string) => void
}

const button = 'cursor-pointer bg-ink-1 px-4 py-2 font-label tracking-widest text-paper-1 uppercase shadow-cut-sm focus-visible:outline-4 focus-visible:outline-accent-2'

export const TranscriptPanel = ({ name, excerpt, summary, question, showReply, onListen, onRelease, onSubmitReply }: Props) => {
  const [text, setText] = useState('')
  const replyId = useId()
  const submit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmitReply(text)
  }
  return (
    <Paper tilt={1} className="flex max-h-full w-full flex-col gap-4 overflow-y-auto p-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <Label className="block text-accent-1">Calling on</Label>
          <h2 id="focus-title" className="text-3xl font-black">{name}</h2>
        </div>
        <button type="button" className={button} onClick={onRelease}>
          Release
        </button>
      </header>
      {summary && (
        <section aria-label="Spoken summary">
          <Label className="block text-accent-2">Summary</Label>
          <p className="text-lg">{summary}</p>
        </section>
      )}
      {question && (
        <section aria-label="Question">
          <Label className="block text-accent-1">Question</Label>
          <p className="text-lg font-bold">{question}</p>
        </section>
      )}
      <section aria-label="Transcript excerpt">
        <Label className="block text-ink-3">Last turn</Label>
        <pre className="max-h-48 overflow-y-auto bg-paper-2 p-3 font-label text-sm whitespace-pre-wrap">
          {excerpt ?? 'Nothing to show.'}
        </pre>
      </section>
      {showReply ? (
        <form className="flex flex-col gap-2" onSubmit={submit}>
          <label htmlFor={replyId}>
            <Label>Your reply</Label>
          </label>
          <textarea
            id={replyId}
            autoFocus
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="bg-paper-2 p-3 text-lg shadow-cut-sm focus-visible:outline-4 focus-visible:outline-accent-2"
          />
          <div>
            <button type="submit" className={button}>
              Send reply
            </button>
          </div>
        </form>
      ) : (
        <div>
          <button type="button" className={button} onClick={onListen}>
            Reply
          </button>
        </div>
      )}
    </Paper>
  )
}
