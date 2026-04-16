import { DeckLocator } from '@gamepark/react-game'

class DiscardPileLocator extends DeckLocator {
  coordinates = { x: 0, y: 19 }
  limit = 20
}

export const discardPileLocator = new DiscardPileLocator()