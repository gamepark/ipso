import { LogDescription, MoveComponentContext, MovePlayedLogDescription } from '@gamepark/react-game'
import { isCustomMoveType, isMoveItemType, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/ipso/material/LocationType'
import { MaterialType } from '@gamepark/ipso/material/MaterialType'
import { isTopStar, NumberCard } from '@gamepark/ipso/material/NumberCard'
import { CustomMoveType } from '@gamepark/ipso/rules/CustomMoveType'
import { RuleId } from '@gamepark/ipso/rules/RuleId'
import { PlayerId } from '@gamepark/ipso/PlayerId'
import { DiscardCardLog } from './DiscardCardLog.tsx'
import { DisplayCardLog } from './DisplayCardLog.tsx'
import { PassLog } from './PassLog'
import { PlayCardLog } from './PlayCardLog.tsx'
import { UseStarCardLog } from './UseStarCardLog'

export class IpsoLogDescription implements LogDescription<MaterialMove, PlayerId, MaterialGame> {
  getMovePlayedLogDescription(move: MaterialMove, context: MoveComponentContext<MaterialMove, PlayerId, MaterialGame>): MovePlayedLogDescription | undefined {
    const player = context.game.rule?.player

    if (context.game.rule?.id === RuleId.PlayCard) {
      if (isMoveItemType(MaterialType.NumberCard)(move) && move.location.type === LocationType.Pyramid) {
        return { player, Component: PlayCardLog }
      }

      if (isMoveItemType(MaterialType.NumberCard)(move) && move.location.type === LocationType.CardDisplay) {
        return { player, Component: DisplayCardLog, depth: 1 }
      }
    }

    if (context.game.rule?.id === RuleId.UseStarCard) {
      if (isMoveItemType(MaterialType.NumberCard)(move) && move.location.type === LocationType.DiscardPile) {
        const item = context.game.items[MaterialType.NumberCard]?.[move.itemIndex] as { id?: NumberCard } | undefined
        if (isTopStar(item?.id)) {
          return { player, Component: UseStarCardLog }
        }
        return { player, Component: DiscardCardLog, depth: 1 }
      }

      if (isMoveItemType(MaterialType.NumberCard)(move) && move.location.type === LocationType.Pyramid) {
        return { player, Component: PlayCardLog, depth: 1 }
      }

      if (isCustomMoveType(CustomMoveType.Pass)(move)) {
        return { player, Component: PassLog }
      }
    }

    return undefined
  }
}
