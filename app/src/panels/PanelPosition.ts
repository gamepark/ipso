export const PANEL_ASPECT_RATIO = 4

// Table boundaries — single source of truth, consumed by GameDisplay.tsx too
export const TABLE_X_MIN = -19
export const TABLE_X_MAX = 19
export const TABLE_Y_MIN = 3
export const TABLE_Y_MAX = 23

/** Panel width in TABLE em. Sized so all panels fit on a single row. */
export function getPanelWidth(playerCount: number): number {
  const tableWidth = TABLE_X_MAX - TABLE_X_MIN
  const max = 6
  if (playerCount <= 1) return max
  return Math.min(max, tableWidth / playerCount)
}

/** Panel height in TABLE em. */
export function getPanelHeight(playerCount: number): number {
  return getPanelWidth(playerCount) / PANEL_ASPECT_RATIO
}

/**
 * Get the panel center in TABLE coordinates. Panels are distributed across
 * the row with a "space-around" strategy: free space is split into equal
 * margins on both sides of every panel, so panel centers are evenly spaced
 * across the full table width regardless of player count.
 */
export function getPanelTablePosition(index: number, playerCount: number) {
  const tableWidth = TABLE_X_MAX - TABLE_X_MIN
  const panelWidth = getPanelWidth(playerCount)
  // space-around: each panel gets equal margin on both sides → centers are
  // spaced by tableWidth / playerCount, first center at margin + width/2.
  const margin = (tableWidth - playerCount * panelWidth) / (2 * playerCount)
  const x = TABLE_X_MIN + margin + panelWidth / 2 + index * (panelWidth + 2 * margin)
  const y = TABLE_Y_MIN + getPanelHeight(playerCount) / 2 + 0.5
  return { x, y }
}

/**
 * Slot index where the currently-viewed player's panel should sit.
 * The user spec: 2nd panel at 4 players, 3rd at 6 players.
 */
export function getCenterSlot(playerCount: number): number {
  if (playerCount <= 2) return 0
  if (playerCount === 3) return 1
  if (playerCount === 4) return 1
  if (playerCount === 5) return 2
  if (playerCount === 6) return 2
  return Math.floor(playerCount / 2)
}

/**
 * Map a player's natural index (sorted from me) to the slot where their
 * panel is rendered, given the currently viewed player. The panels rotate
 * around the layout so the viewed player lands on the center slot.
 *
 * For 2 players we don't rotate — there is no real "center".
 */
export function getPanelSlot(playerIndex: number, viewedIndex: number, playerCount: number): number {
  if (playerCount <= 2) return playerIndex
  const shift = getCenterSlot(playerCount) - viewedIndex
  return ((playerIndex + shift) % playerCount + playerCount) % playerCount
}

/**
 * Table-x of the center of the viewed player's panel: where the
 * full-size pyramid is anchored so it sits below their panel.
 * For 3+ players this is always the center slot (panels rotate);
 * for 2 players panels don't rotate, so it's the viewed player's slot.
 */
export function getCentralPyramidX(viewedIndex: number, playerCount: number): number {
  const slot = getPanelSlot(viewedIndex, viewedIndex, playerCount)
  return getPanelTablePosition(slot, playerCount).x
}

/**
 * Scale factor for mini pyramids (non-viewed players), applied via a
 * `scale()` transform in PyramidLocator.placeItem. Smaller as the player
 * count grows so each mini fits inside its panel column without
 * overlapping its neighbours.
 */
export function getMiniPyramidScale(playerCount: number): number {
  if (playerCount <= 3) return 0.55
  if (playerCount === 4) return 0.5
  if (playerCount === 5) return 0.4
  return 0.32
}
