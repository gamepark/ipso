import {
  CustomMove,
  isCustomMoveType,
  isMoveItem,
  isMoveItemType,
  ItemMove,
  Location,
  MaterialMove,
  PlayerTurnRule,
  RuleMove
} from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from './CustomMoveType'
import { PyramidHelper } from './helper/PyramidHelper'
import { RuleId } from './RuleId'

export class UseStarCardRule extends PlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    if (this.player !== this.game.players[0]) return []
    return this.material(MaterialType.NumberCard)
      .location(LocationType.CardDisplay)
      .moveItems({ type: LocationType.DrawPile, x: 0, rotation: true })
  }

  getPlayerMoves(): MaterialMove[] {
    if (this.starCard.length) {
      return [
        this.starCard.moveItem({ type: LocationType.DiscardPile }),
        this.customMove(CustomMoveType.Pass)
      ]
    }
    const moves: MaterialMove[] = this.possibleLocations().flatMap(it => this.cardToPlay.moveItems({ ...it, rotation: false }))
    moves.push(...this.cardToPlay.moveItems({ type: LocationType.DiscardPile }))
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItem(move) && move.location.type === LocationType.Pyramid) {
      const cardAlreadyInMoveLocation = this.material(MaterialType.NumberCard).location(l =>
        l.type === LocationType.Pyramid && l.x === move.location.x && l.player === move.location.player
      )
      if (cardAlreadyInMoveLocation.length) {
        return [cardAlreadyInMoveLocation.moveItem({ type: LocationType.DiscardPile })]
      }
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (!isMoveItem(move) || move.location.type !== LocationType.DiscardPile) return []
    if (isMoveItemType(MaterialType.StarCard)(move)) {
      return [this.cardToPlay.moveItem(it => ({ ...it.location, rotation: false }))]
    } else if (isMoveItemType(MaterialType.NumberCard)(move)) {
      return [this.goToNextStep()]
    }
    return []
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (isCustomMoveType(CustomMoveType.Pass)(move)) {
      return [this.goToNextStep()]
    }
    return []
  }

  private goToNextStep(): RuleMove {
    if (this.nextPlayer === this.game.players[0]) {
      return this.startRule(RuleId.DiscardNonAscendingLines)
    }
    return this.startPlayerTurn(RuleId.UseStarCard, this.nextPlayer)
  }

  private possibleLocations(): Location[] {
    return new PyramidHelper(this.game).possibleLocations(false)
  }

  private get cardToPlay() {
    return this.material(MaterialType.NumberCard).location(LocationType.DrawPile).maxBy(it => it.location.x ?? 0)
  }

  private get starCard() {
    return this.material(MaterialType.StarCard).location(LocationType.Pyramid).player(this.player)
  }
}
