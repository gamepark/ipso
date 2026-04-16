import { PlayerId } from '@gamepark/ipso/PlayerId'
import { ItemContext, MaterialContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'

/**
 * Packs two viewed players (left + right) into a single number for game.view:
 *
 *     view = 1 * 1000 + leftPlayerId * 100 + 2 * 10 + rightPlayerId
 *
 * Example: left=1, right=3  →  1123
 */

const SLOT_LEFT = 1
const SLOT_RIGHT = 2

export const encodeView = (left: PlayerId, right: PlayerId): number =>
  SLOT_LEFT * 1000 + left * 100 + SLOT_RIGHT * 10 + right

export const decodeView = (view: number | undefined): { left: PlayerId, right: PlayerId } | undefined => {
  if (view === undefined || view < 1000) return undefined
  const s1 = Math.floor(view / 1000)
  const p1 = Math.floor((view / 100) % 10) as PlayerId
  const s2 = Math.floor((view / 10) % 10)
  const p2 = (view % 10) as PlayerId
  if (p1 < 1 || p2 < 1) return undefined
  const left = s1 === SLOT_LEFT ? p1 : s2 === SLOT_LEFT ? p2 : undefined
  const right = s1 === SLOT_RIGHT ? p1 : s2 === SLOT_RIGHT ? p2 : undefined
  if (left === undefined || right === undefined) return undefined
  return { left, right }
}

function defaultSides(context: MaterialContext): { left: PlayerId, right: PlayerId } {
  const players = context.rules.players
  const me = context.player ?? players[0]
  const meIndex = players.indexOf(me)
  const next = players[(meIndex + 1) % players.length]
  return { left: me, right: next }
}

export function getSides(context: MaterialContext): { left: PlayerId, right: PlayerId } {
  const view: number | undefined = (context.rules as any).game.view
  const decoded = decodeView(view)
  if (decoded) return decoded
  return defaultSides(context)
}

export function getLeftPlayer(context: MaterialContext): PlayerId {
  return getSides(context).left
}

export function getRightPlayer(context: MaterialContext): PlayerId {
  return getSides(context).right
}

export function isPlayerVisible(item: MaterialItem, context: ItemContext): boolean {
  const { left, right } = getSides(context)
  return item.location.player === left || item.location.player === right
}
