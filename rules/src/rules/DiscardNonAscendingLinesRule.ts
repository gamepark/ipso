import { MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { numberCardData, NumericCard } from '../material/NumberCard'
import { isAscending, pyramidLinesY } from './helper/pyramidLines'

export class DiscardNonAscendingLinesRule extends MaterialRulesPart {
  onRuleStart(): MaterialMove[] {
    const moves: MaterialMove[] = []
    for (const player of this.game.players) {
      for (const lineY of pyramidLinesY) {
        moves.push(...this.deleteLineIfNotAscending(player, lineY))
      }
    }
    moves.push(this.endGame())
    return moves
  }

  private deleteLineIfNotAscending(player: number, lineY: number): MaterialMove[] {
    const cards = this.material(MaterialType.NumberCard)
      .location(LocationType.Pyramid)
      .player(player)
      .location(l => l.y === lineY)
      .sort(it => it.location.x ?? 0)
    const numbers = cards.getItems<NumericCard>().map(card => numberCardData[card.id].number)
    if (!isAscending(numbers)) {
      return [cards.deleteItemsAtOnce()]
    }
    return []
  }
}
