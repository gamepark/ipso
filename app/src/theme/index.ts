import { css } from '@emotion/react'
import { defaultTheme, GameTheme } from '@gamepark/react-game'
import { colors } from './colors'
import { fontBody, fontDisplay } from './typography'

const dialogContainer = css`
  box-shadow:
    0 0 0 0.1em rgba(245, 200, 66, 0.5),
    0 0.6em 1.5em rgba(0, 0, 0, 0.45);
`

const buttonBase = css`
  background: ${colors.navy} !important;
  color: ${colors.cream} !important;
  border: 0.15em solid ${colors.gold} !important;
  border-radius: 0.4em !important;
  padding: 0.4em 1em !important;
  font-family: ${fontDisplay};
  font-weight: 600;
  letter-spacing: 0.02em;
  cursor: pointer;
  box-shadow: 0 0.2em 0.3em rgba(0, 0, 0, 0.25);
  transition: background 150ms ease, color 150ms ease, transform 120ms ease;
  outline: none !important;

  &:hover:not(:disabled),
  &:focus:hover:not(:disabled) {
    background: ${colors.gold} !important;
    color: ${colors.navy} !important;
  }

  &:focus:not(:hover):not(:disabled) {
    background: ${colors.navy} !important;
    color: ${colors.cream} !important;
  }

  &:active:not(:disabled) {
    background: ${colors.goldDeep} !important;
    color: ${colors.navy} !important;
    transform: translateY(0.05em);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const headerBar = css`
  background: rgba(21, 35, 88, 0.92);
  border-bottom: 0.15em solid ${colors.gold};
  color: ${colors.cream};
  font-family: ${fontDisplay};
  box-shadow: 0 0.2em 0.4em rgba(0, 0, 0, 0.5);

  h1 {
    color: ${colors.cream};
    font-weight: 600;
  }

  b, strong {
    color: ${colors.gold};
  }
`

const headerButtons = css`
  background: transparent !important;
  color: ${colors.cream} !important;
  border: 0.08em solid ${colors.cream} !important;
  border-radius: 0.35em !important;
  font-family: ${fontDisplay};
  font-weight: 600;
  cursor: pointer;
  padding: 0 0.45em !important;
  letter-spacing: 0.02em;
  box-shadow: none !important;
  outline: none !important;
  transition: background 150ms ease, color 150ms ease;

  &:hover:not(:disabled),
  &:focus:hover:not(:disabled) {
    background: ${colors.cream} !important;
    color: ${colors.navy} !important;
  }

  &:focus:not(:hover):not(:disabled) {
    background: transparent !important;
    color: ${colors.cream} !important;
  }

  &:active:not(:disabled) {
    background: ${colors.gold} !important;
    color: ${colors.navy} !important;
  }
`

const journalHistoryEntry = css`
  background-color: rgba(26, 46, 112, 0.9) !important;
  border: 0.08em solid rgba(245, 200, 66, 0.25) !important;
  border-left: 0.3em solid ${colors.gold} !important;
  border-radius: 0.4em !important;
  color: ${colors.cream} !important;
  font-family: ${fontBody} !important;
  padding: 0.55em 0.8em 0.55em 0.9em !important;
  margin: 0.35em 0 !important;
  box-sizing: border-box !important;
  box-shadow: 0 0.15em 0.3em rgba(0, 0, 0, 0.35) !important;

  strong, b { color: ${colors.gold}; font-weight: 600; }
  a { color: ${colors.gold}; font-weight: 600; }
`

const menuPanel = css`
  background: ${colors.cream};
  color: ${colors.navy};
  border: 0.05em solid ${colors.navy};
  box-shadow:
    0 0 0 0.1em rgba(245, 200, 66, 0.5),
    0 0.6em 1.5em rgba(0, 0, 0, 0.45);
  font-family: ${fontDisplay};

  h2 {
    color: ${colors.navy};
    border-bottom: 0.15em solid ${colors.gold};
    padding-bottom: 0.3em;
  }
`

const journalTab = css`
  background: ${colors.cream} !important;
  color: ${colors.navy} !important;
  border-color: ${colors.navy} !important;
  font-family: ${fontDisplay};
  font-weight: 600;
`

const journalTabSelected = css`
  background: ${colors.navy} !important;
  color: ${colors.cream} !important;
`

const menuMainButton = css`
  background: ${colors.gold} !important;
  color: ${colors.navy} !important;
  border: 0.15em solid ${colors.navy} !important;
  outline: none !important;

  &:hover:not(:disabled) {
    background: ${colors.goldDeep} !important;
  }

  &:focus:not(:hover):not(:disabled) {
    background: ${colors.gold} !important;
  }
`

const tutorialContainer = css`
  font-family: ${fontBody};
  color: ${colors.navy};
  background: ${colors.cream};

  h2, h3 {
    font-family: ${fontDisplay};
    color: ${colors.navy};
  }

  strong, b { color: ${colors.goldDeep}; }
`

export const theme: GameTheme = {
  ...defaultTheme,
  root: {
    ...defaultTheme.root,
    fontFamily: fontBody
  },
  palette: {
    primary: colors.navy,
    primaryHover: colors.navyLight,
    primaryActive: colors.navyDeep,
    primaryLight: colors.cream,
    primaryLighter: colors.creamSoft,
    surface: colors.cream,
    onSurface: colors.navy,
    onSurfaceFocus: colors.creamSoft,
    onSurfaceActive: '#DFD9B8',
    danger: '#C13737',
    dangerHover: '#9E2828',
    dangerActive: '#7A1E1E',
    disabled: '#6B6B6B'
  },
  buttons: buttonBase,
  dialog: {
    ...defaultTheme.dialog,
    backgroundColor: colors.cream,
    color: colors.navy,
    container: dialogContainer,
    buttons: buttonBase
  },
  journal: {
    ...(defaultTheme.journal ?? {}),
    historyEntry: journalHistoryEntry
  },
  header: {
    bar: headerBar,
    buttons: headerButtons
  },
  menu: {
    panel: menuPanel,
    mainButton: menuMainButton
  },
  playerPanel: {
    activeRingColors: [colors.gold, colors.navy]
  },
  tutorial: {
    container: tutorialContainer
  }
}
