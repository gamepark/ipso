/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import { IpsoRules } from '@gamepark/ipso/IpsoRules'
import { Player } from '@gamepark/react-client'
import { Avatar, PlayerTimer, usePlayerName, usePlayerId, usePlay, getRelativePlayerIndex, useMaterialContext, useRules } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { FC, useCallback } from 'react'
import { encodeView, getSides } from '../locators/ViewHelper'
import { SidePickerPopup } from './SidePickerPopup'

type IpsoPlayerPanelProps = {
  player: Player
  index: number
  playerCount: number
  isPickerOpen?: boolean
  onRequestPicker?: (open: boolean) => void
}

export const IpsoPlayerPanel: FC<IpsoPlayerPanelProps> = ({ player, index, playerCount, isPickerOpen, onRequestPicker }) => {
  const rules = useRules<IpsoRules>()!
  const context = useMaterialContext()
  const play = usePlay()
  const playerId = usePlayerId()
  const playerName = usePlayerName(player.id)

  const { left: leftPlayer, right: rightPlayer } = getSides({ rules, player: playerId } as any)
  const isViewedLeft = player.id === leftPlayer
  const isViewedRight = player.id === rightPlayer
  const isViewed = isViewedLeft || isViewedRight

  const isTurnToPlay = rules.isTurnToPlay(player.id)
  const isClickable = rules.players.length > 2

  const onPanelClick = useCallback(() => {
    if (!isClickable) return
    onRequestPicker?.(!isPickerOpen)
  }, [isClickable, isPickerOpen, onRequestPicker])

  const assignSide = useCallback((targetSide: 'left' | 'right') => {
    const newLeft = targetSide === 'left' ? player.id : (leftPlayer === player.id ? rightPlayer : leftPlayer)
    const newRight = targetSide === 'right' ? player.id : (rightPlayer === player.id ? leftPlayer : rightPlayer)
    play(MaterialMoveBuilder.changeView(encodeView(newLeft, newRight)), { transient: true })
    onRequestPicker?.(false)
  }, [player.id, leftPlayer, rightPlayer, play, onRequestPicker])

  const onPickerClose = useCallback(() => onRequestPicker?.(false), [onRequestPicker])

  return (
    <div
      css={[panelCss, panelPositionCss(index, playerCount), isViewed && isClickable && viewedPanelCss, isClickable && clickableCss, backgrounds[getRelativePlayerIndex(context, player.id)]]}
      onClick={onPanelClick}
    >
      <div css={contentRowCss}>
        <div css={avatarWrapCss}>
          {isTurnToPlay && (
            <div css={activeRingCss}>
              <div css={activeRingInnerCss} />
            </div>
          )}
          <Avatar playerId={player.id} css={avatarCss} />
        </div>
        <div css={infoCss}>
          <span css={nameCss}>{playerName}</span>
        </div>
        <div css={rightColCss}>
          {!rules.isOver() && <PlayerTimer playerId={player.id} css={timerCss} />}
        </div>
      </div>

      {isPickerOpen && (
        <SidePickerPopup
          currentSide={isViewedLeft ? 'left' : isViewedRight ? 'right' : undefined}
          onPick={assignSide}
          onClose={onPickerClose}
        />
      )}
    </div>
  )
}

const panelCss = css`
  position: absolute;
  width: 28em;
  font-size: 0.438em;
  cursor: default;
  z-index: 50;
  overflow: visible;
  transform: translateZ(100em);
  border-radius: 1em;
  box-shadow: 0 0 0.5em black;
`

const clickableCss = css`
  cursor: pointer;
`

const viewedPanelCss = css`
  box-shadow: 0 0 0.5em black, 0 0 0 0.3em gold;
`

const contentRowCss = css`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  padding: 0.5em;
  gap: 0.5em;
`

const avatarWrapCss = css`
  position: relative;
  flex-shrink: 0;
  z-index: 3;
  width: 4.5em;
  height: 4.5em;
`

const activeRingCss = css`
  position: absolute;
  inset: -0.35em;
  border-radius: 50%;
  z-index: 0;
`

const ringRotation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

const activeRingInnerCss = css`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: linear-gradient(180deg, gold, var(--gp-primary, #28B8CE));
  animation: ${ringRotation} 1s infinite linear;
`

const avatarCss = css`
  width: 4.5em;
  height: 4.5em;
  border-radius: 50%;
  z-index: 3;
  color: black;
  flex-shrink: 0;
`

const infoCss = css`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
`

const nameCss = css`
  font-size: 2em;
  font-weight: 700;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background: rgba(0, 0, 0, 0.4);
  padding: 0.06em 0.2em;
  border-radius: 0.15em;
  line-height: 1.15;
`

const rightColCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  z-index: 5;
`

const timerCss = css`
  font-size: 1.8em;
  font-weight: 700;
  color: white;
  background: rgba(0, 0, 0, 0.4);
  padding: 0.06em 0.2em;
  border-radius: 0.15em;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  flex-shrink: 0;
  line-height: 1.15;
`

const panelPositionCss = (index: number, playerCount: number) => {
  const panelWidth = 28 // em in panel font scale
  const gap = 1
  const totalWidth = playerCount * panelWidth + (playerCount - 1) * gap
  const left = (index * (panelWidth + gap)) - totalWidth / 2
  // Convert to viewport: 50% + offset in em (panel font-size = 0.438em)
  return css`
    top: 8.5em;
    left: calc(50% + ${left}em);
  `
}

const pink = css`background: linear-gradient(135deg, rgba(251,73,197,0.6) 0%, rgba(200,20,140,0.8) 100%)`
const red = css`background: linear-gradient(135deg, rgba(255,92,37,0.6) 0%, rgba(200,50,10,0.8) 100%)`
const blue = css`background: linear-gradient(135deg, rgba(0,154,206,0.6) 0%, rgba(0,100,170,0.8) 100%)`
const green = css`background: linear-gradient(135deg, rgba(68,214,45,0.6) 0%, rgba(30,150,20,0.8) 100%)`
const yellow = css`background: linear-gradient(135deg, rgba(255,233,0,0.6) 0%, rgba(200,180,0,0.8) 100%)`
const purple = css`background: linear-gradient(135deg, rgba(153,0,255,0.6) 0%, rgba(100,0,200,0.8) 100%)`

const backgrounds = [pink, red, blue, green, yellow, purple]
