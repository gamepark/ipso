import { MaterialGame, MaterialItem, MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Colors, NumberCard, numberCardData } from '../../material/NumberCard'
import { MemoryType } from '../MemoryType'

const firstLineX = [0, 1, 2, 3, 4]
const secondLineX = [5, 6, 7, 8]
const thirdLineX = [9, 10, 11]
const fourthLineX = [12, 13]

export class ScoreHelper extends MaterialRulesPart {

  constructor(game: MaterialGame) {
    super(game)
  }

  calculateScore(player: number) {
    const firstLinePoints = this.getFirstLine(player)
    const secondLinePoints = this.getSecondLine(player)
    const thirdLinePoints = this.getThirdLine(player)
    const fourthLinePoints = this.getFourthLine(player)
    const starsPoints = this.getStars(player)
    const starCardPoints = this.getStarCard(player)
    return firstLinePoints + secondLinePoints + thirdLinePoints + fourthLinePoints + starsPoints + starCardPoints
  }

  getStarCard(player: number) {
    return this.material(MaterialType.StarCard).location(LocationType.Pyramid).player(player).getItems().length > 0 ? 3 : 0
  }

  getStars(player: number) {
    return this.getPlayerCards(player).map(card => numberCardData[card.id as NumberCard].stars).reduce((acc, curr) => acc + curr, 0)
  }

  getFirstLine(player: number) {
    return this.getPointsForLine(player, firstLineX)
  }

  getSecondLine(player: number) {
    return this.getPointsForLine(player, secondLineX)
  }

  getThirdLine(player: number) {
    return this.getPointsForLine(player, thirdLineX)
  }

  getFourthLine(player: number) {
    return this.getPointsForLine(player, fourthLineX)
  }

  private getPointsForLine(player: number, lineX: number[]): number {
    const lineCards = this.getPlayerCards(player).filter(card => card.location.x !== undefined && lineX.includes(card.location.x)).sort((a, b) => a.location.x! - b.location.x!)
    if(lineCards.length === 0) return 0
    if(lineCards.some(card => card.id === undefined)) return 0
    if(!this.isAscending(lineCards.map(card => numberCardData[card.id as NumberCard].number))) return 0
    const pointsByCard = this.getPointsByCard(lineCards)
    return lineCards.length * pointsByCard
  }

  private getPointsByCard(lineCards: MaterialItem[]) {
    let basePoints = 1
    const colors = lineCards.map(card => numberCardData[card.id as NumberCard].color)
    if (this.isSameColor(colors)) {
      basePoints += 1
    }
    if(this.remind(MemoryType.OddOrEvenOptionEnabled)) {
      const numbers = lineCards.map(card => numberCardData[card.id as NumberCard].number)
      if (this.isEven(numbers) || this.isOdd(numbers)) {
        basePoints += 1
      }
    }
    return basePoints
  }

  private isAscending(numbers: number[]): boolean {
    return numbers.every((n, i) => i === 0 || n > numbers[i - 1])
  }

  private isSameColor(colors: Colors[]): boolean {
    return colors.every((n) => n === colors[0])
  }

  private isEven(numbers: number[]): boolean {
    return numbers.every((n) => n%2 === 0)
  }

  private isOdd(numbers: number[]): boolean {
    return numbers.every((n) => n%2 !== 0)
  }

  private getPlayerCards(player: number) {
    return this.material(MaterialType.NumberCard).location(LocationType.Pyramid).player(player).getItems()
  }
}
