import { DeckLocator } from '@gamepark/react-game'

class DrawPileLocator extends DeckLocator {
  coordinates = { x: -4, y: 0 }
  limit = 20
}

export const drawPileLocator = new DrawPileLocator()