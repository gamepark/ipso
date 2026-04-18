import { XYCoordinates } from '@gamepark/rules-api'

export const pyramidLinesY = [1, 2, 3, 4]

export function getPyramidPositions(): XYCoordinates[] {
  const positions: XYCoordinates[] = []
  for (const y of pyramidLinesY) {
    for (let x = 0; x <= y; x++) {
      positions.push({ x, y })
    }
  }
  return positions
}

export function isAscending(numbers: number[]): boolean {
  return numbers.every((n, i) => i === 0 || n > numbers[i - 1])
}
