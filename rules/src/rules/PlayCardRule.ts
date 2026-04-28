import { isMoveItem, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PyramidHelper } from './helper/PyramidHelper'
import { RuleId } from './RuleId'

export class PlayCardRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove[] {
    return new PyramidHelper(this.game).hiddenLocations().flatMap(it => this.cardsToPlay.moveItems({ ...it, rotation: false }))
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItem(move) && move.location.type === LocationType.Pyramid) {
      const oldCardLocation = this.material(MaterialType.NumberCard).getItem(move.itemIndex).location
      const cardAlreadyInMoveLocation = this.material(MaterialType.NumberCard).location(l =>
        l.type === LocationType.Pyramid && l.x === move.location.x && l.y === move.location.y && l.player === move.location.player
      )
      if (cardAlreadyInMoveLocation.length) {
        return [cardAlreadyInMoveLocation.moveItem(oldCardLocation)]
      }
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItem(move) && move.location.type === LocationType.Pyramid) {
      for (const item of this.game.items[MaterialType.NumberCard] ?? []) {
        if (item.selected) delete item.selected
      }
      const nextRule = this.nextPlayerIsFirstPlayerAndAllCardsPlayed() ? RuleId.UseStarCard : RuleId.PlayCard
      return [this.startPlayerTurn(nextRule, this.nextPlayer)]
    }
    return []
  }

  private nextPlayerIsFirstPlayerAndAllCardsPlayed(): boolean {
    const nextPlayerIsFirstPlayer = this.nextPlayer === this.game.players[0]
    const allCardsPlayed = this.material(MaterialType.NumberCard).location(LocationType.Pyramid).player(this.nextPlayer).rotation(true).length === 0
    return nextPlayerIsFirstPlayer && allCardsPlayed
  }
  private get cardsToPlay() {
    return this.material(MaterialType.NumberCard).location(LocationType.CardDisplay)
  }
}
