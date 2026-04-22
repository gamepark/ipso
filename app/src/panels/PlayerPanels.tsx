import { css } from '@emotion/react'
import { IpsoRules } from '@gamepark/ipso/IpsoRules'
import { PlayerId } from '@gamepark/ipso/PlayerId'
import { usePlayerId, usePlay, usePlayers, useRules } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { FC, useState, useCallback, useRef } from 'react'
import { useAutoViewOnDrag } from '../hooks/useAutoViewOnDrag'
import { encodeView, getSides } from '../locators/ViewHelper'
import { IpsoPlayerPanel } from './IpsoPlayerPanel'
import { SidePickerPopup } from './SidePickerPopup'
import { BoardNameLabels } from './BoardNameLabels'
import { getPanelCssPosition } from './PanelPosition'
import { PyramidPreview } from './PyramidPreview'

export const PlayerPanels: FC = () => {
  useAutoViewOnDrag()
  const players = usePlayers<PlayerId>({ sortFromMe: true })
  const rules = useRules<IpsoRules>()!
  const play = usePlay()
  const playerId = usePlayerId()
  const [openPickerFor, setOpenPickerFor] = useState<PlayerId | undefined>(undefined)
  const [hoveredPlayer, setHoveredPlayer] = useState<PlayerId | undefined>(undefined)
  const hoverTimeout = useRef<ReturnType<typeof setTimeout>>(undefined)
  const isClickable = rules.players.length > 2

  const { left: leftPlayer, right: rightPlayer } = getSides({ rules, player: playerId } as any)

  const assignSide = useCallback((targetPlayer: PlayerId, targetSide: 'left' | 'right') => {
    const newLeft = targetSide === 'left' ? targetPlayer : (leftPlayer === targetPlayer ? rightPlayer : leftPlayer)
    const newRight = targetSide === 'right' ? targetPlayer : (rightPlayer === targetPlayer ? leftPlayer : rightPlayer)
    play(MaterialMoveBuilder.changeView(encodeView(newLeft, newRight)), { transient: true })
    setOpenPickerFor(undefined)
  }, [leftPlayer, rightPlayer, play])

  const onMouseEnter = useCallback((id: PlayerId) => {
    clearTimeout(hoverTimeout.current)
    hoverTimeout.current = setTimeout(() => setHoveredPlayer(id), 500)
  }, [])

  const onMouseLeave = useCallback(() => {
    clearTimeout(hoverTimeout.current)
    setHoveredPlayer(undefined)
  }, [])

  return (
    <>
      {players.map((player, index) => {
        const isViewedLeft = player.id === leftPlayer
        const isViewedRight = player.id === rightPlayer
        const isViewed = isViewedLeft || isViewedRight
        const isHovered = hoveredPlayer === player.id && openPickerFor !== player.id && isClickable

        return (
          <div
            key={player.id}
            css={[wrapperCss, panelPosition(players.length, index), isClickable && clickableCss]}
            onClick={isClickable ? () => setOpenPickerFor(openPickerFor === player.id ? undefined : player.id) : undefined}
            onMouseEnter={() => onMouseEnter(player.id)}
            onMouseLeave={onMouseLeave}
          >
            <IpsoPlayerPanel
              player={player}
              isViewed={isViewed}
              isClickable={isClickable}
            />
            <div css={[previewTrayCss, isHovered && previewTrayVisibleCss]}>
              <PyramidPreview playerId={player.id} />
            </div>
            {openPickerFor === player.id && (
              <SidePickerPopup
                currentSide={isViewedLeft ? 'left' : isViewedRight ? 'right' : undefined}
                onPick={(side) => assignSide(player.id, side)}
                onClose={() => setOpenPickerFor(undefined)}
              />
            )}
          </div>
        )
      })}
      <BoardNameLabels />
    </>
  )
}

const wrapperCss = css`
  position: absolute;
  z-index: 50;
  transform-style: preserve-3d;
  font-size: 0.3em;
`

const clickableCss = css`
  cursor: pointer;
`

const previewTrayCss = css`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  transform: translateY(-0.5em) translateZ(100em);
  z-index: 60;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
  background: rgba(21, 35, 88, 0.9);
  border: 1px solid rgba(245, 200, 66, 0.3);
  border-radius: 0 0 0.8em 0.8em;
  box-shadow: 0 0.3em 0.8em rgba(0, 0, 0, 0.6);
`

const previewTrayVisibleCss = css`
  opacity: 1;
  transform: translateY(0.3em) translateZ(100em);
  pointer-events: auto;
`

const panelPosition = (playerCount: number, index: number) => {
  const { top, left } = getPanelCssPosition(index, playerCount)
  return css`
    top: ${top}em;
    left: ${left}em;
  `
}
