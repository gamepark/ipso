/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { MoveComponentProps, usePlayerName } from '@gamepark/react-game'
import { MaterialMove } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import StarCardImage from '../images/StarCard.jpg'

export const UseStarCardLog: FC<MoveComponentProps<MaterialMove>> = ({ context }) => {
  const playerName = usePlayerName(context.game.rule?.player)

  return (
    <Trans
      i18nKey="log.use-star-card"
      values={{ player: playerName }}
      components={{ star: <img src={StarCardImage} alt="" css={starImgCss} /> }}
    />
  )
}

const starImgCss = css`
  display: inline-block;
  width: 2em;
  height: 2em;
  border-radius: 0.25em;
  margin: 0 0.15em;
  vertical-align: -0.5em;
  box-shadow: 0 0.05em 0.2em rgba(0, 0, 0, 0.5);
  object-fit: cover;
`
