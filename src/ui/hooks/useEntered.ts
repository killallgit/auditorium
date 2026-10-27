import { useEffect, useState } from 'react'

/** False on first paint, true shortly after: lets CSS transitions run on mount. */
export const useEntered = (): boolean => {
  const [entered, setEntered] = useState(false)
  useEffect(() => {
    const id = setTimeout(() => setEntered(true), 30)
    return () => clearTimeout(id)
  }, [])
  return entered
}
