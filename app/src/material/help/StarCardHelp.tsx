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
        <Trans i18nKey="help.star-card.description" components={components} />
      </p>
      <h3>{t('help.star-card.use.title', 'Utilisation')}</h3>
      <p>
        <Trans  i18nKey="help.star-card.use.description" components={components} />
      </p>
      <h3>
        {t('help.star-card.bonus.title', 'Bonus de fin de partie')}
      </h3>
      <p>
        <Trans i18nKey="help.star-card.bonus.description" components={components} />
      </p>
    </>
  )
}
