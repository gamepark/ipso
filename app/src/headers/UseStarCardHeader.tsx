import { IpsoRules } from '@gamepark/ipso/IpsoRules.ts'
import { LocationType } from '@gamepark/ipso/material/LocationType.ts'
import { MaterialType } from '@gamepark/ipso/material/MaterialType.ts'
import { CustomMoveType } from '@gamepark/ipso/rules/CustomMoveType.ts'
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType, isMoveItemType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const UseStarCardHeader = () => {
  const player = usePlayerId()
  const rules = useRules<IpsoRules>()!
  const activePlayer = rules.game.rule?.player
  const itsMe = player && activePlayer === player
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.Pass))
  const use = useLegalMove(move => isMoveItemType(MaterialType.StarCard)(move) && move.location.type === LocationType.DiscardPile)
  const name = usePlayerName(activePlayer)

  if (itsMe) {
    return <Trans
      i18nKey="header.use-star-card.you"
      components={{
        pass: <PlayMoveButton move={pass}/>,
        use: <PlayMoveButton move={use}/>
      }}
    />
  }

  return <Trans
    i18nKey="header.use-star-card.player"
    values={{ player: name }}
  />
}
