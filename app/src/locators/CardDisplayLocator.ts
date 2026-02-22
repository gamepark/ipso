import { ListLocator } from '@gamepark/react-game'
import { numberCardDescription } from '../material/NumberCardDescription'

class CardDisplayLocator extends ListLocator {
  coordinates = { x: 10, y: 0 }
  gap = { x: numberCardDescription.width + 1, z: 0 }
}

export const cardDisplayLocator = new CardDisplayLocator()