import { LocationType } from '@gamepark/ipso/material/LocationType'
import { MaterialType } from '@gamepark/ipso/material/MaterialType'
import { MemoryType } from '@gamepark/ipso/rules/MemoryType'
import { usePlayerId, useRules } from '@gamepark/react-game'
import { MaterialRules } from '@gamepark/rules-api'
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

export const OddOrEvenDialogContext = createContext<(() => void) | undefined>(undefined)

export const useOpenOddOrEvenDialog = () => useContext(OddOrEvenDialogContext)

// Popup shows once at the start of the game (no cards played yet) when the
// variant is enabled. No localStorage — refreshing before any card has been
// played re-shows it; once any card is face-up in a pyramid, it never
// auto-opens again (still reachable via the context's `reopen`).
export const useOddOrEvenDialog = () => {
  const rules = useRules<MaterialRules>()
  const playerId = usePlayerId()
  const variantOn = !!playerId && rules?.remind(MemoryType.OddOrEvenOptionEnabled) === true

  const gameNotStarted = !!rules && rules.material(MaterialType.NumberCard)
    .location(LocationType.Pyramid)
    .filter(item => item.location.rotation === false)
    .length === 0

  const [show, setShow] = useState(false)
  const hasAutoShown = useRef(false)

  useEffect(() => {
    if (variantOn && gameNotStarted && !hasAutoShown.current) {
      hasAutoShown.current = true
      setShow(true)
    }
  }, [variantOn, gameNotStarted])

  const dismiss = useCallback(() => setShow(false), [])
  const reopen = useCallback(() => setShow(true), [])

  return { show, dismiss, reopen }
}
