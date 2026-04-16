import { DeckLocator } from '@gamepark/react-game'

class DrawPileLocator extends DeckLocator {
  coordinates = { x: 0, y: 8 }
  limit = 10
}

export const drawPileLocator = new DrawPileLocator()