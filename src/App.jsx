import { useEffect, useRef } from 'react'
import AppHeader from './components/layout/AppHeader'
import ProfilePanel from './components/profile/ProfilePanel'
import ResultsPanel from './components/results/ResultsPanel'
import Scoreboard from './components/scoreboard/Scoreboard'
import StatsPanel from './components/stats/StatsPanel'
import TypingPanel from './components/typing/TypingPanel'
import { TEST_DURATION_SECONDS } from './constants/config'
import { typingTests } from './data/typingTests'
import { usePlayer } from './hooks/usePlayer'
import { useTypingTest } from './hooks/useTypingTest'

function App() {
  const { name, scores, saveName, saveScore, clearScores } = usePlayer()
  const typing = useTypingTest(typingTests, TEST_DURATION_SECONDS)
  const savedResultId = useRef(null)

  useEffect(() => {
    if (!typing.result || savedResultId.current === typing.result.id) return

    savedResultId.current = typing.result.id
    saveScore({
      text: typing.selectedTest.title,
      wpm: typing.result.wpm,
      accuracy: typing.result.accuracy,
      elapsed: typing.result.elapsed,
      completedAt: new Date().toISOString(),
    })
  }, [saveScore, typing.result, typing.selectedTest.title])

  return (
    <main className="mx-auto w-[min(1024px,calc(100%-40px))] py-8 max-sm:w-[calc(100%-28px)] max-sm:py-5">
      <AppHeader onRestart={typing.resetTest} />
      <div className="space-y-6">
        <ProfilePanel
          name={name}
          onSaveName={saveName}
        />
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
        {typing.result && (
          <ResultsPanel result={typing.result} onRestart={typing.resetTest} />
        )}
        <Scoreboard
          name={name}
          scores={scores}
          onClear={clearScores}
        />
      </div>
    </main>
  )
}

export default App
