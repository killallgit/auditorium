import type { CharacterSpec } from '@/core/character'
import { PhotoFigure } from '../rig/PhotoFigure'
import { personRig } from '../rig/people'
import type { Pose } from '../rig/pose'
import { CharacterFigure } from './CharacterFigure'

type Props = {
  readonly spec: CharacterSpec
  readonly pose: Pose
  readonly silhouette?: boolean
  readonly className?: string | undefined
}

/** Photo figure when the spec's person has artwork; otherwise the vector figure. */
export const CharacterView = ({ spec, pose, silhouette = false, className }: Props) => {
  const rig = personRig(spec.person.id)
  return rig ? (
    <div className={className} style={{ transform: `scale(${spec.scale})`, transformOrigin: 'bottom center' }}>
      <PhotoFigure person={rig} pose={pose} silhouette={silhouette} className="h-full w-full" />
    </div>
  ) : (
    <CharacterFigure spec={spec} scale={spec.scale} silhouette={silhouette} className={className ?? ''} />
  )
}
