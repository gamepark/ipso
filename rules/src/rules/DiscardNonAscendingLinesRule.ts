import {
  MaterialMove,
  MaterialRulesPart,
} from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { NumberCard, numberCardData } from '../material/NumberCard'

const firstLineX = [0, 1, 2, 3, 4]
const secondLineX = [5, 6, 7, 8]
const thirdLineX = [9, 10, 11]
const fourthLineX = [12, 13]

export class DiscardNonAscendingLinesRule extends MaterialRulesPart {
  onRuleStart(): MaterialMove[] {
    const moves: MaterialMove[] = []
    this.game.players.forEach(player => {
      moves.push(...this.deleteLineIfNotAscending(player, firstLineX))
      moves.push(...this.deleteLineIfNotAscending(player, secondLineX))
      moves.push(...this.deleteLineIfNotAscending(player, thirdLineX))
      moves.push(...this.deleteLineIfNotAscending(player, fourthLineX))
    })
    moves.push(this.endGame())
    return moves
  }

  deleteLineIfNotAscending(player: number, lineX: number[]): MaterialMove[] {
    const moves: MaterialMove[] = []
    const cards = this.getPlayerCards(player).filter(card => card.location.x !== undefined && lineX.includes(card.location.x)).sort(it => it.location.x ?? 0)
    if(!this.isAscending(cards.getItems().map(card => numberCardData[card.id as NumberCard].number))) {
      moves.push(cards.deleteItemsAtOnce())
    }
    return moves
  }

  private isAscending(numbers: number[]): boolean {
    console.log(numbers)
    return numbers.every((n, i) => i === 0 || n > numbers[i - 1])
  }

  private getPlayerCards(player: number) {
    return this.material(MaterialType.NumberCard).location(LocationType.Pyramid).player(player)
  }
}
