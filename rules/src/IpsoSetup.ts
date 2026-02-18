import { MaterialGameSetup } from '@gamepark/rules-api'
import { IpsoOptions } from './IpsoOptions'
import { IpsoRules } from './IpsoRules'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { RuleId } from './rules/RuleId'
import { PlayerId } from './PlayerId';
import { numberCards } from './material/NumberCard'

/**
 * This class creates a new Game based on the game options
 */
export class IpsoSetup extends MaterialGameSetup<PlayerId, MaterialType, LocationType, IpsoOptions> {
  Rules = IpsoRules

  setupMaterial(_options: IpsoOptions) {
    this.setupDrawPile()
    this.setupCardDisplay()
    this.setupPlayerPyramids()
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
      type: LocationType.CardDisplay
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
    drawPile.dealAtOnce({
      type: LocationType.Pyramid,
      player: player,
      rotation: true
    }, 14)
  }

  setupPlayerStarCard(player: PlayerId) {
    this.material(MaterialType.StarCard).createItem({
      id: player,
      location: {
        type: LocationType.Pyramid,
        player: player,
        x: 14
      }
    })
  }

  getDrawPile() {
    return this.material(MaterialType.NumberCard).location(LocationType.DrawPile).deck()
  }

  start() {
    this.startPlayerTurn(RuleId.TheFirstStep, this.players[0])
  }
}
