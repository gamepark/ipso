import { MaterialGameSetup } from '@gamepark/rules-api'
import { IpsoOptions } from './IpsoOptions'
import { IpsoRules } from './IpsoRules'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class IpsoSetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, IpsoOptions> {
  Rules = IpsoRules

  setupMaterial(_options: IpsoOptions) {
    // TODO
  }

  start() {
    this.startPlayerTurn(RuleId.TheFirstStep, this.players[0])
  }
}
