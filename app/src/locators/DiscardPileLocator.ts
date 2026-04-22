import { DeckLocator, SortFunction } from '@gamepark/react-game'

class DiscardPileLocator extends DeckLocator {
  coordinates = { x: 0, y: 19 }
  navigationSorts: SortFunction[] = []
}

export const discardPileLocator = new DiscardPileLocator()