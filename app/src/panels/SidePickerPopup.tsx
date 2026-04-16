/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

type SidePickerPopupProps = {
  currentSide?: 'left' | 'right'
  onPick: (side: 'left' | 'right') => void
  onClose: () => void
}

export const SidePickerPopup: FC<SidePickerPopupProps> = ({ currentSide, onPick, onClose }) => {
  const { t } = useTranslation()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div css={bubbleCss} onClick={(e) => e.stopPropagation()}>
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
  border-radius: 0.3em;
  font-size: 2.4em;
  white-space: nowrap;
  background: rgba(0, 0, 0, 0.85);
  box-shadow: 0 0.2em 0.6em rgba(0, 0, 0, 0.6);
  color: white;

  &::before {
    content: '';
    position: absolute;
    top: -0.4em;
    left: 50%;
    transform: translateX(-50%);
    border-left: 0.4em solid transparent;
    border-right: 0.4em solid transparent;
    border-bottom: 0.45em solid rgba(0, 0, 0, 0.85);
  }
`

const labelCss = css`
  font-style: italic;
  font-size: 0.75em;
  color: #aaa;
  padding: 0 0.2em;
  white-space: nowrap;
`

const buttonCss = css`
  appearance: none;
  border: 1px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
  padding: 0.3em 0.8em;
  border-radius: 0.2em;
  font-family: inherit;
  font-size: 0.85em;
  color: white;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0.1em 0.2em rgba(0, 0, 0, 0.25);
  transition: background 150ms ease, transform 120ms ease;
  white-space: nowrap;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-0.05em);
  }
  &:active { transform: translateY(0.05em); }
`

const currentButtonCss = css`
  text-decoration: underline;
  text-decoration-color: rgba(255, 200, 50, 0.8);
  text-decoration-thickness: 0.1em;
  text-underline-offset: 0.2em;
`
