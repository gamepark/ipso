import { LocationType } from '@gamepark/ipso/material/LocationType'
import { MaterialType } from '@gamepark/ipso/material/MaterialType'
import { ItemContext, MaterialGameAnimations } from '@gamepark/react-game'
import { isDeleteItemType, isMoveItemType, MaterialItem } from '@gamepark/rules-api'
import { CardDisplayLocator } from '../locators/CardDisplayLocator'

export const gameAnimations = new MaterialGameAnimations()

const isCardMove = isMoveItemType(MaterialType.NumberCard)

// Same positioning as CardDisplay, but face-down: used as a mid-animation
// waypoint so the card flips on the spot before sliding under the pile.
class FlippedCardDisplayLocator extends CardDisplayLocator {
  placeItem(item: MaterialItem, context: ItemContext): string[] {
    return [...super.placeItem(item, context), 'rotateY(180deg)']
  }
}

const flippedCardDisplayLocator = new FlippedCardDisplayLocator()

// Card returned from the river to the bottom of the draw pile (StarCard
// pass): the card flips face-down on the spot, then slides under the pile.
gameAnimations
  .configure((move, context) => {
    if (!isCardMove(move) || move.location.type !== LocationType.DrawPile) return false
    const item = context.rules.material(MaterialType.NumberCard).getItem(move.itemIndex)
    return item?.location.type === LocationType.CardDisplay
  })
  .duration(1400)
  .via({
    at: 0.4,
    locator: flippedCardDisplayLocator,
    location: (item) => item.location,
    elevation: 0
  })

// Non-ascending lines are removed at scoring: fade out.
gameAnimations
  .configure((move) => isDeleteItemType(MaterialType.NumberCard)(move))
  .duration(600)
