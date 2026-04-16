import { ListLocator } from '@gamepark/react-game'
import { numberCardDescription } from '../material/NumberCardDescription'

class CardDisplayLocator extends ListLocator {
  coordinates = { x: 0, y: 11.5 }
  gap = { y: numberCardDescription.height + 0.3, z: 0 }
}

export const cardDisplayLocator = new CardDisplayLocator()