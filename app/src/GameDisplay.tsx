import { css } from '@emotion/react'
import { DevToolsHub, GameTable } from '@gamepark/react-game'
import { OddOrEvenDialog } from './material/help/OddOrEvenDialog'
import { useOddOrEvenDialog } from './OddOrEvenContext'
import { TABLE_X_MAX, TABLE_X_MIN, TABLE_Y_MAX, TABLE_Y_MIN } from './panels/PanelPosition'
import { PlayerPanels } from './panels/PlayerPanels'

export function GameDisplay() {
  const margin = { top: 7, left: 0, right: 0, bottom: 0 }
  const { show: showOddOrEven, dismiss: dismissOddOrEven } = useOddOrEvenDialog()
  return (
    <>
      <GameTable xMin={TABLE_X_MIN} xMax={TABLE_X_MAX} yMin={TABLE_Y_MIN} yMax={TABLE_Y_MAX} margin={margin} zoom={false}
        css={process.env.NODE_ENV === 'development' && tableBorder}
        verticalCenter>
        <PlayerPanels />
        {process.env.NODE_ENV === 'development' && <DevToolsHub fabBottom="1em" />}
      </GameTable>
      <OddOrEvenDialog open={showOddOrEven} onClose={dismissOddOrEven} />
    </>
  )
}

const tableBorder = css`
  border: 1px solid white;
`
