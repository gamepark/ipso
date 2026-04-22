/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/ipso/material/LocationType'
import { MaterialType } from '@gamepark/ipso/material/MaterialType'
import { CustomMoveType } from '@gamepark/ipso/rules/CustomMoveType'
import { CardDescription, ItemContext, ItemMenuButton } from '@gamepark/react-game'
import { isCustomMoveType, isMoveItemType, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import StarCardImage from '../images/StarCard.jpg'
import { StarCardHelp } from './help/StarCardHelp'

export class StarCardDescription extends CardDescription {
  width = 3
  height = 3
  borderRadius = 0.3

  image = StarCardImage

  help = StarCardHelp

  menuAlwaysVisible = true

  getItemMenu(item: MaterialItem, context: ItemContext, legalMoves: MaterialMove[]) {
    if (item.location.player !== context.player) return null

    const discard = legalMoves.find(move => isMoveItemType(MaterialType.StarCard)(move) && move.location.type === LocationType.DiscardPile)
    const keep = legalMoves.find(move => isCustomMoveType(CustomMoveType.Pass)(move))

    if (!discard && !keep) return null

    return <>
      {discard &&
        <ItemMenuButton x={3} y={-1.25} label={'Défausser'} labelPosition="right" move={discard} css={smaller}>
          <FontAwesomeIcon icon={faTrash} />
        </ItemMenuButton>
      }
      {keep &&
        <ItemMenuButton x={3} y={1.25} label={'Garder'} labelPosition="right"  move={keep} css={smaller}>
          <FontAwesomeIcon icon={faCheck} />
        </ItemMenuButton>
      }
    </>
  }
}

const smaller = css`
  font-size: 0.7em;
`

export const starCardDescription = new StarCardDescription()
