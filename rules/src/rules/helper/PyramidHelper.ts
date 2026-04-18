import { Location, MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'

export class PyramidHelper extends MaterialRulesPart {
  player?: number

  constructor(game: MaterialGame, player = game.rule?.player) {
    super(game)
    this.player = player
  }

  possibleLocations(onlyHidden: boolean): Location[] {
    const locations = this.material(MaterialType.NumberCard)
      .location(LocationType.Pyramid)
      .player(this.player)
      .getItems()
      .map(it => it.location)

    if (onlyHidden) {
      return locations.filter(location => location.rotation)
    }
    return locations
  }
}
