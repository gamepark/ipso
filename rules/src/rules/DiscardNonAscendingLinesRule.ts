import { MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { NumberCard, numberCardData } from '../material/NumberCard'
import { isAscending, pyramidLines } from './helper/pyramidLines'

export class DiscardNonAscendingLinesRule extends MaterialRulesPart {
  onRuleStart(): MaterialMove[] {
    const moves: MaterialMove[] = []
    for (const player of this.game.players) {
      for (const lineX of pyramidLines) {
        moves.push(...this.deleteLineIfNotAscending(player, lineX))
      }
    }
    moves.push(this.endGame())
    return moves
  }

  private deleteLineIfNotAscending(player: number, lineX: number[]): MaterialMove[] {
    const cards = this.material(MaterialType.NumberCard)
      .location(LocationType.Pyramid)
      .player(player)
      .filter(card => card.location.x !== undefined && lineX.includes(card.location.x))
      .sort(it => it.location.x ?? 0)
    const numbers = cards.getItems().map(card => numberCardData[card.id as NumberCard].number)
    if (!isAscending(numbers)) {
      return [cards.deleteItemsAtOnce()]
    }
    return []
  }
}
