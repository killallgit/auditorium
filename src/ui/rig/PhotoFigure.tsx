import { foreTransform } from './elbow'
import type { Pose } from './pose'
import type { Point } from './elbow'

export type LayerName = 'torso' | 'fore' | 'upper' | 'head'

export type PersonRig = {
  readonly layers: Readonly<Record<LayerName, string>>
  readonly pivots: {
    readonly size: { readonly width: number; readonly height: number }
    readonly neck: Point
    readonly shoulder: Point
    readonly elbow: Point
    readonly order: readonly LayerName[]
  }
}

type Props = {
  readonly person: PersonRig
  readonly pose: Pose
  /** Flat ink silhouette. */
  readonly silhouette?: boolean
  readonly className?: string
}

const TRANSITION = 'motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-in-out'

/** Photo-cutout figure: layered images posed by rotating limbs about their pivots. */
export const PhotoFigure = ({ person, pose, silhouette = false, className = '' }: Props) => {
  const { layers, pivots } = person
  const { width, height } = pivots.size
  const pct = (p: Point): string => `${(p.x / width) * 100}% ${(p.y / height) * 100}%`
  const fore = foreTransform(pivots.shoulder, pivots.elbow, pose.upper, pose.fore)
  const px = (n: number, total: number): string => `${(n / total) * 100}%`

  const motion: Readonly<Record<LayerName, { transform?: string; transformOrigin?: string }>> = {
    torso: {},
    upper: { transform: `rotate(${pose.upper}deg)`, transformOrigin: pct(pivots.shoulder) },
    fore: {
      transform: `translate(${px(fore.translate.x, width)}, ${px(fore.translate.y, height)}) rotate(${fore.rotate}deg)`,
      transformOrigin: pct(pivots.elbow),
    },
    head: { transform: `rotate(${pose.head}deg)`, transformOrigin: pct(pivots.neck) },
  }

  return (
    <div className={`flex items-end justify-center ${className}`} aria-hidden="true">
      <div className="relative h-full max-w-full" style={{ aspectRatio: `${width} / ${height}` }}>
        {pivots.order.map((name) => (
          <img
            key={name}
            src={layers[name]}
            alt=""
            draggable={false}
            className={`absolute inset-0 h-full w-full select-none ${TRANSITION}`}
            style={{ ...motion[name], filter: silhouette ? 'brightness(0)' : undefined }}
          />
        ))}
      </div>
    </div>
  )
}
