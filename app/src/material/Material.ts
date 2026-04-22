import { MaterialType } from '@gamepark/ipso/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { numberCardDescription } from './NumberCardDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.NumberCard]: numberCardDescription
}
