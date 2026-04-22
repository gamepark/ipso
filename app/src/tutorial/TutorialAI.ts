import { IpsoRules } from '@gamepark/ipso/IpsoRules'
import { LocationType } from '@gamepark/ipso/material/LocationType'
import { MaterialType } from '@gamepark/ipso/material/MaterialType'
import { isTopStar, NumberCard, numberCardData } from '@gamepark/ipso/material/NumberCard'
import { CustomMoveType } from '@gamepark/ipso/rules/CustomMoveType'
import { MemoryType } from '@gamepark/ipso/rules/MemoryType'
import { RuleId } from '@gamepark/ipso/rules/RuleId'
import { isCustomMoveType, isMoveItemType, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { sample } from 'es-toolkit'

/**
 * Simple heuristic AI for the Ipso tutorial.
 * Goal: maximize the player's score by placing cards to build ascending lines,
 * favoring same-color bonuses and high-star cards.
 */
export const ai = (game: MaterialGame, player: number): Promise<MaterialMove[]> => {
  const rules = new IpsoRules(game)
  const legalMoves = rules.getLegalMoves(player)

  if (legalMoves.length === 0) return Promise.resolve([])
  if (legalMoves.length === 1) return Promise.resolve(legalMoves)

  let selectedMove: MaterialMove
  switch (game.rule?.id) {
    case RuleId.PlayCard:
      selectedMove = getBestPlayCardMove(rules, player, legalMoves)
      break
    case RuleId.UseStarCard:
      selectedMove = getBestUseStarCardMove(rules, player, legalMoves)
      break
    default:
      selectedMove = sample(legalMoves)!
  }

  return Promise.resolve([selectedMove])
}

function getBestPlayCardMove(rules: IpsoRules, player: number, moves: MaterialMove[]): MaterialMove {
  const placements = moves.filter(
    (m) => isMoveItemType(MaterialType.NumberCard)(m) && m.location.type === LocationType.Pyramid
  )
  if (placements.length === 0) return sample(moves)!
  const scored = placements.map((move) => ({ move, score: scorePlacement(rules, player, move) }))
  return selectBestMove(scored)
}

function getBestUseStarCardMove(rules: IpsoRules, player: number, moves: MaterialMove[]): MaterialMove {
  const passMoves = moves.filter((m) => isCustomMoveType(CustomMoveType.Pass)(m))

  if (passMoves.length > 0) {
    // Star card is still in the pyramid: keeping it guarantees +3 points.
    // If we're losing though, passing just locks in the loss — risk the trade for a draw pile card.
    const myScore = rules.getScore(player)
    const opponents = rules.game.players.filter((p) => p !== player)
    const maxOpponentScore = opponents.length ? Math.max(...opponents.map((p) => rules.getScore(p))) : 0
    if (myScore >= maxOpponentScore) return passMoves[0]
    const discardStar = moves.find((m) => {
      if (!isMoveItemType(MaterialType.NumberCard)(m)) return false
      if (m.location.type !== LocationType.DiscardPile) return false
      const item = rules.material(MaterialType.NumberCard).getItem<NumberCard>(m.itemIndex)
      return isTopStar(item?.id)
    })
    if (discardStar) return discardStar
    return passMoves[0]
  }

  const pyramidPlacements = moves.filter(
    (m) => isMoveItemType(MaterialType.NumberCard)(m) && m.location.type === LocationType.Pyramid
  )
  const discardMoves = moves.filter(
    (m) => isMoveItemType(MaterialType.NumberCard)(m) && m.location.type === LocationType.DiscardPile
  )

  if (pyramidPlacements.length === 0) {
    return discardMoves[0] ?? sample(moves)!
  }

  // All 14 cards are face-up at this point, so we can compute the real score delta
  // (line points + stars) for each potential replacement and pick the actual best.
  const oddOrEven = !!rules.remind(MemoryType.OddOrEvenOptionEnabled)
  const scored = pyramidPlacements.map((move) => ({
    move,
    delta: scoreStarCardPlacement(rules, player, move, oddOrEven)
  }))
  const best = scored.reduce((a, b) => (a.delta >= b.delta ? a : b))

  if (best.delta > 0) return best.move
  return discardMoves[0] ?? best.move
}

function scoreStarCardPlacement(
  rules: IpsoRules,
  player: number,
  move: MaterialMove,
  oddOrEven: boolean
): number {
  if (!isMoveItemType(MaterialType.NumberCard)(move)) return 0
  if (move.location.type !== LocationType.Pyramid) return 0
  const { x, y } = move.location
  if (x === undefined || y === undefined) return 0

  const newCardItem = rules.material(MaterialType.NumberCard).getItem(move.itemIndex)
  if (newCardItem?.id === undefined) return 0
  const newCard = newCardItem.id as NumberCard

  const lineItems = rules
    .material(MaterialType.NumberCard)
    .location(LocationType.Pyramid)
    .player(player)
    .location((l) => l.y === y)
    .getItems()
    .filter((item) => item.id !== undefined)
    .sort((a, b) => (a.location.x ?? 0) - (b.location.x ?? 0))

  const oldLineIds = lineItems.map((item) => item.id as NumberCard)
  const oldCardAtPos = lineItems.find((item) => item.location.x === x)?.id as NumberCard | undefined
  const newLineIds = lineItems.map((item) =>
    item.location.x === x ? newCard : (item.id as NumberCard)
  )

  const linePointsDelta = computeLinePoints(newLineIds, oddOrEven) - computeLinePoints(oldLineIds, oddOrEven)
  const starsDelta =
    numberCardData[newCard].stars - (oldCardAtPos !== undefined ? numberCardData[oldCardAtPos].stars : 0)

  return linePointsDelta + starsDelta
}

function computeLinePoints(cardIds: NumberCard[], oddOrEven: boolean): number {
  if (cardIds.length === 0) return 0
  const data = cardIds.map((id) => numberCardData[id])
  const numbers = data.map((d) => d.number)
  if (!numbers.every((n, i) => i === 0 || n > numbers[i - 1])) return 0
  let pointsPerCard = 1
  if (data.every((d) => d.color === data[0].color)) pointsPerCard++
  if (oddOrEven && (numbers.every((n) => n % 2 === 0) || numbers.every((n) => n % 2 !== 0))) {
    pointsPerCard++
  }
  return cardIds.length * pointsPerCard
}

function scorePlacement(rules: IpsoRules, player: number, move: MaterialMove): number {
  if (!isMoveItemType(MaterialType.NumberCard)(move)) return 0
  if (move.location.type !== LocationType.Pyramid) return 0
  const x = move.location.x
  const y = move.location.y
  if (x === undefined || y === undefined) return 0

  const cardItem = rules.material(MaterialType.NumberCard).getItem(move.itemIndex)
  if (cardItem?.id === undefined) return 0
  const data = numberCardData[cardItem.id as NumberCard]
  if (!data) return 0

  let score = 0
  const lineLength = y + 1

  // 1. Position fit: small numbers left, large numbers right (lines must be ascending).
  const expectedFraction = (x + 0.5) / lineLength
  const actualFraction = data.number / 90
  score -= Math.abs(expectedFraction - actualFraction) * 15

  // 2. Stars on the card are worth points directly.
  score += data.stars * 3

  // 3. Consistency with face-up neighbors on the same line.
  const lineCards = rules
    .material(MaterialType.NumberCard)
    .location(LocationType.Pyramid)
    .player(player)
    .location((l) => l.y === y && l.rotation === false && l.x !== x)
    .getItems()
    .filter((item) => item.id !== undefined)

  const wouldBreakAscending = lineCards.some((c) => {
    const other = numberCardData[c.id as NumberCard]
    if (c.location.x! < x && other.number >= data.number) return true
    return c.location.x! > x && other.number <= data.number;

  })

  if (wouldBreakAscending) {
    // A non-ascending line is destroyed at end of game: 0 line points AND its stars are lost.
    // Hard veto so value always beats color — only chosen when every other placement also breaks.
    score -= 1000
  }

  if (lineCards.length > 0) {
    const allSameColor = lineCards.every((c) => numberCardData[c.id as NumberCard].color === data.color)
    if (allSameColor) {
      // Preserving the same-color potential is worth ~lineLength extra points at game end.
      score += lineLength
    } else {
      // Breaking a same-color line permanently loses that bonus. Strong penalty so the AI
      // prefers starting a new (empty) line when colors don't match.
      score -= lineLength * 2
    }
  }

  // 4. Tiny jitter for tie-breaking so the AI isn't fully deterministic.
  score += Math.random() * 0.3

  return score
}

function selectBestMove(scored: { move: MaterialMove; score: number }[]): MaterialMove {
  if (scored.length === 1) return scored[0].move
  const max = Math.max(...scored.map((m) => m.score))
  const top = scored.filter((m) => m.score >= max - 0.5)
  return sample(top)!.move
}
