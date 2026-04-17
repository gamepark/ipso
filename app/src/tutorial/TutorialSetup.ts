import { IpsoSetup } from '@gamepark/ipso/IpsoSetup'
import { LocationType } from '@gamepark/ipso/material/LocationType'
import { MaterialType } from '@gamepark/ipso/material/MaterialType'
import { NumberCard, numberCards } from '@gamepark/ipso/material/NumberCard'

export const me = 1
export const opponent = 2

// Cards placed manually in the tutorial — excluded from draw pile
const placedCards = new Set<NumberCard>([
  // Me's pyramid (all face-down)
  NumberCard.NumberCard1, NumberCard.NumberCard2,
  NumberCard.NumberCard30, // x=2 — will swap with NC3 from display
  NumberCard.NumberCard4, NumberCard.NumberCard5,
  NumberCard.NumberCard6,
  NumberCard.NumberCard40, // x=6 — will swap with NC7 from display
  NumberCard.NumberCard8, NumberCard.NumberCard9,
  NumberCard.NumberCard11, NumberCard.NumberCard12, NumberCard.NumberCard13,
  NumberCard.NumberCard16, NumberCard.NumberCard17,
  // Display
  NumberCard.NumberCard3, NumberCard.NumberCard7,
  // Opponent's pyramid (all face-down)
  NumberCard.NumberCard21, NumberCard.NumberCard22, NumberCard.NumberCard23,
  NumberCard.NumberCard24, NumberCard.NumberCard25,
  NumberCard.NumberCard31, NumberCard.NumberCard32, NumberCard.NumberCard33, NumberCard.NumberCard34,
  NumberCard.NumberCard41, NumberCard.NumberCard42, NumberCard.NumberCard43,
  NumberCard.NumberCard51, NumberCard.NumberCard52,
  // Draw pile top
  NumberCard.NumberCard50
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
      id: NumberCard.NumberCard3,
      location: { type: LocationType.CardDisplay, rotation: false, x: 0 }
    })
    this.material(MaterialType.NumberCard).createItem({
      id: NumberCard.NumberCard7,
      location: { type: LocationType.CardDisplay, rotation: false, x: 1 }
    })
  }

  setupMePyramid() {
    // Line 1 (x=0–4): all hidden — NC3 from display will swap with NC1 at x=0
    this.createNumberCard(me, 0, true, NumberCard.NumberCard1)
    this.createNumberCard(me, 1, true, NumberCard.NumberCard2)
    this.createNumberCard(me, 2, true, NumberCard.NumberCard30)
    this.createNumberCard(me, 3, true, NumberCard.NumberCard4)
    this.createNumberCard(me, 4, true, NumberCard.NumberCard5)
    // Line 2 (x=5–8): all hidden — NC7 from display will swap with NC6 at x=5
    this.createNumberCard(me, 5, true, NumberCard.NumberCard6) // hidden — will swap with NC7
    this.createNumberCard(me, 6, true, NumberCard.NumberCard40)
    this.createNumberCard(me, 7, true, NumberCard.NumberCard8)
    this.createNumberCard(me, 8, true, NumberCard.NumberCard9)
    // Line 3 (x=9–11): all hidden
    this.createNumberCard(me, 9, true, NumberCard.NumberCard11)
    this.createNumberCard(me, 10, true, NumberCard.NumberCard12)
    this.createNumberCard(me, 11, true, NumberCard.NumberCard13)
    // Line 4 (x=12–13): all hidden
    this.createNumberCard(me, 12, true, NumberCard.NumberCard16)
    this.createNumberCard(me, 13, true, NumberCard.NumberCard17)
    // Star card
    this.material(MaterialType.StarCard).createItem({ id: me, location: { type: LocationType.Pyramid, player: me, x: 14 } })
  }

  setupOpponentPyramid() {
    // Line 1: all hidden
    this.createNumberCard(opponent, 0, true, NumberCard.NumberCard21)
    this.createNumberCard(opponent, 1, true, NumberCard.NumberCard22)
    this.createNumberCard(opponent, 2, true, NumberCard.NumberCard23)
    this.createNumberCard(opponent, 3, true, NumberCard.NumberCard24)
    this.createNumberCard(opponent, 4, true, NumberCard.NumberCard25)
    // Line 2: all hidden
    this.createNumberCard(opponent, 5, true, NumberCard.NumberCard31)
    this.createNumberCard(opponent, 6, true, NumberCard.NumberCard32)
    this.createNumberCard(opponent, 7, true, NumberCard.NumberCard33)
    this.createNumberCard(opponent, 8, true, NumberCard.NumberCard34)
    // Line 3: all hidden
    this.createNumberCard(opponent, 9, true, NumberCard.NumberCard41)
    this.createNumberCard(opponent, 10, true, NumberCard.NumberCard42)
    this.createNumberCard(opponent, 11, true, NumberCard.NumberCard43)
    // Line 4: all hidden
    this.createNumberCard(opponent, 12, true, NumberCard.NumberCard51)
    this.createNumberCard(opponent, 13, true, NumberCard.NumberCard52)
    // Star card
    this.material(MaterialType.StarCard).createItem({ id: opponent, location: { type: LocationType.Pyramid, player: opponent, x: 14 } })
  }

  setupDrawPileTutorial() {
    const drawPile = numberCards.filter(c => !placedCards.has(c))
    drawPile.forEach((id, index) => {
      this.material(MaterialType.NumberCard).createItem({
        id,
        location: { type: LocationType.DrawPile, rotation: true, x: index }
      })
    })
    // NC50 on top (highest x = drawn first by UseStarCard)
    this.material(MaterialType.NumberCard).createItem({
      id: NumberCard.NumberCard50,
      location: { type: LocationType.DrawPile, rotation: true, x: drawPile.length }
    })
  }

  private createNumberCard(player: number, x: number, rotation: boolean, id: NumberCard) {
    this.material(MaterialType.NumberCard).createItem({
      id,
      location: { type: LocationType.Pyramid, player, x, rotation }
    })
  }
}
