/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { IpsoRules } from '@gamepark/ipso/IpsoRules'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { FC } from 'react'
import { getSides } from '../locators/ViewHelper'
import { colors } from '../theme/colors'
import { fontDisplay } from '../theme/typography'

export const BoardNameLabels: FC = () => {
  const rules = useRules<IpsoRules>()
  const me = usePlayerId()

  if (!rules || rules.players.length < 2) return null

  const { left, right } = getSides({ rules, player: me } as any)

  return (
    <>
      <BoardLabel playerId={left} side="left" />
      <BoardLabel playerId={right} side="right" />
    </>
  )
}

const BoardLabel: FC<{ playerId: number, side: 'left' | 'right' }> = ({ playerId, side }) => {
  const name = usePlayerName(playerId) || ''
  return (
    <div css={[labelCss, side === 'left' ? leftCss : rightCss]}>
      {name}
    </div>
  )
}

const labelCss = css`
  position: absolute;
  bottom: 0.1em;
  transform-style: preserve-3d;
  font-family: ${fontDisplay};
  font-style: italic;
  font-weight: 600;
  letter-spacing: 0.03em;
  padding: 0.2em 0.9em;
  border-radius: 0.25em;
  pointer-events: none;
  white-space: nowrap;
  z-index: 50;
  background: rgba(21, 35, 88, 0.85);
  border-left: 2px solid ${colors.gold};
  box-shadow: 0 0.2em 0.4em rgba(0, 0, 0, 0.55);
  color: ${colors.cream};
  font-size: 1.1em;
`

const leftCss = css`
  left: 23.17%;
  transform: translateX(-50%) translateZ(100em);
`

const rightCss = css`
  left: 76.83%;
  transform: translateX(-50%) translateZ(100em);
`
