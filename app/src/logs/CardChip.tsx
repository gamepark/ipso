/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { MaterialType } from '@gamepark/ipso/material/MaterialType'
import { isTopStar, NumberCard } from '@gamepark/ipso/material/NumberCard'
import { PlayMoveButton } from '@gamepark/react-game'
import { MaterialItem, MaterialMoveBuilder } from '@gamepark/rules-api'
import { FC } from 'react'
import { numberCardDescription } from '../material/NumberCardDescription'
import { colors } from '../theme/colors'

type CardChipProps = {
  item: MaterialItem
  revealedId?: NumberCard
}

export const CardChip: FC<CardChipProps> = ({ item, revealedId }) => {
  const id = (item.id ?? revealedId) as NumberCard | undefined
  const image = id !== undefined ? numberCardDescription.images[id] : undefined

  if (id === undefined || !image) {
    return <span css={[wrapperCss, hiddenCss]}>?</span>
  }

  return (
    <PlayMoveButton
      move={MaterialMoveBuilder.displayMaterialHelp(MaterialType.NumberCard, item)}
      transient
      css={[wrapperCss, buttonResetCss, isTopStar(id) && starBorderCss]}
    >
      <img src={image} alt="" css={imgCss} />
    </PlayMoveButton>
  )
}

const wrapperCss = css`
  display: inline-block;
  width: 2em;
  height: 2em;
  border-radius: 0.25em;
  margin: 0 0.15em;
  vertical-align: -0.5em;
  box-shadow: 0 0.05em 0.2em rgba(0, 0, 0, 0.5);
  overflow: hidden;
`

const buttonResetCss = css`
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;

  &:hover, &:focus, &:active {
    background: transparent !important;
    opacity: 1 !important;
    transform: scale(1.05);
  }
`

const imgCss = css`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
`

const starBorderCss = css`
  outline: 2px solid ${colors.goldDeep};
  outline-offset: -2px;
`

const hiddenCss = css`
  background: ${colors.navyLight};
  color: ${colors.cream};
  display: inline-grid;
  place-items: center;
  font-weight: 700;
  opacity: 0.7;
`
