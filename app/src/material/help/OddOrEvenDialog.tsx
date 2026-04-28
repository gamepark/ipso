/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { RulesDialog, ThemeButton } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { colors } from '../../theme/colors'
import { fontDisplay } from '../../theme/typography'

type Props = {
  open: boolean
  onClose: () => void
  variantOn: boolean
}

export const OddOrEvenDialog: FC<Props> = ({ open, onClose, variantOn }) => {
  const { t } = useTranslation()
  const introKey = variantOn ? 'oddOrEven.dialog.intro' : 'oddOrEven.dialog.intro.disabled'
  return (
    <RulesDialog open={open} close={onClose}>
      <div css={contentCss}>
        <h2>{t('oddOrEven.dialog.title')}</h2>
        <p css={introCss}>
          <FontAwesomeIcon
            icon={variantOn ? faCheck : faXmark}
            css={introIconCss(variantOn)}
          />
          <Trans i18nKey={introKey} components={{ bold: <strong /> }} />
        </p>
        <p css={ruleCss}>
          <Trans i18nKey="oddOrEven.dialog.rule" components={{ bold: <strong /> }} />
        </p>
        <p css={exampleCss}>
          <Trans i18nKey="oddOrEven.dialog.example" components={{ bold: <strong /> }} />
        </p>
        <ThemeButton onClick={onClose} css={closeBtnCss}>
          {t('oddOrEven.dialog.ok')}
        </ThemeButton>
      </div>
    </RulesDialog>
  )
}

const contentCss = css`
  max-width: 40em;
  padding: 1em;
  font-size: 3em;
  font-family: ${fontDisplay};
  color: ${colors.navy};

  h2 {
    font-family: ${fontDisplay};
    font-weight: 700;
    color: ${colors.navy};
    text-transform: uppercase;
    letter-spacing: 0.03em;
    border-bottom: 0.15em solid ${colors.gold};
    padding-bottom: 0.3em;
    margin: 0 0 0.6em;
  }
`

const introCss = css`
  line-height: 1.5;
  margin: 0 0 0.8em;

  strong, b { color: ${colors.goldDeep}; font-weight: 700; }
`

const introIconCss = (variantOn: boolean) => css`
  margin-right: 0.5em;
  font-size: 1.1em;
  color: ${variantOn ? '#1f8a3a' : '#b53a2a'};
`

const ruleCss = css`
  line-height: 1.5;
  padding: 0.6em 0.8em;
  background: rgba(26, 46, 112, 0.08);
  border-left: 0.25em solid ${colors.gold};
  border-radius: 0 0.3em 0.3em 0;
  margin: 0 0 0.6em;
`

const exampleCss = css`
  line-height: 1.5;
  margin: 0 0 1em;
  font-style: italic;
  color: ${colors.navyLight};

  strong, b { color: ${colors.goldDeep}; font-weight: 700; font-style: normal; }
`

const closeBtnCss = css`
  display: block;
  margin: 0.5em auto 0;
`
