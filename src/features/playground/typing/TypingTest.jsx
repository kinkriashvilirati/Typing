import { useEffect, useRef } from 'react'
import ProfilePanel from './components/profile/ProfilePanel'
import ResultsPanel from './components/results/ResultsPanel'
import Scoreboard from './components/scoreboard/Scoreboard'
import StatsPanel from './components/stats/StatsPanel'
import TypingPanel from './components/test/TypingPanel'
import TypingHeader from './components/TypingHeader'
import { TEST_DURATION_SECONDS } from './config'
import { typingTests } from './data/typingTests'
import usePlayer from './hooks/usePlayer'
import useTypingTest from './hooks/useTypingTest'

export default function TypingTest() {
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
    <section aria-label="Typeflow typing test">
      <TypingHeader onRestart={typing.resetTest} />
      <div className="space-y-6">
        <ProfilePanel name={name} onSaveName={saveName} />
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
        <Scoreboard name={name} scores={scores} onClear={clearScores} />
      </div>
    </section>
  )
}
