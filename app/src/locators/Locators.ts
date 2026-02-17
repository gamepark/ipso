import { LocationType } from '@gamepark/ipso/material/LocationType'
import { MaterialType } from '@gamepark/ipso/material/MaterialType'
import { PlayerId } from '@gamepark/ipso/PlayerId'
import { Locator } from '@gamepark/react-game'
import { drawPileLocator } from './DrawPileLocator'
import { cardDisplayLocator } from './CardDisplayLocator'
import { pyramidLocator } from './PyramidLocator'

export const Locators: Partial<Record<LocationType, Locator<PlayerId, MaterialType, LocationType>>> = {
  [LocationType.DrawPile]: drawPileLocator,
  [LocationType.CardDisplay]: cardDisplayLocator,
  [LocationType.Pyramid]: pyramidLocator
}
