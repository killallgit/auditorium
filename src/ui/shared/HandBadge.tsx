import type { Urgency } from '@/core/domain'

export const URGENCY_CLASS: Readonly<Record<Urgency, string>> = {
  routine: 'bg-accent-3 text-ink-1',
  blocked: 'bg-accent-1 text-paper-1',
}

type Props = { readonly count: number; readonly urgency: Urgency }

export const HandBadge = ({ count, urgency }: Props) => (
  <span
    className={`inline-flex min-w-6 items-center justify-center px-1.5 font-label text-sm shadow-cut-sm ${URGENCY_CLASS[urgency]}`}
  >
    <span aria-hidden="true">✋</span>
    {count}
  </span>
)
