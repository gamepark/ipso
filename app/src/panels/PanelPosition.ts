export const PANEL_FONT_SIZE = 0.3
export const PANEL_ASPECT_RATIO = 4
const PANEL_GAP_EM = 0.7 // in panel em

// Table boundaries — single source of truth, consumed by GameDisplay.tsx too
export const TABLE_X_MIN = -20.5
export const TABLE_X_MAX = 20.5
export const TABLE_Y_MIN = 3
export const TABLE_Y_MAX = 25

const ROW_GAP_EM = 0.7 // vertical gap between rows, in panel em (6 players layout)
const ROW_EDGE_MARGIN_EM = 1 // margin from table edge for row-2 panels at 6 players

export function getPanelWidth(_playerCount: number): number {
  return 26
}

export function getPanelHeightEm(playerCount: number): number {
  return getPanelWidth(playerCount) / PANEL_ASPECT_RATIO
}

/** Number of panels on the top row (for multi-row layouts at 6 players) */
function getTopRowCount(playerCount: number): number {
  return playerCount === 6 ? 4 : playerCount
}

/**
 * Get panel CSS position in panel-em units (for CSS top/left)
 */
export function getPanelCssPosition(index: number, playerCount: number) {
  const tableWidthEm = (TABLE_X_MAX - TABLE_X_MIN) / PANEL_FONT_SIZE
  const panelWidth = getPanelWidth(playerCount)
  const panelHeight = getPanelHeightEm(playerCount)
  const topRowCount = getTopRowCount(playerCount)

  // Row 1 (centered)
  if (index < topRowCount) {
    const topRowWidth = topRowCount * panelWidth + (topRowCount - 1) * PANEL_GAP_EM
    const startLeft = (tableWidthEm - topRowWidth) / 2
    return { top: 0, left: startLeft + index * (panelWidth + PANEL_GAP_EM) }
  }

  // Row 2 (6-player layout): one far-left, one far-right
  const row2Top = panelHeight + ROW_GAP_EM
  const row2Index = index - topRowCount // 0 → left, 1 → right
  const left = row2Index === 0
    ? ROW_EDGE_MARGIN_EM
    : tableWidthEm - panelWidth - ROW_EDGE_MARGIN_EM
  return { top: row2Top, left }
}

/**
 * Get panel center position in TABLE coordinates (for locators/animations)
 */
export function getPanelTablePosition(index: number, playerCount: number) {
  const { top, left } = getPanelCssPosition(index, playerCount)
  const panelWidth = getPanelWidth(playerCount)
  const panelHeight = getPanelHeightEm(playerCount)
  const tableX = TABLE_X_MIN + left * PANEL_FONT_SIZE + (panelWidth * PANEL_FONT_SIZE) / 2
  const tableY = TABLE_Y_MIN + top * PANEL_FONT_SIZE + (panelHeight * PANEL_FONT_SIZE) / 2
  return { x: tableX, y: tableY }
}

/**
 * Get panel height in table coordinates
 */
export function getPanelHeight(playerCount: number = 2): number {
  return getPanelHeightEm(playerCount) * PANEL_FONT_SIZE
}
