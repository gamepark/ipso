import { css } from '@emotion/react'
import { PlayerId } from '@gamepark/ipso/PlayerId'
import { StyledPlayerPanel, usePlayers } from '@gamepark/react-game'
import { createPortal } from 'react-dom'

export const PlayerPanels = () => {
  const players = usePlayers<PlayerId>({ sortFromMe: true })
  const root = document.getElementById('root')
  if (!root) {
    return null
  }

  return createPortal(
    <>
      {players.map((player, index) => (
        <StyledPlayerPanel key={player.id} player={player} css={panelPosition(players.length, index)} color={"#000000"} activeRing />
      ))}
    </>,
    root
  )
}

const panelPosition = (players: number, index: number) => {
  const panelCss = positionCss[players -2][index]
  return css`
   position: absolute;
   ${panelCss}
   ${backgrounds[index]}
  `
}

const topLeft = css`
  left: 1em;
  top: 8.5em;
`

const topCenter = css`
  left: 50%;
  transform: translateX(-50%);
  top: 8.5em;
`

const topRight = css`
  right: 1em;
  top: 8.5em;
`

const bottomLeft = css`
  left: 1em;
  bottom: 1em;
`

const bottomCenter = css`
  left: 50%;
  transform: translateX(-50%);
  bottom: 1em;
`

const bottomRight = css`
  right: 1em;
  bottom: 1em;
`

const positionCss = [
  [topLeft, topRight], // 2 players
  [bottomLeft, topCenter, bottomRight], // 3 players
  [bottomLeft, topLeft, topRight, bottomRight], // 4 players
  [bottomLeft, topLeft, topCenter, topRight, bottomRight], // 5 players
  [bottomLeft, topLeft, topCenter, topRight, bottomRight, bottomCenter] // 6 players
]

const pink = css`background: linear-gradient(135deg, white 0%, #fb49c5 80%)`
const red = css`background: linear-gradient(135deg, white 0%, #ff5c25 80%)`
const blue = css`background: linear-gradient(135deg, white 0%, #009ace 80%)`
const green = css`background: linear-gradient(135deg, white 0%, #44d62d 80%)`
const yellow = css`background: linear-gradient(135deg, white 0%, #ffe900 80%)`
const purple = css`background: linear-gradient(135deg, white 0%, #9900ff 80%)`

const backgrounds = [pink, red, blue, green, yellow, purple]