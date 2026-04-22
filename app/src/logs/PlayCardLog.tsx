import { IpsoRules } from '@gamepark/ipso/IpsoRules'
import { MaterialType } from '@gamepark/ipso/material/MaterialType'
import { NumberCard, numberCardData } from '@gamepark/ipso/material/NumberCard'
import { MoveComponentProps, usePlayerName } from '@gamepark/react-game'
import { MaterialGame, MaterialMove, MoveItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { CardChip } from './CardChip'

export const PlayCardLog: FC<MoveComponentProps<MaterialMove>> = ({ move, context }) => {
  const rules = new IpsoRules(context.game as MaterialGame)
  const moveItem = move as MoveItem
  const item = rules.material(MaterialType.NumberCard).getItem(moveItem.itemIndex)
  const cardId = (item.id ?? moveItem.reveal?.id) as NumberCard
  const number = cardId !== undefined ? numberCardData[cardId as Exclude<NumberCard, NumberCard.TopStar>]?.number : undefined
  const playerName = usePlayerName(context.game.rule?.player)

  return (
    <Trans
      i18nKey="log.play-card"
      values={{ player: playerName, number }}
      components={{
        card: <CardChip item={item} revealedId={moveItem.reveal?.id as NumberCard | undefined} />
      }}
    />
  )
}
