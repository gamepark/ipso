/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
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

export const NumberCardHelp: FC<MaterialHelpProps> = () => {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t('help.number-card.title', 'Carte Numérotée')}</h2>
      <p>
        <Trans defaults="Chaque carte porte un <bold>numéro de 1 à 90</bold> et une <bold>couleur</bold> parmi cinq. Certaines cartes comportent également des <bold>étoiles</bold> (1 ou 2) qui rapportent des points bonus." i18nKey="help.number-card.description" components={components} />
      </p>
      <p>
        <Trans defaults="Il existe <bold>5 couleurs</bold> : rose, jaune, vert, cyan et orange." i18nKey="help.number-card.colors" components={components} />
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
        <Trans defaults="Chaque joueur construit une pyramide de <bold>14 cartes</bold> organisée en 4 lignes. Au début de la partie, toutes les cartes sont cachées. À chaque tour, vous choisissez une carte visible dans l'étalage et venez la placer dans votre pyramide face visible, en échangeant avec une carte cachée." i18nKey="help.number-card.pyramid.description" components={components} />
      </p>
      <h3>{t('help.number-card.scoring.title', 'Score')}</h3>
      <p>
        <Trans defaults="À la fin de la partie, chaque ligne de votre pyramide rapporte des points si ses cartes sont en <bold>ordre croissant</bold> de gauche à droite :" i18nKey="help.number-card.scoring.description" components={components} />
      </p>
      <ul css={listCss}>
        <li css={lineItemCss}>
          <Picture src={FirstLine} css={lineImgCss} />
          <Trans defaults="<bold>Ligne 1</bold> — 5 cartes : jusqu'à 10 points" i18nKey="help.number-card.scoring.line1" components={components} />
        </li>
        <li css={lineItemCss}>
          <Picture src={SecondLine} css={lineImgCss} />
          <Trans defaults="<bold>Ligne 2</bold> — 4 cartes : jusqu'à 8 points" i18nKey="help.number-card.scoring.line2" components={components} />
        </li>
        <li css={lineItemCss}>
          <Picture src={ThirdLine} css={lineImgCss} />
          <Trans defaults="<bold>Ligne 3</bold> — 3 cartes : jusqu'à 6 points" i18nKey="help.number-card.scoring.line3" components={components} />
        </li>
        <li css={lineItemCss}>
          <Picture src={FourthLine} css={lineImgCss} />
          <Trans defaults="<bold>Ligne 4</bold> — 2 cartes : jusqu'à 4 points" i18nKey="help.number-card.scoring.line4" components={components} />
        </li>
      </ul>
      <p>
        <Trans defaults="Une ligne croissante rapporte <bold>1 point par carte</bold>. Si toutes les cartes sont de la <bold>même couleur</bold>, elle rapporte <bold>2 points par carte</bold>. Une ligne non croissante est supprimée et ne rapporte rien." i18nKey="help.number-card.scoring.same-color" components={components} />
      </p>
      <h3>
        <Picture src={StarIcon} css={starIconCss} />
        {t('help.number-card.stars.title', 'Étoiles')}
      </h3>
      <p>
        <Trans defaults="Chaque étoile visible sur vos cartes en fin de partie rapporte <bold>1 point supplémentaire</bold>." i18nKey="help.number-card.stars.description" components={components} />
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
