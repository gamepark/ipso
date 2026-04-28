/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import { IpsoRules } from '@gamepark/ipso/IpsoRules'
import { Player } from '@gamepark/react-client'
import { Avatar, getRelativePlayerIndex, PlayerTimer, useMaterialContext, usePlayerName, useRules } from '@gamepark/react-game'
import { blinkOnRunningTimeout } from '@gamepark/react-game/dist/components/PlayerTimer/PlayerTimer'
import { faStopwatch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'
import { colors, playerGradients } from '../theme/colors'
import { fontDisplay } from '../theme/typography'

type IpsoPlayerPanelProps = {
  player: Player
  panelHeight: number
  isViewed?: boolean
  isClickable?: boolean
}

/** Vertical units the panel content is laid out in (1 inner em = panelHeight / HEIGHT_UNITS) */
const HEIGHT_UNITS = 5

export const IpsoPlayerPanel: FC<IpsoPlayerPanelProps> = ({ player, panelHeight, isViewed, isClickable }) => {
  const rules = useRules<IpsoRules>()!
  const context = useMaterialContext()
  const playerName = usePlayerName(player.id)
  const isTurnToPlay = rules.isTurnToPlay(player.id)
  const isOver = rules.isOver()
  const gradientIndex = getRelativePlayerIndex(context, player.id) % playerGradients.length

  return (
    <div css={[panelCss(panelHeight), panelGradientCss(gradientIndex), isTurnToPlay && activePanelCss, isViewed && viewedPanelCss, isClickable && clickablePanelCss]}>
      <div css={avatarWrapCss}>
        {isTurnToPlay && <div css={activeRingCss} />}
        <Avatar playerId={player.id} css={avatarCss} />
      </div>
      <div css={infoCss}>
        <span css={nameCss} title={playerName}>{playerName}</span>
        {!isOver && (
          <div css={timerRowCss}>
            <FontAwesomeIcon icon={faStopwatch} css={timerIconCss} />
            <PlayerTimer playerId={player.id} css={timerCss} customStyle={[blinkOnRunningTimeout]} />
          </div>
        )}
      </div>
    </div>
  )
}

// Panel fills its parent (positioned by PlayerPanels in table-em) and sets
// its own font-size so inner content scales with the panel height
// regardless of player count.
const panelCss = (panelHeight: number) => css`
  width: 100%;
  height: 100%;
  font-size: ${panelHeight / HEIGHT_UNITS}em;
  display: flex;
  align-items: center;
  gap: 0.6em;
  padding: 0.55em 0.7em;
  border-radius: 0.9em;
  color: ${colors.cream};
  font-family: ${fontDisplay};
  box-shadow: 0 0.2em 0.5em rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: visible;
  box-sizing: border-box;
`

const panelGradientCss = (index: number) => css`
  background: ${playerGradients[index]};
`

const activePanelCss = css`
  box-shadow:
    0 0 0 0.15em ${colors.gold},
    0 0.2em 0.5em rgba(0, 0, 0, 0.4);
`

const viewedPanelCss = css`
  box-shadow:
    0 0 0 0.18em ${colors.gold},
    0 0.2em 0.5em rgba(0, 0, 0, 0.4);
`

const clickablePanelCss = css`
  cursor: pointer;
  transition: transform 150ms ease, box-shadow 150ms ease;
  &:hover {
    transform: translateY(-0.05em);
    box-shadow:
      0 0 0 0.1em rgba(245, 200, 66, 0.6),
      0 0.3em 0.6em rgba(0, 0, 0, 0.5);
  }
`

const avatarWrapCss = css`
  position: relative;
  flex-shrink: 0;
  width: 3.8em;
  height: 3.8em;
`

const avatarCss = css`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 0.1em solid ${colors.navyDeep};
  z-index: 2;
`

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

const activeRingCss = css`
  position: absolute;
  inset: -0.25em;
  border-radius: 50%;
  background: conic-gradient(${colors.gold}, ${colors.navyLight}, ${colors.gold});
  animation: ${spin} 1.2s linear infinite;
  z-index: 0;
`

const infoCss = css`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 0.1em;
  gap: 0.15em;
`

const nameCss = css`
  font-weight: 600;
  font-size: 1.25em;
  color: ${colors.cream};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-shadow: 0 0.05em 0 rgba(0, 0, 0, 0.4);
  line-height: 1.1;
`

const timerRowCss = css`
  display: inline-flex;
  align-items: center;
  gap: 0.3em;
  background: rgba(0, 0, 0, 0.4);
  padding: 0.3em;
  border-radius: 0.25em;
  align-self: flex-start;
  font-size: 0.95em;
  color: ${colors.cream};
  font-variant-numeric: tabular-nums;
  line-height: 1;
`

const timerIconCss = css`
  font-size: 0.9em;
  color: ${colors.gold};
`

const timerCss = css`
  line-height: 1;
  color: ${colors.cream};
`
