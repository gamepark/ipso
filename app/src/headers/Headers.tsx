import { RuleId } from '@gamepark/ipso/rules/RuleId'
import { ComponentType } from 'react'
import { DiscardNonAscendingLinesHeader } from './DiscardNonAscendingLinesHeader.tsx'
import { PlayCardHeader } from './PlayCardHeader.tsx'
import { UseStarCardHeader } from './UseStarCardHeader.tsx'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.PlayCard]: PlayCardHeader,
  [RuleId.UseStarCard]: UseStarCardHeader,
  [RuleId.DiscardNonAscendigLines]: DiscardNonAscendingLinesHeader,
}
