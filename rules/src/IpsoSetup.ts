import { MaterialGameSetup } from '@gamepark/rules-api'
import { IpsoOptions } from './IpsoOptions'
import { IpsoRules } from './IpsoRules'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { RuleId } from './rules/RuleId'
import { PlayerId } from './PlayerId';

/**
 * This class creates a new Game based on the game options
 */
export class IpsoSetup extends MaterialGameSetup<PlayerId, MaterialType, LocationType, IpsoOptions> {
  Rules = IpsoRules

  setupMaterial(_options: IpsoOptions) {
    // TODO
  }

  start() {
    this.startPlayerTurn(RuleId.TheFirstStep, this.players[0])
  }
}
