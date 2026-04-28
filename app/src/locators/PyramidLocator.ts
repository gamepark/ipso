import { MaterialType } from '@gamepark/ipso/material/MaterialType'
import { PyramidHelper } from '@gamepark/ipso/rules/helper/PyramidHelper.ts'
import { DropAreaDescription, getRelativePlayerIndex, HexagonalGridLocator, HexOrientation, isItemContext, ItemContext, MaterialContext, SortFunction } from '@gamepark/react-game'
import { HexGridSystem, isMoveItem, isMoveItemsAtOnce, Location, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import { numberCardDescription } from '../material/NumberCardDescription'
import { getCentralPyramidX, getMiniPyramidScale, getPanelHeight, getPanelSlot, getPanelTablePosition } from '../panels/PanelPosition'
import { getViewedPlayer } from './ViewHelper'

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
    const playerCount = context.rules.players.length
    const z = isItemContext(context) ? 0 : 1
    const playerIndex = getRelativePlayerIndex(context, location.player)

    // 2 players: both pyramids full-size, anchored under their own panel.
    if (playerCount === 2) {
      const { x } = getPanelTablePosition(playerIndex, 2)
      return { x, y: 7, z }
    }

    const viewed = getViewedPlayer(context)
    const viewedIndex = getRelativePlayerIndex(context, viewed)
    if (location.player === viewed) {
      return { x: getCentralPyramidX(viewedIndex, playerCount), y: 7, z }
    }

    // Mini pyramid base = panel center, just below the panel. Hex offsets
    // and the row-centring shift are added (and scaled by F) in
    // `getLocationCoordinates`. Card visuals are scaled via the `scale(F)`
    // transform appended in `placeItem`.
    const F = getMiniPyramidScale(playerCount)
    const slot = getPanelSlot(playerIndex, viewedIndex, playerCount)
    const { x: panelCx, y: panelCy } = getPanelTablePosition(slot, playerCount)
    const panelBottom = panelCy + getPanelHeight(playerCount) / 2
    const baseY = panelBottom + 0.4 + numberCardDescription.height / 2 * F
    return { x: panelCx, y: baseY, z }
  }

  getLocationCoordinates(location: Location, context: MaterialContext) {
    if (location.x === undefined && location.y === undefined) {
      return this.getAreaCoordinates(location, context)
    }
    const { x: baseX = 0, y: baseY = 0, z: baseZ } = this.getCoordinates(location, context)
    const { x: hx = 0, y: hy = 0 } = this.getHexagonPosition(location)
    // Center each pyramid row at baseX by undoing the y-induced x-offset.
    const shiftX = -(location.y ?? 0) * Math.sqrt(3) * this.size.x
    const playerCount = context.rules.players.length

    if (playerCount === 2 || location.player === getViewedPlayer(context)) {
      return { x: baseX + hx + shiftX, y: baseY + hy, z: baseZ }
    }
    // Non-viewed: scale offsets so the mini pyramid is compact (matches
    // the per-card scale(F) appended in placeItem).
    const F = getMiniPyramidScale(playerCount)
    return { x: baseX + (hx + shiftX) * F, y: baseY + hy * F, z: baseZ }
  }

  placeItem(item: MaterialItem, context: ItemContext) {
    const transform = super.placeItem(item, context)
    const playerCount = context.rules.players.length
    if (playerCount > 2 && item.location.player !== getViewedPlayer(context)) {
      const F = getMiniPyramidScale(playerCount)
      transform.push(`scale(${F})`)
    }
    return transform
  }

  getLocations(context: MaterialContext): Partial<Location>[] {
    if (!context.rules.material(MaterialType.NumberCard).selected().length) return []
    return new PyramidHelper(context.rules.game).allLocations()
  }

  navigationSorts: SortFunction[] = []
}

export const pyramidLocator = new PyramidLocator()
