import { CardDescription } from '@gamepark/react-game'
import StarCardImage from '../images/StarCard.jpg'
import { LocationType } from '@gamepark/ipso/material/LocationType'
import { MaterialType } from '@gamepark/ipso/material/MaterialType'
import { StarCard } from '@gamepark/ipso/material/StarCard'
import { PlayerId } from '@gamepark/ipso/PlayerId'

export class StarCardDescription extends CardDescription<PlayerId, MaterialType, LocationType, StarCard> {
  width = 3
  height = 3
  borderRadius = 0.3

  image = StarCardImage
}

export const starCardDescription = new StarCardDescription()