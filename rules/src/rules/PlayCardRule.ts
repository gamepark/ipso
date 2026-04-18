import { isMoveItem, ItemMove, Location, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PyramidHelper } from './helper/PyramidHelper'
import { RuleId } from './RuleId'

export class PlayCardRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove[] {
    return this.possibleLocations().flatMap(it => this.cardsToPlay.moveItems({ ...it, rotation: false }))
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

  private possibleLocations(): Location[] {
    return new PyramidHelper(this.game).possibleLocations(true)
  }

  private get cardsToPlay() {
    return this.material(MaterialType.NumberCard).location(LocationType.CardDisplay)
  }
}
