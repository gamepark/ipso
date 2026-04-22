/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/ipso/material/LocationType'
import { MaterialType } from '@gamepark/ipso/material/MaterialType'
import { NumberCard } from '@gamepark/ipso/material/NumberCard'
import { MaterialTutorial, TutorialStep } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { me, opponent, TutorialSetup } from './TutorialSetup'

const BaseComponents = {
  bold: <strong />,
  italic: <em />,
  br: <br />
}

export class Tutorial extends MaterialTutorial<number, MaterialType, LocationType> {
  version = 6

  players = [
    { id: me },
    {
      id: opponent,
      name: 'Alexandre',
      avatar: {
        topType: 'ShortHairTheCaesar',
        accessoriesType: 'Blank',
        hairColor: 'BrownDark',
        facialHairType: 'Blank',
        clotheType: 'GraphicShirt',
        clotheColor: 'Blue03',
        eyeType: 'Happy',
        eyebrowType: 'Default',
        mouthType: 'Smile',
        skinColor: 'Light'
      }
    }
  ]

  options = { players: 2 }
  setup = new TutorialSetup()

  steps: TutorialStep[] = [
    // ── Step 1 — Welcome + objective ──────────────────────
    {
      popup: {
        text: () => <Trans i18nKey="tuto.welcome" components={BaseComponents} />,
        position: { y: 10 }
      }
    },

    // ── Step 2 — Player's 1st move: NC1 at (y=4, x=0) ─────
    {
      popup: {
        text: () => <Trans i18nKey="tuto.place-first" components={BaseComponents} />,
        position: { x: 20, y: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.NumberCard)
            .location(LocationType.CardDisplay)
            .id(NumberCard.NumberCard1),
          this.material(game, MaterialType.NumberCard)
            .location((l) => l.type === LocationType.Pyramid && l.player === me && l.y === 4 && l.x === 0)
        ],
        margin: { bottom: 2, top: 2, left: 2, right: 2 }
      }),
      move: {
        filter: (move, game) =>
          isMoveItemType(MaterialType.NumberCard)(move) &&
          move.location.type === LocationType.Pyramid &&
          move.location.player === me &&
          move.location.y === 4 &&
          move.location.x === 0 &&
          this.material(game, MaterialType.NumberCard).getItem(move.itemIndex).id === NumberCard.NumberCard1
      }
    },

    // ── Step 3 — Teach ascending rule ─────────────────────
    {
      popup: {
        text: () => <Trans i18nKey="tuto.ascending" components={BaseComponents} />,
        position: { x: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.NumberCard)
            .location((l) => l.type === LocationType.Pyramid && l.player === me && l.y === 4)
        ],
        margin: { bottom: 2, top: 2, left: 2, right: 2 }
      })
    },

    // ── Step 4 — Opponent's 1st move (silent): NC4 to opp (y=4, x=0) ─
    {
      move: {
        player: opponent,
        filter: (move, game) =>
          isMoveItemType(MaterialType.NumberCard)(move) &&
          move.location.type === LocationType.Pyramid &&
          move.location.player === opponent &&
          move.location.y === 4 &&
          move.location.x === 0 &&
          this.material(game, MaterialType.NumberCard).getItem(move.itemIndex).id === NumberCard.NumberCard4
      }
    },

    // ── Step 5 — Player's 2nd move: NC21 at (y=4, x=1) ────
    {
      popup: {
        text: () => <Trans i18nKey="tuto.place-second" components={BaseComponents} />,
        position: { x: 20, y: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.NumberCard)
            .location(LocationType.CardDisplay)
            .id(NumberCard.NumberCard21),
          this.material(game, MaterialType.NumberCard)
            .location((l) => l.type === LocationType.Pyramid && l.player === me && l.y === 4 && l.x === 1)
        ],
        margin: { bottom: 2, top: 2, left: 2, right: 2 }
      }),
      move: {
        filter: (move, game) =>
          isMoveItemType(MaterialType.NumberCard)(move) &&
          move.location.type === LocationType.Pyramid &&
          move.location.player === me &&
          move.location.y === 4 &&
          move.location.x === 1 &&
          this.material(game, MaterialType.NumberCard).getItem(move.itemIndex).id === NumberCard.NumberCard21
      }
    },

    // ── Step 6 — Teach same-color bonus ───────────────────
    {
      popup: {
        text: () => <Trans i18nKey="tuto.same-color" components={BaseComponents} />,
        position: { x: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.NumberCard)
            .location((l) => l.type === LocationType.Pyramid && l.player === me && l.y === 4 && l.rotation === false)
        ],
        margin: { bottom: 2, top: 2, left: 2, right: 2 }
      })
    },

    // ── Step 7 — Opponent's 2nd move (silent): NC46 to opp (y=2, x=1), revealing NC26 ─
    {
      move: {
        player: opponent,
        filter: (move, game) =>
          isMoveItemType(MaterialType.NumberCard)(move) &&
          move.location.type === LocationType.Pyramid &&
          move.location.player === opponent &&
          move.location.y === 2 &&
          move.location.x === 1 &&
          this.material(game, MaterialType.NumberCard).getItem(move.itemIndex).id === NumberCard.NumberCard46
      }
    },

    // ── Step 8 — Teach stars (NC26 is now in the display) ─
    {
      popup: {
        text: () => <Trans i18nKey="tuto.stars" components={BaseComponents} />,
        position: { y: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.NumberCard).location(LocationType.CardDisplay)
        ],
        margin: { bottom: 2, top: 2, left: 2, right: 2 }
      })
    },

    // ── Step 9 — Player's 3rd move: NC26 at (y=4, x=2) ────
    {
      popup: {
        text: () => <Trans i18nKey="tuto.place-third" components={BaseComponents} />,
        position: { x: 20, y: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.NumberCard)
            .location(LocationType.CardDisplay)
            .id(NumberCard.NumberCard26),
          this.material(game, MaterialType.NumberCard)
            .location((l) => l.type === LocationType.Pyramid && l.player === me && l.y === 4 && l.x === 2)
        ],
        margin: { bottom: 2, top: 2, left: 2, right: 2 }
      }),
      move: {
        filter: (move, game) =>
          isMoveItemType(MaterialType.NumberCard)(move) &&
          move.location.type === LocationType.Pyramid &&
          move.location.player === me &&
          move.location.y === 4 &&
          move.location.x === 2 &&
          this.material(game, MaterialType.NumberCard).getItem(move.itemIndex).id === NumberCard.NumberCard26
      }
    },

    // ── Step 10 — Teach the Star Card ─────────────────────
    {
      popup: {
        text: () => <Trans i18nKey="tuto.star-card" components={BaseComponents} />,
        position: { x: -20, y: 10 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.NumberCard).location(LocationType.Pyramid).player(me).id(NumberCard.TopStar),
          this.material(game, MaterialType.NumberCard).location(LocationType.DrawPile)
        ],
        margin: { bottom: 2, top: 2, left: 2, right: 2 }
      })
    },

    // ── Step 11 — End-of-game rule ────────────────────────
    {
      popup: {
        text: () => <Trans i18nKey="tuto.end-game" components={BaseComponents} />
      }
    }
  ]
}
