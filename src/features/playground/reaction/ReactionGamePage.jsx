import { useState } from 'react'
import PageContainer from '@/shared/layout/PageContainer'
import { ROUTES } from '@/shared/navigation/routes'
import RoundHistory from './components/RoundHistory'
import TimerBattleIntro from './components/TimerBattleIntro'
import TimerStage from './components/TimerStage'
import useReactionTimer from './hooks/useReactionTimer'

export default function ReactionGamePage() {
  const [name, setName] = useState('')
  const game = useReactionTimer()

  return (
    <PageContainer>
      <a href={`#${ROUTES.playground}`} className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-muted-strong transition-colors hover:text-ink">
        <span aria-hidden="true">←</span> All playground games
      </a>

      <div className="grid grid-cols-[1.15fr_0.85fr] gap-16 max-lg:grid-cols-1 max-lg:gap-12">
        <TimerBattleIntro
          name={name}
          onNameChange={setName}
          phase={game.phase}
          bestResult={game.bestResult}
          rounds={game.history.length}
          onAction={game.handleAction}
        />
        <TimerStage
          phase={game.phase}
          targetTime={game.targetTime}
          elapsedTime={game.elapsedTime}
          result={game.latestResult}
          onAction={game.handleAction}
        />
      </div>

      <RoundHistory history={game.history} />
    </PageContainer>
  )
}
