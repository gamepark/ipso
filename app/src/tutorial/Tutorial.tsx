/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/ipso/material/LocationType'
import { MaterialType } from '@gamepark/ipso/material/MaterialType'
import { NumberCard } from '@gamepark/ipso/material/NumberCard'
import { MaterialTutorial, TutorialStep } from '@gamepark/react-game'
import { isMoveItemType, MaterialMove } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { me, opponent, TutorialSetup } from './TutorialSetup'

const BaseComponents = {
  bold: <strong />,
  italic: <em />
}

export class Tutorial extends MaterialTutorial<number, MaterialType, LocationType> {
  version = 3

  players = [
    { id: me },
    {
      id: opponent,
      name: 'Mimi',
      avatar: {
        topType: 'LongHairBigHair',
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
    // ── Step 1 ─────────────────────────────────────────────
    // Welcome + premier coup : NC3 au début de la ligne du bas (x=0)
    {
      popup: {
        text: () => (
          <Trans
            i18nKey="tuto.step.1"
            components={BaseComponents}
          />
        )
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.NumberCard).location(LocationType.CardDisplay),
          this.material(game, MaterialType.NumberCard).location(LocationType.Pyramid).player(me)
        ],
        margin: { bottom: 2, top: 2, left: 2, right: 2 }
      }),
      move: {
        filter: (move, game) =>
          isMoveItemType(MaterialType.NumberCard)(move) &&
          move.location.type === LocationType.Pyramid &&
          move.location.x === 0 &&
          move.location.player === me &&
          this.material(game, MaterialType.NumberCard).getItem(move.itemIndex).id === NumberCard.NumberCard3
      }
    },

    // ── Step 2 ─────────────────────────────────────────────
    // Expliquer les lignes croissantes + score
    {
      popup: {
        text: () => (
          <Trans
            i18nKey="tuto.step.2"
            components={BaseComponents}
          />
        ),
        position: { y: -25 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.NumberCard)
            .location(l => l.type === LocationType.Pyramid && l.player === me && l.x !== undefined && l.x <= 4)
        ],
        margin: { bottom: 2, top: 2, left: 2, right: 2 }
      })
    },

    // ── Step 3 ─────────────────────────────────────────────
    // Tour de l'adversaire (silencieux) — force à prendre NC1 pour garder NC7 en étalage
    {
      move: {
        player: opponent,
        filter: (move: MaterialMove, game) =>
          isMoveItemType(MaterialType.NumberCard)(move) &&
          move.location.type === LocationType.Pyramid &&
          move.location.player === opponent &&
          this.material(game, MaterialType.NumberCard).getItem(move.itemIndex).id === NumberCard.NumberCard1
      }
    },

    // ── Step 4 ─────────────────────────────────────────────
    // Deuxième coup : NC7 au début de la deuxième ligne (x=5)
    {
      popup: {
        text: () => (
          <Trans
            i18nKey="tuto.step.3"
            components={BaseComponents}
          />
        ),
        position: { y: -25 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.NumberCard).location(LocationType.CardDisplay),
          this.material(game, MaterialType.NumberCard).location(LocationType.Pyramid).player(me)
        ],
        margin: { bottom: 2, top: 2, left: 2, right: 2 }
      }),
      move: {
        filter: (move, game) =>
          isMoveItemType(MaterialType.NumberCard)(move) &&
          move.location.type === LocationType.Pyramid &&
          move.location.x === 5 &&
          move.location.player === me &&
          this.material(game, MaterialType.NumberCard).getItem(move.itemIndex).id === NumberCard.NumberCard7
      }
    },

    // ── Step 5 ─────────────────────────────────────────────
    // Expliquer les étoiles
    {
      popup: {
        text: () => (
          <Trans
            i18nKey="tuto.step.4"
            components={BaseComponents}
          />
        ),
        position: { y: -35 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.NumberCard)
            .location(l => l.type === LocationType.Pyramid && l.player === me && l.rotation === false)
        ],
        margin: { bottom: 2, top: 2, left: 2, right: 2 }
      })
    },

    // ── Step 6 ─────────────────────────────────────────────
    // Expliquer la carte étoile
    {
      popup: {
        text: () => (
          <Trans
            i18nKey="tuto.step.5"
            components={BaseComponents}
          />
        ),
        position: { y: -20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.StarCard).location(LocationType.Pyramid).player(me),
          this.material(game, MaterialType.NumberCard).location(LocationType.DrawPile)
        ],
        margin: { bottom: 2, top: 2, left: 2, right: 2 }
      })
    },

    // ── Step 7 ─────────────────────────────────────────────
    // Explication finale : scoring
    {
      popup: {
        text: () => (
          <Trans
            i18nKey="tuto.step.6"
            components={BaseComponents}
          />
        )
      }
    }
  ]
}
