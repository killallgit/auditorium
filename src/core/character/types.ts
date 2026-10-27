export interface PartDescriptor<K extends string = string> {
  readonly id: string
  readonly kind: K
}

export type Body = PartDescriptor<'body'>
export type Head = PartDescriptor<'head'>
export type Outfit = PartDescriptor<'outfit'>
export type Person = PartDescriptor<'person'>
export type Accessory = PartDescriptor<'accessory'>

/** Abstract colour-role names; the UI maps them to theme tokens. */
export type ColorRole = string

export interface Palette {
  readonly id: string
  readonly kind: 'palette'
  readonly skin: ColorRole
  readonly primary: ColorRole
  readonly secondary: ColorRole
  readonly accent: ColorRole
}

export interface CharacterSpec {
  readonly body: Body
  readonly head: Head
  readonly outfit: Outfit
  readonly accessory: Accessory
  readonly palette: Palette
  /** Photo-cutout person; the UI resolves the id to artwork. */
  readonly person: Person
  readonly scale: number
}
