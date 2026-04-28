import { PlayerId } from '@gamepark/ipso/PlayerId'
import { MaterialContext } from '@gamepark/react-game'

/**
 * `game.view` stores the currently-viewed player id (1..N).
 * Falls back to the current player when unset or invalid.
 */
export function getViewedPlayer(context: MaterialContext): PlayerId {
  const players = context.rules.players
  const view = (context.rules as any).game.view
  if (typeof view === 'number' && players.includes(view)) return view
  return (context.player ?? players[0]) as PlayerId
}
