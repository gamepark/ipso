/** @jsxImportSource @emotion/react */
import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'

const components = {
  bold: <strong />,
}

export const StarCardHelp: FC<MaterialHelpProps> = () => {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t('help.star-card.title', 'Carte Étoile')}</h2>
      <p>
        <Trans defaults="Chaque joueur possède <bold>une carte étoile</bold>, placée dans le sommet de sa pyramide au début de la partie." i18nKey="help.star-card.description" components={components} />
      </p>
      <h3>{t('help.star-card.use.title', 'Utilisation')}</h3>
      <p>
        <Trans defaults="Une fois que les <bold>14 cartes de votre pyramide sont toutes découvertes</bold>, vous pouvez défausser votre carte étoile pour piocher la première carte de la pioche et remplacer n'importe quelle carte de votre pyramide. Vous pouvez aussi choisir de <bold>passer</bold> et conserver votre carte étoile." i18nKey="help.star-card.use.description" components={components} />
      </p>
      <h3>
        {t('help.star-card.bonus.title', 'Bonus de fin de partie')}
      </h3>
      <p>
        <Trans defaults="Si votre carte étoile est toujours dans votre pyramide à la fin de la partie, elle vous rapporte <bold>3 points</bold> supplémentaires." i18nKey="help.star-card.bonus.description" components={components} />
      </p>
    </>
  )
}
