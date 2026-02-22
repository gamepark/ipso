import { getRelativePlayerIndex, ItemContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { numberCardDescription } from '../material/NumberCardDescription'

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
  getCoordinates(location: Location, context: MaterialContext) {
    const playerIndex = getRelativePlayerIndex(context, location.player)
    const playerCount = context.rules.players.length
    const position = playerPositions[playerCount - 2][playerIndex]
    switch (position) {
      case Position.TopLeft:
        return { x: -45, y: -5 }
      case Position.TopCenter:
        return { x: -5, y: -5 }
      case Position.TopRight:
        return { x: 30, y: -5 }
      case Position.BottomLeft:
        return { x: -45, y: 22 }
      case Position.BottomCenter:
        return { x: -5, y: 22 }
      case Position.BottomRight:
        return { x: 30, y: 22 }
      case Position.TwoPlayerLeft:
        return { x: -15, y: 7.5 }
      case Position.TwoPlayerRight: {
        return { x: 20, y: 7.5 }
      }
    }
  }

  getItemCoordinates(item: MaterialItem, context: ItemContext) {
    const itemX = this.getItemX(item, context)
    const itemY = this.getItemY(item, context)
    return { x: itemX, y: itemY }
  }

  getItemX(item: MaterialItem, context: ItemContext) {
    const pyramidCoordinates = super.getItemCoordinates(item, context)
    const pyramidLeft = pyramidCoordinates.x!
    const baseGap = numberCardDescription.width + 1

    const itemIndex = item.location.x!
    const itemRow = this.getItemRow(itemIndex)
    const itemPosition = this.getItemPosition(itemIndex, itemRow)
    const leftMargin = itemRow * baseGap / 2

    return pyramidLeft + leftMargin + (itemPosition * baseGap)
  }

  getItemY(item: MaterialItem, context: ItemContext) {
    const pyramidCoordinates = super.getItemCoordinates(item, context)
    const pyramidTop = pyramidCoordinates.y!

    const itemRow = this.getItemRow(item.location.x!)
    const rowGap = (numberCardDescription.height + 1) * itemRow

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
}



export const pyramidLocator = new PyramidLocator()