import { LocationType } from '@gamepark/ipso/material/LocationType'
import { MaterialType } from '@gamepark/ipso/material/MaterialType'
import { PlayerColor } from '@gamepark/ipso/PlayerColor'
import { Locator } from '@gamepark/react-game'

export const Locators: Partial<Record<LocationType, Locator<PlayerColor, MaterialType, LocationType>>> = {}
