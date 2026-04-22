export const PANEL_FONT_SIZE = 0.3
export const PANEL_WIDTH_EM = 28 // in panel em (StyledPlayerPanel default)
const PANEL_GAP_EM = 1 // in panel em

// Table boundaries (must match GameDisplay.tsx)
const TABLE_X_MIN = -20
const TABLE_X_MAX = 20
const TABLE_Y_MIN = 3

/**
 * Get panel CSS position in panel-em units (for CSS top/left)
 */
export function getPanelCssPosition(index: number, playerCount: number) {
  const top = 0
  const tableWidthEm = (TABLE_X_MAX - TABLE_X_MIN) / PANEL_FONT_SIZE
  const totalPanelsWidth = playerCount * PANEL_WIDTH_EM + (playerCount - 1) * PANEL_GAP_EM
  const startLeft = (tableWidthEm - totalPanelsWidth) / 2
  const left = startLeft + index * (PANEL_WIDTH_EM + PANEL_GAP_EM)
  return { top, left }
}

/**
 * Get panel center position in TABLE coordinates (for locators/animations)
 */
export function getPanelTablePosition(index: number, playerCount: number) {
  const { top, left } = getPanelCssPosition(index, playerCount)
  const tableX = TABLE_X_MIN + left * PANEL_FONT_SIZE + (PANEL_WIDTH_EM * PANEL_FONT_SIZE) / 2
  const tableY = TABLE_Y_MIN + top * PANEL_FONT_SIZE + getPanelHeight() / 2
  return { x: tableX, y: tableY }
}

/**
 * Get panel height in table coordinates
 */
export function getPanelHeight() {
  return 7 * PANEL_FONT_SIZE // ~2.1em in table coords
}
