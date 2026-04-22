import { Locator, getRelativePlayerIndex, MaterialContext, ItemContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { getPanelTablePosition, getPanelHeight } from '../panels/PanelPosition'

/**
 * Animation-only locators for waypoints through player panels.
 * Uses PanelPosition.ts as single source of truth for coordinates.
 */

/** Center of the panel — items disappear/appear here (scale 0.001) */
class OnPlayerPanelLocator extends Locator {
  getCoordinates(location: Location, context: MaterialContext) {
    const playerCount = context.rules.players.length
    const playerIndex = getRelativePlayerIndex(context, location.player)
    return { ...getPanelTablePosition(playerIndex, playerCount), z: 100 }
  }

  placeItem(item: MaterialItem, context: ItemContext) {
    return [...super.placeItem(item, context), 'scale(0.001)']
  }
}

/** Just below the panel — items pause here visibly */
class BelowPlayerPanelLocator extends Locator {
  getCoordinates(location: Location, context: MaterialContext) {
    const playerCount = context.rules.players.length
    const playerIndex = getRelativePlayerIndex(context, location.player)
    const { x, y } = getPanelTablePosition(playerIndex, playerCount)
    return { x, y: y + getPanelHeight(playerCount) / 2 + 2, z: 100 }
  }
}

export const onPlayerPanelLocator = new OnPlayerPanelLocator()
export const belowPlayerPanelLocator = new BelowPlayerPanelLocator()
