import { CardDescription } from '@gamepark/react-game'
import StarCard from '../images/StarCard.jpg'
import { LocationType } from '@gamepark/ipso/material/LocationType'
import { MaterialType } from '@gamepark/ipso/material/MaterialType'
import { NumberCard } from '@gamepark/ipso/material/NumberCard'
import { PlayerId } from '@gamepark/ipso/PlayerId'

export class StarCardDescription extends CardDescription<PlayerId, MaterialType, LocationType, NumberCard> {
  width = 3
  height = 3
  borderRadius = 0.3

  image = StarCard
}

export const starCardDescription = new StarCardDescription()