/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { IpsoRules } from '@gamepark/ipso/IpsoRules.ts'
import { ScoreHelper } from '@gamepark/ipso/rules/helper/ScoreHelper.ts'
import { Picture, ScoringDescription } from '@gamepark/react-game'
import { getEnumValues } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import FirstLine from '../images/firstLine.jpg'
import SecondLine from '../images/secondLine.jpg'
import ThirdLine from '../images/thirdLine.jpg'
import FourthLine from '../images/fourthLine.jpg'
import StarCard from '../images/StarCard.jpg'
import StarIcon from '../images/starIcon.png'

enum ScoringKeys {
  StarCard,
  FourthLine,
  ThirdLine,
  SecondLine,
  FirstLine,
  Stars,
  Total
}

export class IpsoScoring implements ScoringDescription {
  getScoringKeys() {
    return getEnumValues(ScoringKeys)
  }

  getScoringHeader(key: ScoringKeys) {
    switch (key) {
      case ScoringKeys.FirstLine:
        return (
          <Trans
            i18nKey="game-over.score.type.line"
            components={{
              line: <Picture src={FirstLine} css={pictureCss} />
            }}
          />
        )
      case ScoringKeys.SecondLine:
        return (
          <Trans
            i18nKey="game-over.score.type.line"
            components={{
              line: <Picture src={SecondLine} css={pictureCss} />
            }}
          />
        )
      case ScoringKeys.ThirdLine:
        return (
          <Trans
            i18nKey="game-over.score.type.line"
            components={{
              line: <Picture src={ThirdLine} css={pictureCss} />
            }}
          />
        )
      case ScoringKeys.FourthLine:
        return (
          <Trans
            i18nKey="game-over.score.type.line"
            components={{
              line: <Picture src={FourthLine} css={pictureCss} />
            }}
          />
        )
      case ScoringKeys.Stars:
        return (
          <Trans
            i18nKey="game-over.score.type.stars"
            components={{
              stars: <Picture src={StarIcon} css={pictureCss} />
            }}
          />
        )
      case ScoringKeys.StarCard:
        return (
          <Trans
            i18nKey="game-over.score.type.star-card"
            components={{
              starcard: <Picture src={StarCard} css={pictureCss} />
            }}
          />
        )
      case ScoringKeys.Total:
        return (
          <div css={bold}>
            <Trans i18nKey="game-over.score.type.total"/>
          </div>
        )
    }
  }

  getScoringPlayerData(key: ScoringKeys, player: number, rules: IpsoRules) {
    const scoreHelper = new ScoreHelper(rules.game)
    switch (key) {
      case ScoringKeys.FirstLine:
        return (
          <Trans
            i18nKey="game-over.score.points"
            values={{
              points: scoreHelper.getLinePoints(player, 4)
            }}
          />
        )
      case ScoringKeys.SecondLine:
        return (
          <Trans
            i18nKey="game-over.score.points"
            values={{
              points: scoreHelper.getLinePoints(player, 3)
            }}
          />
        )
      case ScoringKeys.ThirdLine:
        return (
          <Trans
            i18nKey="game-over.score.points"
            values={{
              points: scoreHelper.getLinePoints(player, 2)
            }}
          />
        )
      case ScoringKeys.FourthLine:
        return (
          <Trans
            i18nKey="game-over.score.points"
            values={{
              points: scoreHelper.getLinePoints(player, 1)
            }}
          />
        )
      case ScoringKeys.Stars:
        return (
          <Trans
            i18nKey="game-over.score.points"
            values={{
              points: scoreHelper.getStars(player)
            }}
          />
        )
      case ScoringKeys.StarCard:
        return (
          <Trans
            i18nKey="game-over.score.points"
            values={{
              points: scoreHelper.getStarCard(player)
            }}
          />
        )
      case ScoringKeys.Total:
        return (
          <div css={bold}>
            <Trans
              i18nKey="game-over.score.points"
              values={{
                points: scoreHelper.calculateScore(player)
              }}
            />
          </div>
        )
    }
  }
}

const bold = css`
  font-weight: bold;
`

const pictureCss = css`
  display: inline-block;
  vertical-align: sub;
  height: 1.3em;
`