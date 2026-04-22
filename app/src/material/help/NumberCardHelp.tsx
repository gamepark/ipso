/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { isTopStar, NumberCard } from '@gamepark/ipso/material/NumberCard'
import { MaterialHelpProps, Picture } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
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

export const NumberCardHelp: FC<MaterialHelpProps> = ({ item }) => {
  const { t } = useTranslation()

  if (isTopStar(item?.id as NumberCard | undefined)) {
    return (
      <>
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
      </>
    )
  }

  return (
    <>
      <h2>{t('help.number-card.title', 'Carte Numérotée')}</h2>
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
    </>
  )
}

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
