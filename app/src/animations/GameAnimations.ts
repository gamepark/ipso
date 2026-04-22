import { LocationType } from '@gamepark/ipso/material/LocationType'
import { MaterialType } from '@gamepark/ipso/material/MaterialType'
import { PlayerId } from '@gamepark/ipso/PlayerId'
import { MaterialGameAnimations, MaterialContext } from '@gamepark/react-game'
import { isMoveItemType, isDeleteItemType, MaterialItem } from '@gamepark/rules-api'
import { getSides } from '../locators/ViewHelper'
import { onPlayerPanelLocator, belowPlayerPanelLocator } from '../locators/OnPlayerPanelLocator'

function isPlayerVisible(item: MaterialItem, context: MaterialContext): boolean {
  const { left, right } = getSides(context)
  return item.location.player === left || item.location.player === right
}

export const gameAnimations = new MaterialGameAnimations()

const isCardMove = isMoveItemType(MaterialType.NumberCard)
const isStarCardMove = isMoveItemType(MaterialType.StarCard)

// Closure to capture the destination player from the move
let trajectoryPlayer: PlayerId | undefined

// Card from CardDisplay → Pyramid (visible player): normal animation
gameAnimations
  .configure((move, context) =>
    isCardMove(move) && move.location.type === LocationType.Pyramid &&
    isPlayerVisible({ location: { player: move.location.player } } as MaterialItem, context)
  )
  .duration(500)

// Card from CardDisplay → Pyramid (non-visible player): pause below panel then disappear into panel
gameAnimations
  .configure((move, context) => {
    if (!isCardMove(move) || move.location.type !== LocationType.Pyramid) return false
    if (isPlayerVisible({ location: { player: move.location.player } } as MaterialItem, context)) return false
    trajectoryPlayer = move.location.player
    return true
  })
  .duration(1500)
  .trajectory(() => ({
    elevation: false,
    waypoints: [
      { at: 0.3, locator: belowPlayerPanelLocator, location: () => ({ player: trajectoryPlayer }) },
      { at: 0.6, locator: belowPlayerPanelLocator, location: () => ({ player: trajectoryPlayer }) },
      { at: 1, locator: onPlayerPanelLocator, location: () => ({ player: trajectoryPlayer }) }
    ]
  }))

// Card from Pyramid → CardDisplay (non-visible player): appear from panel, pause below, then to display
gameAnimations
  .configure((move, context) => {
    if (!isCardMove(move) || move.location.type !== LocationType.CardDisplay) return false
    const item = context.rules.material(MaterialType.NumberCard).getItem(move.itemIndex)
    if (!item || item.location.type !== LocationType.Pyramid || isPlayerVisible(item, context)) return false
    trajectoryPlayer = item.location.player
    return true
  })
  .duration(1500)
  .trajectory(() => ({
    elevation: false,
    waypoints: [
      { at: 0, locator: onPlayerPanelLocator, location: () => ({ player: trajectoryPlayer }) },
      { at: 0.35, locator: belowPlayerPanelLocator, location: () => ({ player: trajectoryPlayer }) },
      { at: 0.65, locator: belowPlayerPanelLocator, location: () => ({ player: trajectoryPlayer }) }
    ]
  }))

// Card from Pyramid → DiscardPile (visible player): normal animation
gameAnimations
  .configure((move, context) => {
    if (!isCardMove(move) || move.location.type !== LocationType.DiscardPile) return false
    const item = context.rules.material(MaterialType.NumberCard).getItem(move.itemIndex)
    return item?.location.type === LocationType.Pyramid && isPlayerVisible(item, context)
  })
  .duration(500)

// Card from Pyramid → DiscardPile (non-visible player): appear from panel, pause below, then to discard
gameAnimations
  .configure((move, context) => {
    if (!isCardMove(move) || move.location.type !== LocationType.DiscardPile) return false
    const item = context.rules.material(MaterialType.NumberCard).getItem(move.itemIndex)
    if (!item || item.location.type !== LocationType.Pyramid || isPlayerVisible(item, context)) return false
    trajectoryPlayer = item.location.player
    return true
  })
  .duration(1500)
  .trajectory(() => ({
    elevation: false,
    waypoints: [
      { at: 0, locator: onPlayerPanelLocator, location: () => ({ player: trajectoryPlayer }) },
      { at: 0.35, locator: belowPlayerPanelLocator, location: () => ({ player: trajectoryPlayer }) },
      { at: 0.65, locator: belowPlayerPanelLocator, location: () => ({ player: trajectoryPlayer }) }
    ]
  }))

// Star card move to DiscardPile (visible): normal
gameAnimations
  .configure((move, context) => {
    if (!isStarCardMove(move) || move.location.type !== LocationType.DiscardPile) return false
    const item = context.rules.material(MaterialType.StarCard).getItem(move.itemIndex)
    return item?.location.type === LocationType.Pyramid && isPlayerVisible(item, context)
  })
  .duration(500)

// Star card move to DiscardPile (non-visible): appear from panel, pause below, then to discard
gameAnimations
  .configure((move, context) => {
    if (!isStarCardMove(move) || move.location.type !== LocationType.DiscardPile) return false
    const item = context.rules.material(MaterialType.StarCard).getItem(move.itemIndex)
    if (!item || item.location.type !== LocationType.Pyramid || isPlayerVisible(item, context)) return false
    trajectoryPlayer = item.location.player
    return true
  })
  .duration(1500)
  .trajectory(() => ({
    elevation: false,
    waypoints: [
      { at: 0, locator: onPlayerPanelLocator, location: () => ({ player: trajectoryPlayer }) },
      { at: 0.35, locator: belowPlayerPanelLocator, location: () => ({ player: trajectoryPlayer }) },
      { at: 0.65, locator: belowPlayerPanelLocator, location: () => ({ player: trajectoryPlayer }) }
    ]
  }))

// Delete items (non-ascending lines): fade
gameAnimations
  .configure((move) =>
    isDeleteItemType(MaterialType.NumberCard)(move)
  )
  .duration(600)
