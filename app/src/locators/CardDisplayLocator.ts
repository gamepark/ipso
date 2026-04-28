import { ItemContext, ListLocator, MaterialContext, SortFunction } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { numberCardDescription } from '../material/NumberCardDescription'

export class CardDisplayLocator extends ListLocator {
  coordinates = { x: 11.5, y: 16.9 }
  gap = { y: numberCardDescription.height + 0.3, z: 0 }
  navigationSorts: SortFunction[] = []

  getCoordinates(_location: Location, context: MaterialContext) {
    // 2 players: single column at table center, items 0/1 stacked between
    // the draw pile (above) and the discard pile (below).
    if (context.rules.players.length === 2) return { x: 0, y: 8.6 }
    return this.coordinates
  }

  placeItem(item: MaterialItem, context: ItemContext): string[] {
    const transforms = super.placeItem(item, context)
    if (item.selected) transforms.push('translateX(-2em)')
    return transforms
  }
}

export const cardDisplayLocator = new CardDisplayLocator()