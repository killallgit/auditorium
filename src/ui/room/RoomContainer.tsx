import { useCallOn } from '../hooks/useCallOn'
import { useCharacters } from '../hooks/useCharacters'
import { Room } from './Room'

export const RoomContainer = () => <Room characters={useCharacters()} onCallOn={useCallOn()} />
