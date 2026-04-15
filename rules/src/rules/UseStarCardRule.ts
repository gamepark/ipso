import {
  CustomMove,
  isCustomMoveType,
  isMoveItem,
  isMoveItemType,
  ItemMove,
  Location,
  MaterialMove,
  PlayerTurnRule,
  PlayMoveContext, RuleMove, RuleStep
} from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from './CustomMoveType'
import { PyramidHelper } from './helper/PyramidHelper'
import { RuleId } from './RuleId'

export class UseStarCardRule extends PlayerTurnRule {
  onRuleStart(_move: RuleMove<number, number>, _previousRule?: RuleStep, _context?: PlayMoveContext): MaterialMove<number, number, number, number, number>[] {
    if(this.player === this.game.players[0]) {
      const maxX = this.material(MaterialType.NumberCard).location(LocationType.DrawPile).maxBy(it => it.location.x ?? 0).getItem()?.location.x ?? 0
      return this.material(MaterialType.NumberCard).location(LocationType.CardDisplay).moveItems({type: LocationType.DrawPile, x: maxX - 10, rotation: true})
    }
    return []
  }

  getPlayerMoves(): MaterialMove<number, number, number, number, number>[] {
    if(this.starCard.length) {
      const moves: MaterialMove[] = [this.starCard.moveItem({ type: LocationType.DiscardPile })]
      moves.push(this.customMove(CustomMoveType.Pass))
      return moves
    }
    const moves: MaterialMove[] = this.possibleLocations().flatMap(it => this.cardToPlay.moveItems({ ...it, rotation: false }))
    moves.push(...this.cardToPlay.moveItems({ type: LocationType.DiscardPile }))
    return moves
  }

  beforeItemMove(_move: ItemMove<number, number, number>, _context?: PlayMoveContext): MaterialMove<number, number, number, number, number>[] {
    if(isMoveItem(_move) && _move.location.type === LocationType.Pyramid) {
      const cardAlreadyInMoveLocation = this.material(MaterialType.NumberCard).location((l) => l.type === LocationType.Pyramid && l.x === _move.location.x && l.player === _move.location.player)
      if(cardAlreadyInMoveLocation.length) {
        return [cardAlreadyInMoveLocation.moveItem({ type: LocationType.DiscardPile })]
      }
    }
    return []
  }

  afterItemMove(_move: ItemMove<number, number, number>, _context?: PlayMoveContext): MaterialMove<number, number, number, number, number>[] {
    if(isMoveItem(_move) && _move.location.type === LocationType.DiscardPile) {
      if(isMoveItemType(MaterialType.NumberCard)(_move)) {
        if(this.nextPlayer === this.game.players[0]) {
          return [this.startRule(RuleId.DiscardNonAscendigLines)]
        } else {
          return [this.startPlayerTurn(RuleId.UseStarCard, this.nextPlayer)]
        }
      }
      if(isMoveItemType(MaterialType.StarCard)(_move)) {
        return [this.cardToPlay.moveItem(it => ({...it.location, rotation: false}))]
      }
    }
    return []
  }

  onCustomMove(_move: CustomMove, _context?: PlayMoveContext): MaterialMove<number, number, number, number, number>[] {
    const moves: MaterialMove[] = []
    if(isCustomMoveType(CustomMoveType.Pass)(_move)) {
      if(this.nextPlayer === this.game.players[0]) {
        moves.push(this.startRule(RuleId.DiscardNonAscendigLines))
      } else {
        moves.push(this.startPlayerTurn(RuleId.UseStarCard, this.nextPlayer))
      }
    }
    return moves
  }

  possibleLocations(): Location[] {
    return new PyramidHelper(this.game).possibleLocations(false)
  }

  get cardToPlay() {
    return this.material(MaterialType.NumberCard).location(LocationType.DrawPile).maxBy(it => it.location.x ?? 0)
  }

  get starCard() {
    return this.material(MaterialType.StarCard).location(LocationType.Pyramid).player(this.player)
  }
}
