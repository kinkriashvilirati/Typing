import { useEffect, useRef } from 'react'
import ScoreAuthPanel from '@/features/auth/components/ScoreAuthPanel'
import useAuth from '@/features/auth/hooks/useAuth'
import PageContainer from '@/shared/layout/PageContainer'
import { ROUTES } from '@/shared/navigation/routes'
import RoundHistory from './components/RoundHistory'
import SavedReactionScores from './components/SavedReactionScores'
import TimerBattleIntro from './components/TimerBattleIntro'
import TimerStage from './components/TimerStage'
import useReactionTimer from './hooks/useReactionTimer'
import useReactionScores from './hooks/useReactionScores'

export default function ReactionGamePage() {
  const { user } = useAuth()
  const userId = user?.id
  const game = useReactionTimer()
  const { scores, isLoading, errorMessage, saveReactionScore, clearScores } = useReactionScores(userId)
  const savedResultId = useRef(null)

  useEffect(() => {
    if (!userId || !game.latestResult || savedResultId.current === game.latestResult.id) return

    savedResultId.current = game.latestResult.id
    saveReactionScore(game.latestResult)
  }, [game.latestResult, saveReactionScore, userId])

  return (
    <PageContainer>
      <a href={`#${ROUTES.playground}`} className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-muted-strong transition-colors hover:text-ink">
        <span aria-hidden="true">←</span> All playground games
      </a>

      <div className="mb-8">
        <ScoreAuthPanel />
      </div>

      <div className="grid grid-cols-[1.15fr_0.85fr] gap-16 max-lg:grid-cols-1 max-lg:gap-12">
        <TimerBattleIntro
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

      {user ? (
        <SavedReactionScores
          scores={scores}
          isLoading={isLoading}
          errorMessage={errorMessage}
          onClear={clearScores}
        />
      ) : (
        <RoundHistory history={game.history} />
      )}
    </PageContainer>
  )
}
