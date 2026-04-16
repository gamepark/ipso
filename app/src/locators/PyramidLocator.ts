import { PyramidHelper } from '@gamepark/ipso/rules/helper/PyramidHelper.ts'
import { ItemContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { numberCardDescription } from '../material/NumberCardDescription'
import { getSides } from './ViewHelper'

export enum Position {
  TopLeft = 1,
  TopCenter,
  TopRight,
  BottomLeft,
  BottomCenter,
  BottomRight,
  TwoPlayerLeft,
  TwoPlayerRight
}

export const playerPositions = [
  [Position.TwoPlayerLeft, Position.TwoPlayerRight], // 2 Players
  [Position.BottomLeft, Position.TopCenter, Position.BottomRight], // 3 Players
  [Position.BottomLeft, Position.TopLeft, Position.TopRight, Position.BottomRight], // 4 Players
  [Position.BottomLeft, Position.TopLeft, Position.TopCenter, Position.TopRight, Position.BottomRight], // 5 Players
  [Position.BottomLeft, Position.TopLeft, Position.TopCenter, Position.TopRight, Position.BottomRight, Position.BottomCenter] // 6 Players
]

class PyramidLocator extends Locator {
  getPyramidBase(location: Location, context: MaterialContext) {
    const { left, right } = getSides(context)
    const player = location.player
    if (player === left) {
      return { x: -17, y: 22 }
    }
    if (player === right) {
      return { x: 4.4, y: 22 }
    }
    // Not currently viewed — off-screen
    return { x: -200, y: -200 }
  }

  ignore(item: MaterialItem, context: ItemContext) {
    const { left, right } = getSides(context)
    return item.location.player !== left && item.location.player !== right
  }

  getCoordinates(location: Location, context: MaterialContext) {
    const base = this.getPyramidBase(location, context)
    if (location.x !== undefined) {
      const baseGap = numberCardDescription.width + 0.3
      const itemRow = this.getItemRow(location.x)
      const itemPosition = this.getItemPosition(location.x, itemRow)
      const leftMargin = itemRow * baseGap / 2
      return {
        x: base.x + leftMargin + (itemPosition * baseGap),
        y: base.y - (numberCardDescription.height + 0.3) * itemRow
      }
    }
    return base
  }

  getItemCoordinates(item: MaterialItem, context: ItemContext) {
    const itemX = this.getItemX(item, context)
    const itemY = this.getItemY(item, context)
    return { x: itemX, y: itemY }
  }

  getItemX(item: MaterialItem, context: ItemContext) {
    const pyramidCoordinates = this.getPyramidBase(item.location, context)
    const pyramidLeft = pyramidCoordinates.x!
    const baseGap = numberCardDescription.width + 0.3

    const itemIndex = item.location.x!
    const itemRow = this.getItemRow(itemIndex)
    const itemPosition = this.getItemPosition(itemIndex, itemRow)
    const leftMargin = itemRow * baseGap / 2

    return pyramidLeft + leftMargin + (itemPosition * baseGap)
  }

  getItemY(item: MaterialItem, context: ItemContext) {
    const pyramidCoordinates = this.getPyramidBase(item.location, context)
    const pyramidTop = pyramidCoordinates.y!

    const itemRow = this.getItemRow(item.location.x!)
    const rowGap = (numberCardDescription.height + 0.3) * itemRow

    return pyramidTop - rowGap
  }

  getItemRow(itemIndex: number): number {
    if (itemIndex < 5) {
      return 0
    } else if (itemIndex < 9) {
      return 1
    } else if (itemIndex < 12) {
      return 2
    } else if (itemIndex < 14) {
      return 3
    } else {
      return 4
    }
  }

  getItemPosition(itemIndex: number, itemRow: number): number {
    switch (itemRow) {
      case 0:
        return itemIndex
      case 1:
        return itemIndex - 5
      case 2:
        return itemIndex - 9
      case 3:
        return itemIndex - 12
      case 4:
        return itemIndex - 14
    }
    return 0
  }

  getLocations(context: MaterialContext<number, number, number, number, number>): Partial<Location<number, number>>[] {
    return new PyramidHelper(context.rules.game).possibleLocations(true)
  }
}

export const pyramidLocator = new PyramidLocator()
