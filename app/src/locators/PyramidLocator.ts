import { PyramidHelper } from '@gamepark/ipso/rules/helper/PyramidHelper.ts'
import { DropAreaDescription, HexagonalGridLocator, HexOrientation, isItemContext, ItemContext, MaterialContext, SortFunction } from '@gamepark/react-game'
import { HexGridSystem, isMoveItem, isMoveItemsAtOnce, Location, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import { numberCardDescription } from '../material/NumberCardDescription'
import { getSides } from './ViewHelper'

const CARD_GAP = 0.3
const CARD_STEP = numberCardDescription.width + CARD_GAP

// Limit canShortClick to the currently-selected NumberCard so the framework's
// `canClickToMove === (short === 1)` only lights up the drop area of the
// card actually picked by the player (without this, 2 cards in the display
// would both be candidates for each slot → short = 2 → no highlight).
class PyramidDropArea extends DropAreaDescription {
  canShortClick(move: MaterialMove, location: Location, context: MaterialContext): boolean {
    if (!this.isMoveToLocation(move, location, context)) return false
    if (!isMoveItem(move) && !isMoveItemsAtOnce(move)) return false
    const itemIndex = isMoveItem(move) ? move.itemIndex : move.indexes[0]
    const item = context.rules.material(move.itemType).getItem(itemIndex)
    return !!item?.selected
  }
}

class PyramidLocator extends HexagonalGridLocator {
  coordinatesSystem = HexGridSystem.Axial
  orientation = HexOrientation.Pointy
  size = { x: CARD_STEP / Math.sqrt(3), y: CARD_STEP / 1.5 }
  locationDescription = new PyramidDropArea(numberCardDescription)

  getCoordinates(location: Location, context: MaterialContext) {
    const { left, right } = getSides(context)
    let base: { x: number; y: number }
    if (location.player === left) base = { x: -11, y: 8.8 }
    else if (location.player === right) base = { x: 11, y: 8.8 }
    else return { x: -200, y: -200 }

    const shiftX = -(location.y ?? 0) * Math.sqrt(3) * this.size.x
    return { x: base.x + shiftX, y: base.y, z: isItemContext(context) ? 0 : 1 }
  }

  hide(item: MaterialItem, context: ItemContext) {
    const { left, right } = getSides(context)
    return item.location.player !== left && item.location.player !== right
  }

  getLocations(context: MaterialContext): Partial<Location>[] {
    // Strip `rotation` so isLocationSubset(moveLocation, dropLocation) passes:
    // the slot locations carry rotation:true (hidden card) while the placement
    // moves target the slot with rotation:false (face-up) — without this,
    // isMoveToLocation returns false for every legal move.
    return new PyramidHelper(context.rules.game).possibleLocations(true).map(({ rotation: _r, ...rest }) => rest)
  }

  navigationSorts: SortFunction[] = []
}

export const pyramidLocator = new PyramidLocator()
