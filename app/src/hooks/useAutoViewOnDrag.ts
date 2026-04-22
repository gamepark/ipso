import { IpsoRules } from '@gamepark/ipso/IpsoRules'
import { useDndMonitor } from '@dnd-kit/core'
import { usePlay, usePlayerId, useRules } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { useCallback } from 'react'
import { encodeView, getSides } from '../locators/ViewHelper'

/**
 * When the current player starts dragging one of their items and
 * their board is NOT currently in one of the two visible slots,
 * auto-switch the left slot to their board.
 */
export const useAutoViewOnDrag = () => {
  const rules = useRules<IpsoRules>()
  const me = usePlayerId()
  const play = usePlay()

  const onDragStart = useCallback(() => {
    if (!rules || me === undefined) return

    const { left, right } = getSides({ rules, player: me } as any)
    if (left === me || right === me) return

    play(MaterialMoveBuilder.changeView(encodeView(me, right)), { transient: true })
  }, [rules, me, play])

  useDndMonitor({ onDragStart })
}
