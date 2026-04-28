import { css } from '@emotion/react'
import { IpsoRules } from '@gamepark/ipso/IpsoRules'
import { PlayerId } from '@gamepark/ipso/PlayerId'
import { usePlayerId, usePlay, usePlayers, useRules } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { FC, useCallback } from 'react'
import { useAutoViewOnDrag } from '../hooks/useAutoViewOnDrag'
import { getViewedPlayer } from '../locators/ViewHelper'
import { IpsoPlayerPanel } from './IpsoPlayerPanel'
import { getPanelHeight, getPanelSlot, getPanelTablePosition, getPanelWidth, TABLE_X_MIN, TABLE_Y_MIN } from './PanelPosition'

const PANEL_TRANSITION_MS = 500

export const PlayerPanels: FC = () => {
  useAutoViewOnDrag()
  const players = usePlayers<PlayerId>({ sortFromMe: true })
  const rules = useRules<IpsoRules>()!
  const play = usePlay()
  const playerId = usePlayerId()
  const playerCount = rules.players.length
  // At 2 players both pyramids are full-size — no viewed concept, no panel clicks.
  const supportsViewSwitch = playerCount > 2

  const viewed = getViewedPlayer({ rules, player: playerId } as any)
  const viewedIndex = players.findIndex(p => p.id === viewed)
  const width = getPanelWidth(playerCount)
  const height = getPanelHeight(playerCount)

  const setView = useCallback((target: PlayerId) => {
    play(MaterialMoveBuilder.changeView(target), { transient: true })
  }, [play])

  return (
    <>
      {players.map((player, index) => {
        const slot = getPanelSlot(index, viewedIndex < 0 ? 0 : viewedIndex, playerCount)
        const { x, y } = getPanelTablePosition(slot, playerCount)
        const isViewed = supportsViewSwitch && player.id === viewed
        const isClickable = supportsViewSwitch && !isViewed

        return (
          <div
            key={player.id}
            css={[wrapperCss(width, height), positionCss(x, y)]}
            onClick={isClickable ? () => setView(player.id) : undefined}
          >
            <IpsoPlayerPanel
              player={player}
              panelHeight={height}
              isViewed={isViewed}
              isClickable={isClickable}
            />
          </div>
        )
      })}
    </>
  )
}

// Origin offset matches the framework's default item placement
// (getLocationOriginCss with OriginType.Origin): items live in a coordinate
// system whose (0, 0) sits at left:-xMin, top:-yMin of the table div.
const wrapperCss = (width: number, height: number) => css`
  position: absolute;
  left: ${-TABLE_X_MIN}em;
  top: ${-TABLE_Y_MIN}em;
  width: ${width}em;
  height: ${height}em;
  z-index: 50;
  transition: transform ${PANEL_TRANSITION_MS}ms ease;
`

const positionCss = (x: number, y: number) => css`
  transform: translate(-50%, -50%) translate3d(${x}em, ${y}em, 0);
`
