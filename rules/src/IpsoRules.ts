import {
  CompetitiveScore,
  FillGapStrategy,
  HiddenMaterialRules,
  MaterialGame,
  MaterialItem,
  MaterialMove,
  PositiveSequenceStrategy,
  TimeLimit
} from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerId } from './PlayerId'
import { DiscardNonAscendingLinesRule } from './rules/DiscardNonAscendingLinesRule'
import { ScoreHelper } from './rules/helper/ScoreHelper'
import { PlayCardRule } from './rules/PlayCardRule'
import { RuleId } from './rules/RuleId'
import { UseStarCardRule } from './rules/UseStarCardRule'

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class IpsoRules
  extends HiddenMaterialRules<PlayerId, MaterialType, LocationType>
  implements TimeLimit<MaterialGame, MaterialMove>, CompetitiveScore<MaterialGame, MaterialMove, number>
{
  scoreHelper = new ScoreHelper(this.game)
  rules = {
    [RuleId.PlayCard]: PlayCardRule,
    [RuleId.UseStarCard]: UseStarCardRule,
    [RuleId.DiscardNonAscendingLines]: DiscardNonAscendingLinesRule,
  }

  locationsStrategies = {
    [MaterialType.NumberCard]: {
      [LocationType.DrawPile]: new PositiveSequenceStrategy(),
      [LocationType.CardDisplay]: new FillGapStrategy()
    }
  }

  hidingStrategies = {
    [MaterialType.NumberCard]: {
      [LocationType.DrawPile]: (item: MaterialItem) => (!item.location.rotation ? [] : ['id']),
      [LocationType.Pyramid]: (item: MaterialItem) => (!item.location.rotation ? [] : ['id'])
    }
  }

  giveTime(): number {
    return 60
  }
  getScore(playerId: number): number {
    return this.scoreHelper.calculateScore(playerId)
  }

  getTieBreaker?(tieBreaker: number, playerId: number): number | undefined {
    if (tieBreaker === 1) {
      return this.scoreHelper.getStars(playerId)
    }
    return undefined
  }
}
