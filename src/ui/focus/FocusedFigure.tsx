import type { CharacterSpec } from '@/core/character'
import { CharacterView } from '../characters/CharacterView'
import { poseFor } from '../rig/pose'

type Props = { readonly spec: CharacterSpec; readonly className?: string }

/** The called-on Character: an ink silhouette offset behind the full-colour figure, outlined in paper. */
export const FocusedFigure = ({ spec, className = '' }: Props) => {
  // The called-on Character is speaking-ready: arm lowered.
  const pose = poseFor('speaking')
  return (
    <div className={`relative h-full ${className}`}>
      <CharacterView
        spec={spec}
        pose={pose}
        silhouette
        className="absolute inset-0 h-full w-full translate-x-3 translate-y-2 opacity-40"
      />
      <CharacterView spec={spec} pose={pose} className="relative h-full w-full drop-shadow-pop" />
    </div>
  )
}
