/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { IpsoRules } from '@gamepark/ipso/IpsoRules'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { FC } from 'react'
import { getSides } from '../locators/ViewHelper'

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
  font-style: italic;
  font-weight: 600;
  letter-spacing: 0.03em;
  padding: 0.2em 0.9em;
  border-radius: 0.2em;
  pointer-events: none;
  white-space: nowrap;
  z-index: 50;
  background: rgba(0, 0, 0, 0.7);
  box-shadow: 0 0.2em 0.4em rgba(0, 0, 0, 0.55);
  color: white;
  font-size: 1.1em;
`

const leftCss = css`
  left: 22.5%;
  transform: translateX(-50%) translateZ(100em);
`

const rightCss = css`
  left: 77.5%;
  transform: translateX(-50%) translateZ(100em);
`
