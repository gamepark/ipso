import { css, Global } from '@emotion/react'
import { FailuresDialog, FullscreenDialog, LoadingScreen, MaterialGameSounds, MaterialHeader, MaterialImageLoader, Menu, useGame } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { useEffect, useState } from 'react'
import { GameDisplay } from './GameDisplay'
import { Headers } from './headers/Headers'

export function App() {
  const game = useGame<MaterialGame>()
  const [isJustDisplayed, setJustDisplayed] = useState(true)
  const [isImagesLoading, setImagesLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => setJustDisplayed(false), process.env.NODE_ENV === 'development' ? 0 : 2000)
  }, [])
  const loading = !game || isJustDisplayed || isImagesLoading
  return (
    <>
      <Global styles={backgroundGradient} />
      {!!game && <GameDisplay />}
      <LoadingScreen display={loading} />
      <MaterialHeader rulesStepsHeaders={Headers} loading={loading} />
      <MaterialImageLoader onImagesLoad={() => setImagesLoading(false)} />
      <MaterialGameSounds />
      <Menu />
      <FailuresDialog />
      <FullscreenDialog />
    </>
  )
}

const backgroundGradient = css`
  #root {
    background: radial-gradient(ellipse at top left, #0A6BC5 0%, #153A8E 45%, #1A2E70 100%) !important;
  }
`
