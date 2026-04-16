import { css } from '@emotion/react'
import { DevToolsHub, GameTable, GameTableNavigation } from '@gamepark/react-game'
import { PlayerPanels } from './panels/PlayerPanels'

export function GameDisplay() {
  const margin = { top: 7, left: 0, right: 0, bottom: 0 }
  return (
    <>
      <GameTable xMin={-23} xMax={23} yMin={3} yMax={25} margin={margin} css={process.env.NODE_ENV === 'development' && tableBorder} verticalCenter>
        <GameTableNavigation css={navCss} />
        <PlayerPanels />
        {process.env.NODE_ENV === 'development' && <DevToolsHub fabBottom="1em" />}
      </GameTable>
    </>
  )
}

const navCss = css `
  top: 18em;
`

const tableBorder = css`
  border: 1px solid white;
`
