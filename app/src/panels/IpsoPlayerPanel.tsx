/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import { IpsoRules } from '@gamepark/ipso/IpsoRules'
import { isTopStar, NumberCard } from '@gamepark/ipso/material/NumberCard'
import { LocationType } from '@gamepark/ipso/material/LocationType'
import { MaterialType } from '@gamepark/ipso/material/MaterialType'
import { Player } from '@gamepark/react-client'
import { Avatar, getRelativePlayerIndex, PlayerTimer, useMaterialContext, usePlayerName, useRules } from '@gamepark/react-game'
import { blinkOnRunningTimeout } from '@gamepark/react-game/dist/components/PlayerTimer/PlayerTimer'
import { faStopwatch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'
import { colors, playerGradients } from '../theme/colors'
import { fontDisplay } from '../theme/typography'
import { getPanelWidth, PANEL_ASPECT_RATIO } from './PanelPosition'

type IpsoPlayerPanelProps = {
  player: Player
  isViewed?: boolean
  isClickable?: boolean
}


export const IpsoPlayerPanel: FC<IpsoPlayerPanelProps> = ({ player, isViewed, isClickable }) => {
  const rules = useRules<IpsoRules>()!
  const context = useMaterialContext()
  const playerName = usePlayerName(player.id)
  const isTurnToPlay = rules.isTurnToPlay(player.id)
  const isOver = rules.isOver()
  const gradientIndex = getRelativePlayerIndex(context, player.id) % playerGradients.length

  const playerCount = rules.players.length
  const width = getPanelWidth(playerCount)

  const pyramidCards = rules.material(MaterialType.NumberCard)
    .location(LocationType.Pyramid)
    .player(player.id)
    .getItems<NumberCard>()

  const starPresent = pyramidCards.some(c => isTopStar(c.id))
  const rows = [1, 2, 3, 4]

  return (
    <div css={[panelCss(width), panelGradientCss(gradientIndex), isTurnToPlay && activePanelCss, isViewed && isClickable && viewedPanelCss]}>
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
      <div css={miniPyramidCss}>
        <div css={rowCss}>
          <span css={[cellCss, starPresent ? cellStarCss : cellEmptyCss]} />
        </div>
        {rows.map(y => (
          <div key={y} css={rowCss}>
            {Array.from({ length: y + 1 }).map((_, x) => {
              const card = pyramidCards.find(c => c.location.y === y && c.location.x === x)
              const revealed = card && card.id !== undefined && !card.location.rotation
              return <span key={x} css={[cellCss, revealed && cellRevealedCss]} />
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

// Height derived from width/ratio. Inner content scales via panel's
// own font-size (1 inner em = panel_height / HEIGHT_UNITS), so changing
// the ratio really does resize the content (taller panel → bigger text).
// Width + height are both expressed in panel-em so their physical sizes
// in wrapper em come out to `width` × `width / PANEL_ASPECT_RATIO`
// regardless of the font-size scaling.
const HEIGHT_UNITS = 5

const panelCss = (width: number) => {
  const heightWrapperEm = width / PANEL_ASPECT_RATIO        // physical height in wrapper em
  const innerUnit = heightWrapperEm / HEIGHT_UNITS          // 1 inner em in wrapper em
  const widthInPanelEm = width / innerUnit                  // CSS width (panel-em)
  return css`
    width: ${widthInPanelEm}em;
    height: ${HEIGHT_UNITS}em;
    font-size: ${innerUnit}em;
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
}

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
    0 0 0 0.12em ${colors.gold},
    0 0.2em 0.5em rgba(0, 0, 0, 0.4);
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

const miniPyramidCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.12em;
  flex-shrink: 0;
  opacity: 0.95;
`

const rowCss = css`
  display: flex;
  gap: 0.12em;
`

const cellCss = css`
  width: 0.65em;
  height: 0.65em;
  border-radius: 0.12em;
  background: rgba(26, 46, 112, 0.5);
  border: 1px solid rgba(239, 236, 214, 0.25);
`

const cellEmptyCss = css`
  background: transparent;
  border-style: dashed;
  opacity: 0.4;
`

const cellRevealedCss = css`
  background: rgba(239, 236, 214, 0.75);
`

const cellStarCss = css`
  background: ${colors.gold};
  border-color: ${colors.goldDeep};
`
