import { MaterialGameSetup } from '@gamepark/rules-api'
import { IpsoOptions } from './IpsoOptions'
import { IpsoRules } from './IpsoRules'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { MemoryType } from './rules/MemoryType'
import { RuleId } from './rules/RuleId'
import { PlayerId } from './PlayerId';
import { numberCards } from './material/NumberCard'
import { getPyramidPositions } from './rules/helper/pyramidLines'

/**
 * This class creates a new Game based on the game options
 */
export class IpsoSetup extends MaterialGameSetup<PlayerId, MaterialType, LocationType, IpsoOptions> {
  Rules = IpsoRules

  setupMaterial(options: IpsoOptions) {
    this.memorize(MemoryType.OddOrEvenOptionEnabled, options.oddOrEven)
    this.setupDrawPile()
    this.setupCardDisplay()
    this.setupPlayerPyramids()
    this.trimDrawPile()
  }

  setupDrawPile() {
    this.material(MaterialType.NumberCard).createItemsAtOnce(
      numberCards.map((numberCard) => ({
        id: numberCard,
        location: {
          type: LocationType.DrawPile
        }
      }))
    )
    this.material(MaterialType.NumberCard).shuffle()
  }

  setupCardDisplay() {
    const drawPile = this.getDrawPile()
    drawPile.dealAtOnce({
      type: LocationType.CardDisplay,
      rotation: false
    }, 2)
  }

  setupPlayerPyramids() {
    for (const player of this.players) {
      this.setupPlayerPyramid(player)
      this.setupPlayerStarCard(player)
    }
  }

  setupPlayerPyramid(player: PlayerId) {
    const drawPile = this.getDrawPile()
    for (const { x, y } of getPyramidPositions()) {
      drawPile.dealOne({
        type: LocationType.Pyramid,
        player,
        x,
        y,
        rotation: true
      })
    }
  }

  setupPlayerStarCard(player: PlayerId) {
    this.material(MaterialType.StarCard).createItem({
      id: player,
      location: {
        type: LocationType.Pyramid,
        player,
        x: 0,
        y: 0
      }
    })
  }

  getDrawPile() {
    return this.material(MaterialType.NumberCard).location(LocationType.DrawPile).deck()
  }

  trimDrawPile() {
    const drawPile = this.material(MaterialType.NumberCard).location(LocationType.DrawPile)
    const excess = drawPile.length - this.players.length
    if (excess <= 0) return
    drawPile.limit(excess).deleteItemsAtOnce()
  }

  start() {
    this.startPlayerTurn(RuleId.PlayCard, this.players[0])
  }
}
