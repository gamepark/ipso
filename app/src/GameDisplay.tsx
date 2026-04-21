import { css } from '@emotion/react'
import { DevToolsHub, GameTable } from '@gamepark/react-game'
import { PlayerPanels } from './panels/PlayerPanels'

export function GameDisplay() {
  const margin = { top: 7, left: 0, right: 0, bottom: 0 }
  return (
    <>
      <GameTable xMin={-20} xMax={20} yMin={3} yMax={25} margin={margin} zoom={false} css={process.env.NODE_ENV === 'development' && tableBorder}
                 verticalCenter>
        <PlayerPanels/>
        {process.env.NODE_ENV === 'development' && <DevToolsHub fabBottom="1em"/>}
      </GameTable>
    </>
  )
}

const tableBorder = css`
  border: 1px solid white;
`
