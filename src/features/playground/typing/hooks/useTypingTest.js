import { useCallback, useMemo, useRef, useState } from 'react'
import { calculateAccuracy, calculateWpm } from '../utils/typing'
import useTextSelection from './useTextSelection'
import useTypingKeyboard from './useTypingKeyboard'
import useTypingTimer from './useTypingTimer'

function createResult(id, correctCharacters, mistakes, elapsed) {
  return {
    id,
    wpm: calculateWpm(correctCharacters, elapsed),
    accuracy: calculateAccuracy(correctCharacters, mistakes),
    correctCharacters,
    mistakes,
    elapsed,
  }
}

export default function useTypingTest(tests, durationSeconds) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const [characterStates, setCharacterStates] = useState([])
  const [started, setStarted] = useState(false)
  const [finished, setFinished] = useState(false)
  const [startTime, setStartTime] = useState(null)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [result, setResult] = useState(null)
  const resultSequence = useRef(0)

  const resetTest = useCallback(() => {
    setCurrentIndex(0)
    setMistakes(0)
    setCharacterStates([])
    setStarted(false)
    setFinished(false)
    setStartTime(null)
    setElapsedSeconds(0)
    setResult(null)
  }, [])

  const selection = useTextSelection(tests, resetTest)

  const completeTest = useCallback((correct, mistakeCount, elapsed) => {
    resultSequence.current += 1
    setElapsedSeconds(elapsed)
    setStarted(false)
    setFinished(true)
    setResult(createResult(resultSequence.current, correct, mistakeCount, elapsed))
  }, [])

  useTypingTimer({
    started,
    finished,
    startTime,
    durationSeconds,
    currentIndex,
    mistakes,
    setElapsedSeconds,
    completeTest,
  })

  useTypingKeyboard({
    text: selection.selectedTest.text,
    currentIndex,
    mistakes,
    started,
    finished,
    startTime,
    durationSeconds,
    setCurrentIndex,
    setMistakes,
    setCharacterStates,
    setStarted,
    setStartTime,
    resetTest,
    completeTest,
  })

  const stats = useMemo(() => {
    const totalCharacters = selection.selectedTest.text.length

    return {
      timeRemaining: Math.max(0, durationSeconds - Math.floor(elapsedSeconds)),
      wpm: calculateWpm(currentIndex, elapsedSeconds, started || finished),
      accuracy: calculateAccuracy(currentIndex, mistakes),
      progress: (currentIndex / totalCharacters) * 100,
      currentIndex,
      totalCharacters,
    }
  }, [currentIndex, durationSeconds, elapsedSeconds, finished, mistakes, selection.selectedTest.text.length, started])

  return {
    ...selection,
    currentIndex,
    characterStates,
    finished,
    result,
    stats,
    resetTest,
  }
}
