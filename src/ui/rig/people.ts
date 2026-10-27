import studentFore from '../assets/people/student/fore.png'
import studentHead from '../assets/people/student/head.png'
import studentTorso from '../assets/people/student/torso.png'
import studentUpper from '../assets/people/student/upper.png'
import studentPivots from '../assets/people/student/pivots.json'
import type { PersonRig } from './PhotoFigure'

export const PEOPLE: Readonly<Record<string, PersonRig>> = {
  student: {
    layers: { torso: studentTorso, fore: studentFore, upper: studentUpper, head: studentHead },
    pivots: studentPivots as PersonRig['pivots'],
  },
}

export const personRig = (id: string): PersonRig | undefined => PEOPLE[id]
