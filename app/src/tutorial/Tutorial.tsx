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
            defaults="Bienvenue dans <bold>Ipso</bold> ! Votre objectif : remplir votre pyramide de cartes numérotées et marquer le plus de points possible. Choisissez une carte dans l'étalage et cliquez sur une case cachée de votre pyramide pour la placer."
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
            defaults="La carte 3 est en place en début de ligne ! Votre objectif : former des <bold>lignes croissantes</bold> de gauche à droite. La ligne du bas a 5 cartes — si elles vont de la plus petite à la plus grande, elles rapportent <bold>1 point par carte</bold>. Toutes de la <bold>même couleur</bold> ? Les points sont <bold>doublés</bold> !"
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
            defaults="À votre tour ! Placez maintenant la carte <bold>7</bold> au début de la deuxième ligne de votre pyramide."
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
            defaults="Certaines cartes portent des <bold>étoiles</bold> — chaque étoile visible sur vos cartes en fin de partie rapporte <bold>1 point supplémentaire</bold> !"
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
            defaults="Continuez à remplir votre pyramide tour après tour ! Une fois toutes vos <bold>14 cartes</bold> révélées, vous pouvez utiliser votre <bold>carte étoile</bold> pour piocher la première carte de la pioche et remplacer une carte. Ou gardez-la pour <bold>3 points bonus</bold> en fin de partie."
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
            defaults="En fin de partie, les lignes dont les numéros ne sont pas en ordre croissant sont <bold>supprimées</bold> et ne rapportent rien. Les autres marquent 1 ou 2 points par carte selon la couleur. Bonne chance !"
            i18nKey="tuto.step.6"
            components={BaseComponents}
          />
        )
      }
    }
  ]
}
