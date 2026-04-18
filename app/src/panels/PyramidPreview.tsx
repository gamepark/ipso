/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/ipso/material/LocationType'
import { MaterialType } from '@gamepark/ipso/material/MaterialType'
import { NumberCard } from '@gamepark/ipso/material/NumberCard'
import { IpsoRules } from '@gamepark/ipso/IpsoRules'
import { useRules } from '@gamepark/react-game'
import { FC } from 'react'
import { numberCardDescription } from '../material/NumberCardDescription'
import { starCardDescription } from '../material/StarCardDescription'

type PyramidPreviewProps = {
  playerId: number
}

const rows = [4, 3, 2, 1]

export const PyramidPreview: FC<PyramidPreviewProps> = ({ playerId }) => {
  const rules = useRules<IpsoRules>()!
  const cards = rules.material(MaterialType.NumberCard)
    .location(LocationType.Pyramid)
    .player(playerId)
    .getItems()

  const starCard = rules.material(MaterialType.StarCard)
    .location(LocationType.Pyramid)
    .player(playerId)
    .getItems()

  return (
    <div css={previewCss}>
      {rows.map((y) => (
        <div key={y} css={[rowCss, rowWidthCss(y + 1, 5)]}>
          {Array.from({ length: y + 1 }, (_, x) => {
            const card = cards.find(c => c.location.y === y && c.location.x === x)
            const isRevealed = card && card.id !== undefined && !card.location.rotation
            const image = isRevealed
              ? numberCardDescription.images[card!.id as NumberCard]
              : numberCardDescription.backImage
            return (
              <img
                key={x}
                src={image}
                alt=""
                css={cellCss}
              />
            )
          })}
        </div>
      ))}
      {starCard.length > 0 && (
        <div css={[rowCss, rowWidthCss(1, 5)]}>
          <img src={starCardDescription.image} alt="" css={cellCss} />
        </div>
      )}
    </div>
  )
}

const previewCss = css`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  gap: 0.3em;
  padding: 0.5em;
`

const rowCss = css`
  display: flex;
  gap: 0.3em;
`

const rowWidthCss = (count: number, maxCount: number) => css`
  width: ${(count / maxCount) * 100}%;
`

const cellCss = css`
  flex: 1;
  aspect-ratio: 1;
  border-radius: 10%;
  object-fit: cover;
  min-width: 0;
`
