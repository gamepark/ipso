import { DeckLocator, MaterialContext, SortFunction } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class DrawPileLocator extends DeckLocator {
  coordinates = { x: 15, y: 16.9 }
  limit = 10
  navigationSorts: SortFunction[] = []

  getCoordinates(_location: Location, context: MaterialContext) {
    // 2 players: top of the central card column.
    if (context.rules.players.length === 2) return { x: 0, y: 5.3 }
    return this.coordinates
  }
}

export const drawPileLocator = new DrawPileLocator()