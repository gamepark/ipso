import { isMoveItem, ItemMove, Location, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PyramidHelper } from './helper/PyramidHelper'
import { RuleId } from './RuleId'

export class PlayCardRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove<number, number, number, number, number>[] {
    return this.possibleLocations().flatMap(it => this.cardsToPlay.moveItems({ ...it, rotation: false }))
  }

  beforeItemMove(_move: ItemMove<number, number, number>, _context?: PlayMoveContext): MaterialMove<number, number, number, number, number>[] {
    if(isMoveItem(_move) && _move.location.type === LocationType.Pyramid) {
      const oldCardLocation = this.material(MaterialType.NumberCard).getItem(_move.itemIndex).location
      const cardAlreadyInMoveLocation = this.material(MaterialType.NumberCard).location((l) => l.type === LocationType.Pyramid && l.x === _move.location.x && l.player === _move.location.player)
      if(cardAlreadyInMoveLocation.length) {
        return [cardAlreadyInMoveLocation.moveItem(oldCardLocation)]
      }
    }
    return []
  }

  afterItemMove(_move: ItemMove<number, number, number>, _context?: PlayMoveContext): MaterialMove<number, number, number, number, number>[] {
    if(isMoveItem(_move) && _move.location.type === LocationType.Pyramid) {
      const nextRule = this.nextPlayerIsFirstPlayerAndAllCardsPlayed() ? RuleId.UseStarCard : RuleId.PlayCard
      return [this.startPlayerTurn(nextRule, this.nextPlayer)]
    }
    return []
  }

  nextPlayerIsFirstPlayerAndAllCardsPlayed() {
    const nextPlayerIsFirstPlayer = this.nextPlayer === this.game.players[0]
    const allCardsPlayed = this.material(MaterialType.NumberCard).location(LocationType.Pyramid).player(this.nextPlayer).rotation(true).length === 0
    return nextPlayerIsFirstPlayer && allCardsPlayed
  }

  possibleLocations(): Location[] {
    return new PyramidHelper(this.game).possibleLocations(true)
  }

  get cardsToPlay() {
    return this.material(MaterialType.NumberCard).location(LocationType.CardDisplay)
  }
}
