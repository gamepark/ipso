import { CardDescription } from '@gamepark/react-game'
import StarCardImage from '../images/StarCard.jpg'
import { StarCardHelp } from './help/StarCardHelp'

export class StarCardDescription extends CardDescription {
  width = 3
  height = 3
  borderRadius = 0.3

  image = StarCardImage

  help = StarCardHelp
}

export const starCardDescription = new StarCardDescription()