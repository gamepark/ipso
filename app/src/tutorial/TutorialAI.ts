import { IpsoRules } from '@gamepark/ipso/IpsoRules'
import { LocationType } from '@gamepark/ipso/material/LocationType'
import { MaterialType } from '@gamepark/ipso/material/MaterialType'
import { NumberCard, numberCardData } from '@gamepark/ipso/material/NumberCard'
import { CustomMoveType } from '@gamepark/ipso/rules/CustomMoveType'
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
    const discardStar = moves.find((m) => isMoveItemType(MaterialType.StarCard)(m))
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

  const scored = pyramidPlacements.map((move) => ({ move, score: scorePlacement(rules, player, move) }))
  const best = scored.reduce((a, b) => (a.score >= b.score ? a : b))

  // Only place if it beats discarding (threshold tuned so marginally-bad placements are discarded).
  if (best.score > 0) return best.move
  return discardMoves[0] ?? best.move
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

  let conflicts = 0
  for (const c of lineCards) {
    const other = numberCardData[c.id as NumberCard]
    if (c.location.x! < x && other.number >= data.number) conflicts++
    if (c.location.x! > x && other.number <= data.number) conflicts++
  }
  score -= conflicts * 6

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
