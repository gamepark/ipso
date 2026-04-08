import { IpsoRules } from '@gamepark/ipso/IpsoRules.ts'
import { CustomMoveType } from '@gamepark/ipso/rules/CustomMoveType.ts'
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from "@gamepark/rules-api"
import { Trans } from 'react-i18next'

export const UseStarCardHeader = () => {
  const player = usePlayerId()
  const rules = useRules<IpsoRules>()!
  const activePlayer = rules.game.rule?.player
  const itsMe = player && activePlayer === player
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.Pass))
  const name = usePlayerName(activePlayer)

  if (itsMe) {
    return <Trans
      i18nKey="header.use-star-card.you"
      defaults="Vous pouvez utiliser votre carte étoile ou <pass>passer</pass>"
      components={{
        pass: <PlayMoveButton move={pass}/>
      }}
    />
  }

  return <Trans
    i18nKey="header.use-star-card.player"
    values={{ player: name }}
  />
}
