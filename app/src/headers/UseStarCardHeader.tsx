/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { IpsoRules } from '@gamepark/ipso/IpsoRules.ts'
import { LocationType } from '@gamepark/ipso/material/LocationType.ts'
import { MaterialType } from '@gamepark/ipso/material/MaterialType.ts'
import { isTopStar, NumberCard } from '@gamepark/ipso/material/NumberCard.ts'
import { CustomMoveType } from '@gamepark/ipso/rules/CustomMoveType.ts'
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType, isMoveItemType } from '@gamepark/rules-api'
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { LastTurnPopup } from '../material/help/LastTurnPopup'

export const UseStarCardHeader = () => {
  const { t } = useTranslation()
  const player = usePlayerId()
  const rules = useRules<IpsoRules>()!
  const activePlayer = rules.game.rule?.player
  const itsMe = player && activePlayer === player
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.Pass))
  const use = useLegalMove(move => {
    if (!isMoveItemType(MaterialType.NumberCard)(move) || move.location.type !== LocationType.DiscardPile) return false
    const item = rules.material(MaterialType.NumberCard).getItem<NumberCard>(move.itemIndex)
    return isTopStar(item?.id)
  })
  const discard = useLegalMove(move => {
    if (!isMoveItemType(MaterialType.NumberCard)(move) || move.location.type !== LocationType.DiscardPile) return false
    const item = rules.material(MaterialType.NumberCard).getItem<NumberCard>(move.itemIndex)
    return !isTopStar(item?.id)
  })
  const name = usePlayerName(activePlayer)

  const [showPopup, setShowPopup] = useState(false)
  const hasAutoShown = useRef(false)
  useEffect(() => {
    if (itsMe && !hasAutoShown.current) {
      hasAutoShown.current = true
      setShowPopup(true)
    }
  }, [itsMe])

  const message = (() => {
    if (itsMe) {
      if (!use && !pass) {
        return <Trans
          i18nKey="header.use-star-card.you.place-or-discard"
          components={{ discard: <PlayMoveButton move={discard} /> }}
        />
      }
      return <Trans
        i18nKey="header.use-star-card.you"
        components={{
          pass: <PlayMoveButton move={pass} />,
          use: <PlayMoveButton move={use} />
        }}
      />
    }
    return <Trans i18nKey="header.use-star-card.player" values={{ player: name }} />
  })()

  return <>
    {message}
    <button
      type="button"
      css={helpBtnCss}
      onClick={() => setShowPopup(true)}
      title={t('last-turn.title')}
      aria-label={t('last-turn.title')}
    >
      <FontAwesomeIcon icon={faCircleQuestion} />
    </button>
    <LastTurnPopup open={showPopup} onClose={() => setShowPopup(false)} />
  </>
}

const helpBtnCss = css`
  appearance: none;
  background: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  margin-left: 0.4em;
  font-size: 1em;
  opacity: 0.85;
  transition: opacity 150ms ease, transform 120ms ease;

  &:hover { opacity: 1; transform: scale(1.1); }
  &:focus { outline: none; }
`
