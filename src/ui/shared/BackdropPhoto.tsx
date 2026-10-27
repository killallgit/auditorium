type Props = { readonly src: string }

/** Full-bleed, washed-out photo behind content (collage backdrop). */
export const BackdropPhoto = ({ src }: Props) => (
  <img
    src={src}
    alt=""
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-30 mix-blend-multiply grayscale-[0.6] sepia"
  />
)
