import type { ProjectId } from './domain'

export type Focus =
  | { readonly phase: 'none' }
  | { readonly phase: 'speaking' | 'listening'; readonly calledOn: ProjectId }

export type FocusAction =
  | { readonly type: 'callOn'; readonly projectId: ProjectId }
  | { readonly type: 'startListening' }
  | { readonly type: 'release' }

export const initialFocus: Focus = { phase: 'none' }

export const focusReducer = (focus: Focus, action: FocusAction): Focus => {
  switch (action.type) {
    case 'callOn':
      return { phase: 'speaking', calledOn: action.projectId }
    case 'startListening':
      return focus.phase === 'speaking' ? { phase: 'listening', calledOn: focus.calledOn } : focus
    case 'release':
      return initialFocus
  }
}
