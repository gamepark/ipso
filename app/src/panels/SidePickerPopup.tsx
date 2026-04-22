/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FC, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { colors } from '../theme/colors'
import { fontDisplay } from '../theme/typography'

type SidePickerPopupProps = {
  currentSide?: 'left' | 'right'
  onPick: (side: 'left' | 'right') => void
  onClose: () => void
}

export const SidePickerPopup: FC<SidePickerPopupProps> = ({ currentSide, onPick, onClose }) => {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    const onOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose()
        e.stopPropagation()
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onOutside, true)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onOutside, true)
    }
  }, [onClose])

  return (
    <div ref={ref} css={bubbleCss} onClick={(e) => e.stopPropagation()}>
      <span css={labelCss}>{t('view.display-at', 'Afficher à')}</span>
      <button
        css={[buttonCss, currentSide === 'left' && currentButtonCss]}
        onClick={() => onPick('left')}
      >
        {t('view.left', 'Gauche')}
      </button>
      <button
        css={[buttonCss, currentSide === 'right' && currentButtonCss]}
        onClick={() => onPick('right')}
      >
        {t('view.right', 'Droite')}
      </button>
    </div>
  )
}

const bubbleCss = css`
  position: absolute;
  top: calc(100% + 0.8em);
  left: 50%;
  transform: translateX(-50%) translateZ(100em);
  z-index: 200;
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.5em 0.7em;
  border-radius: 0.4em;
  font-size: 2.4em;
  white-space: nowrap;
  background: ${colors.cream};
  border: 2px solid ${colors.navy};
  box-shadow: 0 0.3em 0.6em rgba(0, 0, 0, 0.5);
  color: ${colors.navy};
  font-family: ${fontDisplay};

  &::before {
    content: '';
    position: absolute;
    top: -0.5em;
    left: 50%;
    transform: translateX(-50%);
    border-left: 0.4em solid transparent;
    border-right: 0.4em solid transparent;
    border-bottom: 0.5em solid ${colors.navy};
  }
`

const labelCss = css`
  font-style: italic;
  font-size: 0.75em;
  color: ${colors.navyLight};
  padding: 0 0.2em;
  white-space: nowrap;
`

const buttonCss = css`
  appearance: none;
  border: none;
  cursor: pointer;
  padding: 0.3em 0.8em;
  border-radius: 0.25em;
  font-family: ${fontDisplay};
  font-weight: 600;
  font-size: 0.85em;
  color: ${colors.cream};
  background: ${colors.navy};
  box-shadow: 0 0.1em 0.2em rgba(0, 0, 0, 0.25);
  transition: background 150ms ease, color 150ms ease, transform 120ms ease;
  white-space: nowrap;

  &:hover {
    background: ${colors.navyLight};
    transform: translateY(-0.05em);
  }
  &:active { transform: translateY(0.05em); }
`

const currentButtonCss = css`
  background: ${colors.gold};
  color: ${colors.navy};

  &:hover {
    background: ${colors.goldDeep};
  }
`
