import { DeckLocator, MaterialContext, SortFunction } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class DiscardPileLocator extends DeckLocator {
  coordinates = { x: 15, y: 20.2 }
  navigationSorts: SortFunction[] = []

  getCoordinates(_location: Location, context: MaterialContext) {
    // 2 players: bottom of the central card column.
    if (context.rules.players.length === 2) return { x: 0, y: 15.2 }
    return this.coordinates
  }
}

export const discardPileLocator = new DiscardPileLocator()