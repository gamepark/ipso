import { MaterialItem, MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Colors, isTopStar, NumberCard, numberCardData, NumericCard } from '../../material/NumberCard'
import { MemoryType } from '../MemoryType'
import { isAscending, pyramidLinesY } from './pyramidLines'

export class ScoreHelper extends MaterialRulesPart {
  calculateScore(player: number): number {
    const linesPoints = pyramidLinesY.reduce((sum, y) => sum + this.getLinePoints(player, y), 0)
    return linesPoints + this.getStars(player) + this.getStarCard(player)
  }

  getStarCard(player: number): number {
    return this.material(MaterialType.NumberCard).location(LocationType.Pyramid).player(player).id(NumberCard.TopStar).length > 0 ? 3 : 0
  }

  getStars(player: number): number {
    return this.getPlayerCards(player)
      .map(card => numberCardData[card.id].stars)
      .reduce((acc, curr) => acc + curr, 0)
  }

  getLinePoints(player: number, lineY: number): number {
    const lineCards = this.getPlayerCards(player)
      .filter(card => card.location.y === lineY)
      .sort((a, b) => a.location.x! - b.location.x!)
    if (lineCards.length === 0) return 0
    if (lineCards.some(card => card.id === undefined)) return 0
    if (!isAscending(lineCards.map(card => numberCardData[card.id].number))) return 0
    return lineCards.length * this.getPointsByCard(lineCards)
  }

  private getPointsByCard(lineCards: MaterialItem<number, number, NumericCard>[]): number {
    let pointsByCard = 1
    const colors = lineCards.map(card => numberCardData[card.id].color)
    if (this.isSameColor(colors)) pointsByCard++
    if (this.remind(MemoryType.OddOrEvenOptionEnabled)) {
      const numbers = lineCards.map(card => numberCardData[card.id].number)
      if (numbers.every(n => n % 2 === 0) || numbers.every(n => n % 2 !== 0)) pointsByCard++
    }
    return pointsByCard
  }

  private isSameColor(colors: Colors[]): boolean {
    return colors.every(c => c === colors[0])
  }

  private getPlayerCards(player: number): MaterialItem<number, number, NumericCard>[] {
    return this.material(MaterialType.NumberCard).location(LocationType.Pyramid).player(player)
      .getItems<NumberCard>()
      .filter((card): card is MaterialItem<number, number, NumericCard> => !isTopStar(card.id))
  }
}
