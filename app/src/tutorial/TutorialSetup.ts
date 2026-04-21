import { IpsoSetup } from '@gamepark/ipso/IpsoSetup'
import { LocationType } from '@gamepark/ipso/material/LocationType'
import { MaterialType } from '@gamepark/ipso/material/MaterialType'
import { NumberCard, numberCards } from '@gamepark/ipso/material/NumberCard'

export const me = 1
export const opponent = 2

// Only NC26 has a star — introduced at the step where stars are explained.
// The other placed cards are all 0-star so no star appears in the display
// (or in any revealed pyramid slot) before that step.
const placedCards = new Set<NumberCard>([
  // Display
  NumberCard.NumberCard1, NumberCard.NumberCard4,
  // Me — bottom line (y=4)
  NumberCard.NumberCard21, NumberCard.NumberCard46, NumberCard.NumberCard12,
  NumberCard.NumberCard2, NumberCard.NumberCard5,
  // Me — y=3
  NumberCard.NumberCard11, NumberCard.NumberCard22,
  NumberCard.NumberCard33, NumberCard.NumberCard44,
  // Me — y=2
  NumberCard.NumberCard13, NumberCard.NumberCard14, NumberCard.NumberCard15,
  // Me — y=1 (top)
  NumberCard.NumberCard23, NumberCard.NumberCard24,
  // Opponent — bottom line (y=4)
  NumberCard.NumberCard25, NumberCard.NumberCard34, NumberCard.NumberCard35,
  NumberCard.NumberCard45, NumberCard.NumberCard50,
  // Opponent — y=3
  NumberCard.NumberCard31, NumberCard.NumberCard32,
  NumberCard.NumberCard41, NumberCard.NumberCard42,
  // Opponent — y=2 (NC26 at x=1 is revealed when the AI plays)
  NumberCard.NumberCard43, NumberCard.NumberCard26, NumberCard.NumberCard48,
  // Opponent — y=1 (top)
  NumberCard.NumberCard49, NumberCard.NumberCard47
])

export class TutorialSetup extends IpsoSetup {
  setupMaterial() {
    this.setupDisplayTutorial()
    this.setupMePyramid()
    this.setupOpponentPyramid()
    this.setupDrawPileTutorial()
  }

  setupDisplayTutorial() {
    this.material(MaterialType.NumberCard).createItem({
      id: NumberCard.NumberCard1,
      location: { type: LocationType.CardDisplay, rotation: false, x: 0 }
    })
    this.material(MaterialType.NumberCard).createItem({
      id: NumberCard.NumberCard4,
      location: { type: LocationType.CardDisplay, rotation: false, x: 1 }
    })
  }

  setupMePyramid() {
    // y=4 (5 cards)
    // x=0 = NC21 → revealed when player places NC1 here (step 2)
    // x=1 = NC46 → revealed when player places NC21 here (step 4)
    // x=2 = NC12 → revealed when player places NC26 here (step 7)
    this.createNumberCard(me, 0, 4, NumberCard.NumberCard21)
    this.createNumberCard(me, 1, 4, NumberCard.NumberCard46)
    this.createNumberCard(me, 2, 4, NumberCard.NumberCard12)
    this.createNumberCard(me, 3, 4, NumberCard.NumberCard2)
    this.createNumberCard(me, 4, 4, NumberCard.NumberCard5)
    // y=3 (4 cards)
    this.createNumberCard(me, 0, 3, NumberCard.NumberCard11)
    this.createNumberCard(me, 1, 3, NumberCard.NumberCard22)
    this.createNumberCard(me, 2, 3, NumberCard.NumberCard33)
    this.createNumberCard(me, 3, 3, NumberCard.NumberCard44)
    // y=2 (3 cards)
    this.createNumberCard(me, 0, 2, NumberCard.NumberCard13)
    this.createNumberCard(me, 1, 2, NumberCard.NumberCard14)
    this.createNumberCard(me, 2, 2, NumberCard.NumberCard15)
    // y=1 (2 cards)
    this.createNumberCard(me, 0, 1, NumberCard.NumberCard23)
    this.createNumberCard(me, 1, 1, NumberCard.NumberCard24)
    // Star card at the top
    this.material(MaterialType.StarCard).createItem({
      id: me,
      location: { type: LocationType.Pyramid, player: me, x: 0, y: 0 }
    })
  }

  setupOpponentPyramid() {
    // y=4 (5 cards)
    this.createNumberCard(opponent, 0, 4, NumberCard.NumberCard25)
    this.createNumberCard(opponent, 1, 4, NumberCard.NumberCard34)
    this.createNumberCard(opponent, 2, 4, NumberCard.NumberCard35)
    this.createNumberCard(opponent, 3, 4, NumberCard.NumberCard45)
    this.createNumberCard(opponent, 4, 4, NumberCard.NumberCard50)
    // y=3 (4 cards)
    this.createNumberCard(opponent, 0, 3, NumberCard.NumberCard31)
    this.createNumberCard(opponent, 1, 3, NumberCard.NumberCard32)
    this.createNumberCard(opponent, 2, 3, NumberCard.NumberCard41)
    this.createNumberCard(opponent, 3, 3, NumberCard.NumberCard42)
    // y=2 (3 cards) — NC26 at x=1 is the star card revealed by the AI move
    this.createNumberCard(opponent, 0, 2, NumberCard.NumberCard43)
    this.createNumberCard(opponent, 1, 2, NumberCard.NumberCard26)
    this.createNumberCard(opponent, 2, 2, NumberCard.NumberCard48)
    // y=1 (2 cards)
    this.createNumberCard(opponent, 0, 1, NumberCard.NumberCard49)
    this.createNumberCard(opponent, 1, 1, NumberCard.NumberCard47)
    // Star card at the top
    this.material(MaterialType.StarCard).createItem({
      id: opponent,
      location: { type: LocationType.Pyramid, player: opponent, x: 0, y: 0 }
    })
  }

  setupDrawPileTutorial() {
    const drawPile = numberCards.filter((c) => !placedCards.has(c))
    drawPile.forEach((id, index) => {
      this.material(MaterialType.NumberCard).createItem({
        id,
        location: { type: LocationType.DrawPile, rotation: true, x: index }
      })
    })
  }

  private createNumberCard(player: number, x: number, y: number, id: NumberCard) {
    this.material(MaterialType.NumberCard).createItem({
      id,
      location: { type: LocationType.Pyramid, player, x, y, rotation: true }
    })
  }
}
