import { DeckLocator } from '@gamepark/react-game'

class DiscardPileLocator extends DeckLocator {
  coordinates = { x: 12, y: 4 }
  limit = 20
}

export const discardPileLocator = new DiscardPileLocator()