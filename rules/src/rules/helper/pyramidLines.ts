export const pyramidLines: number[][] = [
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11],
  [12, 13]
]

export function isAscending(numbers: number[]): boolean {
  return numbers.every((n, i) => i === 0 || n > numbers[i - 1])
}
