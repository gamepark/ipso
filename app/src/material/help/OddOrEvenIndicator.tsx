/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { colors } from '../../theme/colors'
import { fontDisplay } from '../../theme/typography'

type Props = {
  variantOn: boolean
  onClick: () => void
}

export const OddOrEvenIndicator: FC<Props> = ({ variantOn, onClick }) => {
  const { t } = useTranslation()
  const ariaKey = variantOn ? 'oddOrEven.indicator.aria.enabled' : 'oddOrEven.indicator.aria.disabled'
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={t(ariaKey)}
      title={t(ariaKey)}
      css={[indicatorCss, variantOn ? enabledCss : disabledCss]}
    >
      <FontAwesomeIcon icon={variantOn ? faCheck : faXmark} css={iconCss(variantOn)} />
      {t('oddOrEven.indicator')}
    </button>
  )
}

const indicatorCss = css`
  position: fixed;
  right: 1em;
  bottom: 1em;
  z-index: 100;
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.5em 0.9em;
  border-radius: 0.4em;
  font-family: ${fontDisplay};
  font-weight: 700;
  font-size: 1.4em;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease;
  user-select: none;

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`

const enabledCss = css`
  color: ${colors.navy};
  background: linear-gradient(135deg, ${colors.gold} 0%, ${colors.goldDeep} 100%);
  border: 0.12em solid ${colors.goldDeep};
  box-shadow: 0 0.2em 0.5em rgba(0, 0, 0, 0.3);

  &:hover {
    box-shadow: 0 0.3em 0.7em rgba(0, 0, 0, 0.35);
  }
`

const disabledCss = css`
  color: rgba(239, 236, 214, 0.75);
  background: rgba(21, 35, 88, 0.6);
  border: 0.12em solid rgba(239, 236, 214, 0.25);
  box-shadow: 0 0.15em 0.4em rgba(0, 0, 0, 0.25);
  opacity: 0.85;

  &:hover {
    opacity: 1;
  }
`

const iconCss = (variantOn: boolean) => css`
  font-size: 0.95em;
  color: ${variantOn ? '#1f8a3a' : 'rgba(239, 236, 214, 0.8)'};
  filter: ${variantOn ? 'drop-shadow(0 0 0.15em rgba(31, 138, 58, 0.5))' : 'none'};
`
