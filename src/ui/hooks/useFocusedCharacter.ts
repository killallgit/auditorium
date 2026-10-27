import { useMemo } from 'react'
import { deriveFocused, type FocusedView } from '../viewmodels/characters'
import { useCharacters } from './useCharacters'
import { useFocus } from './useFocus'
import { useSessionStore } from './useSessionStore'

/** Undefined when nobody is called on. */
export const useFocusedCharacter = (): FocusedView | undefined => {
  const characters = useCharacters()
  const store = useSessionStore()
  const { focus } = useFocus()
  return useMemo(() => deriveFocused(characters, store, focus), [characters, store, focus])
}
