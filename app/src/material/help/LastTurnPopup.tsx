/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import { Dialog, ThemeButton } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { colors } from '../../theme/colors'
import { fontDisplay } from '../../theme/typography'

type Props = {
  open: boolean
  onClose: () => void
}

export const LastTurnPopup: FC<Props> = ({ open, onClose }) => {
  const { t } = useTranslation()
  return (
    <Dialog open={open} onBackdropClick={onClose} backdropCss={transparentBackdropCss} css={dialogCss}>
      <div css={contentCss}>
        <h2>{t('last-turn.title')}</h2>
        <p>
          <Trans i18nKey="last-turn.intro" components={{ bold: <strong /> }} />
        </p>
        <p css={ruleCss}>
          <Trans i18nKey="last-turn.use" components={{ bold: <strong /> }} />
        </p>
        <p css={ruleCss}>
          <Trans i18nKey="last-turn.keep" components={{ bold: <strong /> }} />
        </p>
        <ThemeButton onClick={onClose} css={closeBtnCss}>
          {t('last-turn.ok')}
        </ThemeButton>
      </div>
    </Dialog>
  )
}

const transparentBackdropCss = css`
  background: transparent !important;
  pointer-events: none;

  > * {
    pointer-events: auto;
  }
`

const slideInRight = keyframes`
  from { transform: translateY(-50%) translateX(10%); opacity: 0; }
  to   { transform: translateY(-50%) translateX(0); opacity: 1; }
`

const dialogCss = css`
  position: fixed;
  top: 50%;
  right: 3em;
  width: 45vw;
  transform: translateY(-50%);
  margin: 0;
  box-sizing: border-box;
  animation: ${slideInRight} 0.3s ease forwards;
`

const contentCss = css`
  font-size: 3em;
  font-family: ${fontDisplay};
  color: ${colors.navy};
  padding: 1em;

  h2 {
    font-family: ${fontDisplay};
    font-weight: 700;
    color: ${colors.navy};
    text-transform: uppercase;
    letter-spacing: 0.03em;
    border-bottom: 0.15em solid ${colors.gold};
    padding-bottom: 0.3em;
    margin: 0 0 0.7em;
  }

  p {
    line-height: 1.5;
    margin: 0 0 0.7em;
  }

  strong, b {
    color: ${colors.goldDeep};
    font-weight: 700;
  }
`

const ruleCss = css`
  padding: 0.6em 0.8em;
  background: rgba(26, 46, 112, 0.08);
  border-left: 0.25em solid ${colors.gold};
  border-radius: 0 0.3em 0.3em 0;
`

const closeBtnCss = css`
  display: block;
  margin: 0.8em auto 0;
`
