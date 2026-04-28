import { IpsoRules } from '@gamepark/ipso/IpsoRules'
import { useDndMonitor } from '@dnd-kit/core'
import { usePlay, usePlayerId, useRules } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { useCallback } from 'react'
import { getViewedPlayer } from '../locators/ViewHelper'

/**
 * When the current player starts dragging one of their items and the
 * viewed player is not them, auto-switch the view to their pyramid.
 */
export const useAutoViewOnDrag = () => {
  const rules = useRules<IpsoRules>()
  const me = usePlayerId()
  const play = usePlay()

  const onDragStart = useCallback(() => {
    if (!rules || me === undefined) return

    const viewed = getViewedPlayer({ rules, player: me } as any)
    if (viewed === me) return

    play(MaterialMoveBuilder.changeView(me), { transient: true })
  }, [rules, me, play])

  useDndMonitor({ onDragStart })
}
