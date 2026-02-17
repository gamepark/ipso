import { MaterialType } from '@gamepark/ipso/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { numberCardDescription } from './NumberCardDescription'
import { starCardDescription } from './StarCardDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.NumberCard]: numberCardDescription,
  [MaterialType.StarCard]: starCardDescription
}
