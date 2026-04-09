import { IpsoOptionsSpec } from '@gamepark/ipso/IpsoOptions'
import { IpsoRules } from '@gamepark/ipso/IpsoRules'
import { IpsoSetup } from '@gamepark/ipso/IpsoSetup'
import { GameProvider } from '@gamepark/react-game'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { gameAnimations } from './animations/GameAnimations'
import { App } from './App'
import { IpsoLogDescription } from './logs/IpsoLogDescription'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import { IpsoScoring } from './scoring/IpsoScoring.tsx'
import { Tutorial } from './tutorial/Tutorial'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider
      game="ipso"
      Rules={IpsoRules}
      optionsSpec={IpsoOptionsSpec}
      GameSetup={IpsoSetup}
      material={Material}
      locators={Locators}
      animations={gameAnimations}
      scoring={new IpsoScoring()}
      logs={new IpsoLogDescription()}
      tutorial={new Tutorial()}
    >
      <App />
    </GameProvider>
  </StrictMode>
)
