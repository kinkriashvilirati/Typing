import { useEffect, useRef } from 'react'
import ScoreAuthPanel from '@/features/auth/components/ScoreAuthPanel'
import useAuth from '@/features/auth/hooks/useAuth'
import ResultsPanel from './components/results/ResultsPanel'
import Scoreboard from './components/scoreboard/Scoreboard'
import StatsPanel from './components/stats/StatsPanel'
import TypingPanel from './components/test/TypingPanel'
import TypingHeader from './components/TypingHeader'
import { TEST_DURATION_SECONDS } from './config'
import { typingTests } from './data/typingTests'
import useTypingScores from './hooks/useTypingScores'
import useTypingTest from './hooks/useTypingTest'

export default function TypingTest() {
  const { user } = useAuth()
  const userId = user?.id
  const { scores, isLoading, errorMessage, saveTypingScore, clearScores } = useTypingScores(userId)
  const typing = useTypingTest(typingTests, TEST_DURATION_SECONDS)
  const savedResultId = useRef(null)

  useEffect(() => {
    if (!userId || !typing.result || savedResultId.current === typing.result.id) return

    savedResultId.current = typing.result.id
    saveTypingScore(typing.result, typing.selectedTest.title)
  }, [saveTypingScore, typing.result, typing.selectedTest.title, userId])

  return (
    <section aria-label="Typeflow typing test">
      <TypingHeader onRestart={typing.resetTest} />
      <div className="space-y-6">
        <ScoreAuthPanel />
        <StatsPanel stats={typing.stats} />
        <TypingPanel
          tests={typingTests}
          selectedIndex={typing.selectedTextIndex}
          selectedTest={typing.selectedTest}
          characterStates={typing.characterStates}
          currentIndex={typing.currentIndex}
          finished={typing.finished}
          onSelect={typing.selectText}
          onPrevious={typing.selectPreviousText}
          onRandom={typing.selectRandomText}
          onNext={typing.selectNextText}
        />
        {typing.result && <ResultsPanel result={typing.result} onRestart={typing.resetTest} />}
        {user && (
          <Scoreboard
            scores={scores}
            isLoading={isLoading}
            errorMessage={errorMessage}
            onClear={clearScores}
          />
        )}
      </div>
    </section>
  )
}
