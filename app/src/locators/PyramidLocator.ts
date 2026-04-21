import { PyramidHelper } from '@gamepark/ipso/rules/helper/PyramidHelper.ts'
import { DropAreaDescription, HexagonalGridLocator, HexOrientation, ItemContext, MaterialContext } from '@gamepark/react-game'
import { HexGridSystem, Location, MaterialItem } from '@gamepark/rules-api'
import { numberCardDescription } from '../material/NumberCardDescription'
import { getSides } from './ViewHelper'

const CARD_GAP = 0.3
const CARD_STEP = numberCardDescription.width + CARD_GAP

class PyramidLocator extends HexagonalGridLocator {
  coordinatesSystem = HexGridSystem.Axial
  orientation = HexOrientation.Pointy
  size = { x: CARD_STEP / Math.sqrt(3), y: CARD_STEP / 1.5 }
  locationDescription = new DropAreaDescription(numberCardDescription)

  getCoordinates(location: Location, context: MaterialContext) {
    const { left, right } = getSides(context)
    let base: { x: number; y: number }
    if (location.player === left) base = { x: -11, y: 8.8 }
    else if (location.player === right) base = { x: 11, y: 8.8 }
    else return { x: -200, y: -200 }

    const shiftX = -(location.y ?? 0) * Math.sqrt(3) * this.size.x
    return { x: base.x + shiftX, y: base.y }
  }

  hide(item: MaterialItem, context: ItemContext) {
    const { left, right } = getSides(context)
    return item.location.player !== left && item.location.player !== right
  }

  getLocations(context: MaterialContext): Partial<Location>[] {
    return new PyramidHelper(context.rules.game).possibleLocations(true)
  }
}

export const pyramidLocator = new PyramidLocator()
