import { MoveComponentProps, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { IpsoRules } from '@gamepark/ipso/IpsoRules'
import { MaterialType } from '@gamepark/ipso/material/MaterialType'
import { NumberCard, numberCardData } from '@gamepark/ipso/material/NumberCard'
import { MaterialGame, MaterialMove, MaterialMoveBuilder, MoveItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const DiscardCardLog: FC<MoveComponentProps<MaterialMove>> = ({ move, context }) => {
  const rules = new IpsoRules(context.game as MaterialGame)
  const moveItem = move as MoveItem
  const item = rules.material(MaterialType.NumberCard).getItem(moveItem.itemIndex)
  const cardId = (item.id ?? moveItem.reveal?.id) as NumberCard
  const number = cardId !== undefined ? numberCardData[cardId].number : undefined
  const playerName = usePlayerName(context.game.rule?.player)

  return (
    <Trans
      defaults="{player} a défaussé la <card>carte {number}</card>"
      i18nKey="log.discard-from-pile"
      values={{ player: playerName, number }}
      components={{
        card: <PlayMoveButton move={displayMaterialHelp(MaterialType.NumberCard, item)} transient />
      }}
    />
  )
}
