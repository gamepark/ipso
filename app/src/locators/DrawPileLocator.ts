import { DeckLocator } from '@gamepark/react-game'

class DrawPileLocator extends DeckLocator {
  coordinates = { x: 6, y: 0 }
  limit = 10
}

export const drawPileLocator = new DrawPileLocator()