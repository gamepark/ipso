/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/ipso/material/LocationType'
import { MaterialType } from '@gamepark/ipso/material/MaterialType'
import { isTopStar, NumberCard } from '@gamepark/ipso/material/NumberCard'
import { MaterialHelpProps, Picture, PlayMoveButton, useLegalMoves, useRules } from '@gamepark/react-game'
import { isMoveItemType, MaterialRules } from '@gamepark/rules-api'
import { faHandPointer } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC, ReactNode } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { colors } from '../../theme/colors'
import { fontDisplay } from '../../theme/typography'
import FirstLine from '../../images/firstLine.jpg'
import SecondLine from '../../images/secondLine.jpg'
import ThirdLine from '../../images/thirdLine.jpg'
import FourthLine from '../../images/fourthLine.jpg'
import StarIcon from '../../images/starIcon.png'
import NumberCard6 from '../../images/NumberCard6.jpg'
import NumberCard7 from '../../images/NumberCard7.jpg'
import NumberCard8 from '../../images/NumberCard8.jpg'
import NumberCard9 from '../../images/NumberCard9.jpg'
import NumberCard10 from '../../images/NumberCard10.jpg'

const components = {
  bold: <strong />,
}

const HelpContent: FC<{ children: ReactNode }> = ({ children }) => (
  <div css={helpContentCss}>{children}</div>
)

const PlaceCardButton: FC<{ itemIndex?: number, closeDialog: () => void }> = ({ itemIndex, closeDialog }) => {
  const rules = useRules<MaterialRules>()
  const legalMoves = useLegalMoves()
  if (itemIndex === undefined || !rules) return null
  const item = rules.material(MaterialType.NumberCard).getItem(itemIndex)
  if (!item || item.location.type !== LocationType.CardDisplay) return null
  const canPlace = legalMoves.some(move =>
    isMoveItemType(MaterialType.NumberCard)(move)
    && move.itemIndex === itemIndex
    && move.location.type === LocationType.Pyramid
  )
  if (!canPlace) return null
  const numberCard = rules.material(MaterialType.NumberCard)
  const selectMoves = item.selected
    ? [numberCard.index(itemIndex).unselectItem()]
    : [...numberCard.selected().unselectItems(), numberCard.index(itemIndex).selectItem()]
  return (
    <PlayMoveButton move={selectMoves[0]} moves={selectMoves} transient onPlay={closeDialog} css={placeButtonCss}>
      <FontAwesomeIcon icon={faHandPointer} />
      <span>
        <Trans i18nKey={item.selected ? 'action.unselect' : 'action.place.long'} />
      </span>
    </PlayMoveButton>
  )
}

export const NumberCardHelp: FC<MaterialHelpProps> = ({ item, itemIndex, closeDialog }) => {
  const { t } = useTranslation()

  if (isTopStar(item?.id as NumberCard | undefined)) {
    return (
      <HelpContent>
        <h2>{t('help.star-card.title', 'Carte Étoile')}</h2>
        <p>
          <Trans i18nKey="help.star-card.description" components={components} />
        </p>
        <h3>{t('help.star-card.use.title', 'Utilisation')}</h3>
        <p>
          <Trans i18nKey="help.star-card.use.description" components={components} />
        </p>
        <h3>{t('help.star-card.bonus.title', 'Bonus de fin de partie')}</h3>
        <p>
          <Trans i18nKey="help.star-card.bonus.description" components={components} />
        </p>
      </HelpContent>
    )
  }

  return (
    <HelpContent>
      <h2>{t('help.number-card.title', 'Carte Numérotée')}</h2>
      <PlaceCardButton itemIndex={itemIndex} closeDialog={closeDialog} />
      <p>
        <Trans i18nKey="help.number-card.description" components={components} />
      </p>
      <p>
        <Trans i18nKey="help.number-card.colors" components={components} />
      </p>
      <div css={colorSamplesCss}>
        <Picture src={NumberCard6} css={sampleCardCss} />
        <Picture src={NumberCard7} css={sampleCardCss} />
        <Picture src={NumberCard8} css={sampleCardCss} />
        <Picture src={NumberCard9} css={sampleCardCss} />
        <Picture src={NumberCard10} css={sampleCardCss} />
      </div>
      <h3>{t('help.number-card.pyramid.title', 'La pyramide')}</h3>
      <p>
        <Trans i18nKey="help.number-card.pyramid.description" components={components} />
      </p>
      <h3>{t('help.number-card.scoring.title', 'Score')}</h3>
      <p>
        <Trans i18nKey="help.number-card.scoring.description" components={components} />
      </p>
      <ul css={listCss}>
        <li css={lineItemCss}>
          <Picture src={FirstLine} css={lineImgCss} />
          <Trans i18nKey="help.number-card.scoring.line1" components={components} />
        </li>
        <li css={lineItemCss}>
          <Picture src={SecondLine} css={lineImgCss} />
          <Trans i18nKey="help.number-card.scoring.line2" components={components} />
        </li>
        <li css={lineItemCss}>
          <Picture src={ThirdLine} css={lineImgCss} />
          <Trans i18nKey="help.number-card.scoring.line3" components={components} />
        </li>
        <li css={lineItemCss}>
          <Picture src={FourthLine} css={lineImgCss} />
          <Trans i18nKey="help.number-card.scoring.line4" components={components} />
        </li>
      </ul>
      <p>
        <Trans i18nKey="help.number-card.scoring.same-color" components={components} />
      </p>
      <h3>
        <Picture src={StarIcon} css={starIconCss} />
        {t('help.number-card.stars.title', 'Étoiles')}
      </h3>
      <p>
        <Trans i18nKey="help.number-card.stars.description" components={components} />
      </p>
    </HelpContent>
  )
}

const placeButtonCss = css`
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  margin-top: 0.3em;
  margin-bottom: 0.6em;
`

const helpContentCss = css`
  h2 {
    font-family: ${fontDisplay};
    font-weight: 700;
    color: ${colors.navy};
    text-transform: uppercase;
    letter-spacing: 0.03em;
    border-bottom: 2px solid ${colors.gold};
    padding-bottom: 0.3em;
    margin-top: 0;
  }

  h3 {
    font-family: ${fontDisplay};
    font-weight: 600;
    color: ${colors.navyLight};
    letter-spacing: 0.02em;
    margin-top: 1em;
    margin-bottom: 0.3em;
  }

  p { line-height: 1.5; margin: 0.5em 0; }

  strong, b {
    color: ${colors.goldDeep};
    font-weight: 700;
  }
`

const colorSamplesCss = css`
  display: flex;
  gap: 0.3em;
  margin-bottom: 0.8em;
`

const sampleCardCss = css`
  height: 4em;
  border-radius: 0.2em;
`

const listCss = css`
  margin-top: 0;
  padding-left: 1em;
`

const lineItemCss = css`
  margin-bottom: 0.4em;
  display: flex;
  align-items: center;
  gap: 0.5em;
`

const lineImgCss = css`
  height: 1.4em;
  border-radius: 0.15em;
  flex-shrink: 0;
`

const starIconCss = css`
  height: 1em;
  margin-right: 0.3em;
  vertical-align: middle;
`
