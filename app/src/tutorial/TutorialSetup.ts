import { IpsoSetup } from '@gamepark/ipso/IpsoSetup'
import { LocationType } from '@gamepark/ipso/material/LocationType'
import { MaterialType } from '@gamepark/ipso/material/MaterialType'
import { NumberCard, numberCardData, numberCards } from '@gamepark/ipso/material/NumberCard'
import { Location } from '@gamepark/rules-api'
import { shuffle } from 'es-toolkit'

export const me = 1
export const opponent = 2

// Pyramid slots that stay face-down throughout the scripted steps — their IDs don't matter,
// so they're filled with random cards from the remaining deck.
const MY_RANDOM_SLOTS: Array<{ x: number; y: number }> = [
  { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 },
  { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 },
  { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 },
  { x: 0, y: 1 }, { x: 1, y: 1 }
]

const OPPONENT_RANDOM_SLOTS: Array<{ x: number; y: number }> = [
  { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 },
  { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 },
  { x: 0, y: 2 }, { x: 2, y: 2 },
  { x: 0, y: 1 }, { x: 1, y: 1 }
]

export class TutorialSetup extends IpsoSetup {
  setupMaterial() {
    const used = new Set<NumberCard>()

    const createNumber = (id: NumberCard, location: Location) => {
      this.material(MaterialType.NumberCard).createItem({ id, location })
      used.add(id)
    }

    // --- Fixed cards required by the scripted steps -------------------------
    // Initial display cards (both 0-star, before the stars popup).
    createNumber(NumberCard.NumberCard1, { type: LocationType.CardDisplay, rotation: false, x: 0 })
    createNumber(NumberCard.NumberCard4, { type: LocationType.CardDisplay, rotation: false, x: 1 })
    // My pyramid: revealed at step 2 (NC21) and step 5 (NC46) — both 0-star.
    createNumber(NumberCard.NumberCard21, { type: LocationType.Pyramid, player: me, x: 0, y: 4, rotation: true })
    createNumber(NumberCard.NumberCard46, { type: LocationType.Pyramid, player: me, x: 1, y: 4, rotation: true })
    // Opponent's pyramid: revealed at step 7 (NC26, the star card introduced at step 8).
    createNumber(NumberCard.NumberCard26, { type: LocationType.Pyramid, player: opponent, x: 1, y: 2, rotation: true })

    // --- opp (y=4, x=0): revealed at step 4, before stars are explained -----
    // Must be a 0-star card so no star card leaks into the display before step 8.
    const noStarPool = numberCards.filter((c) => numberCardData[c].stars === 0 && !used.has(c))
    const noStarCard = shuffle(noStarPool)[0]
    createNumber(noStarCard, { type: LocationType.Pyramid, player: opponent, x: 0, y: 4, rotation: true })

    // --- Remaining slots + draw pile: fully random --------------------------
    const remaining = shuffle(numberCards.filter((c) => !used.has(c)))
    let cursor = 0

    for (const { x, y } of MY_RANDOM_SLOTS) {
      this.material(MaterialType.NumberCard).createItem({
        id: remaining[cursor++],
        location: { type: LocationType.Pyramid, player: me, x, y, rotation: true }
      })
    }
    for (const { x, y } of OPPONENT_RANDOM_SLOTS) {
      this.material(MaterialType.NumberCard).createItem({
        id: remaining[cursor++],
        location: { type: LocationType.Pyramid, player: opponent, x, y, rotation: true }
      })
    }

    // Everything else goes into the draw pile (face-down, in shuffled order).
    for (let i = cursor; i < remaining.length; i++) {
      this.material(MaterialType.NumberCard).createItem({
        id: remaining[i],
        location: { type: LocationType.DrawPile, x: i - cursor }
      })
    }

    // --- Star cards ---------------------------------------------------------
    this.material(MaterialType.NumberCard).createItem({
      id: NumberCard.TopStar,
      location: { type: LocationType.Pyramid, player: me, x: 0, y: 0 }
    })
    this.material(MaterialType.NumberCard).createItem({
      id: NumberCard.TopStar,
      location: { type: LocationType.Pyramid, player: opponent, x: 0, y: 0 }
    })

    // Keep only one draw pile card per player, like the normal setup does.
    this.trimDrawPile()
  }
}
