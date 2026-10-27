import { useMemo } from 'react'
import { deriveCharacters, type CharacterView } from '../viewmodels/characters'
import { useFocus } from './useFocus'
import { usePorts } from './usePorts'
import { useSessionStore } from './useSessionStore'

/** Characters in stable seat order (first appearance); departed ones are Absent. */
export const useCharacters = (): readonly CharacterView[] => {
  const store = useSessionStore()
  const { focus } = useFocus()
  const { buildCharacter } = usePorts()
  return useMemo(() => deriveCharacters(store, focus, buildCharacter), [store, focus, buildCharacter])
}
