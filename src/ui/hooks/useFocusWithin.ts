import { useEffect, useRef, type RefObject } from 'react'

/** Moves focus into the element on mount and restores the previous focus on unmount. */
export const useFocusWithin = <T extends HTMLElement>(): RefObject<T | null> => {
  const ref = useRef<T>(null)
  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null
    ref.current?.focus()
    return () => previous?.focus()
  }, [])
  return ref
}
