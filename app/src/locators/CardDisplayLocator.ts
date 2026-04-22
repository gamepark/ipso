import { ItemContext, ListLocator, SortFunction } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { numberCardDescription } from '../material/NumberCardDescription'

class CardDisplayLocator extends ListLocator {
  coordinates = { x: 0, y: 11.5 }
  gap = { y: numberCardDescription.height + 0.3, z: 0 }
  navigationSorts: SortFunction[] = []

  placeItem(item: MaterialItem, context: ItemContext): string[] {
    const transforms = super.placeItem(item, context)
    if (item.selected) transforms.push('translateX(-2em)')
    return transforms
  }
}

export const cardDisplayLocator = new CardDisplayLocator()