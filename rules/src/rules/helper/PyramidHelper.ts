import { Location, MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getPyramidPositions } from './pyramidLines'

export class PyramidHelper extends MaterialRulesPart {
  player?: number

  constructor(game: MaterialGame, player = game.rule?.player) {
    super(game)
    this.player = player
  }

  allLocations(): Location[] {
    return getPyramidPositions().map(({ x, y }) => ({
      type: LocationType.Pyramid,
      player: this.player,
      x,
      y
    }))
  }

  hiddenLocations(): Location[] {
    return this.material(MaterialType.NumberCard)
      .location(LocationType.Pyramid)
      .player(this.player)
      .rotation(true)
      .getItems()
      .map(it => it.location)
  }
}
