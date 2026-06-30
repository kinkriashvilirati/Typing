import { useCallback, useState } from 'react'
import { getRandomIndex, wrapIndex } from '../utils/typing'

export default function useTextSelection(tests, resetTest) {
  const [selectedTextIndex, setSelectedTextIndex] = useState(() => getRandomIndex(tests.length))

  const selectText = useCallback((index) => {
    setSelectedTextIndex(wrapIndex(index, tests.length))
    resetTest()
  }, [resetTest, tests.length])

  const selectRandomText = useCallback(() => {
    setSelectedTextIndex((current) => getRandomIndex(tests.length, current))
    resetTest()
  }, [resetTest, tests.length])

  const selectPreviousText = useCallback(() => {
    selectText(selectedTextIndex - 1)
  }, [selectText, selectedTextIndex])

  const selectNextText = useCallback(() => {
    selectText(selectedTextIndex + 1)
  }, [selectText, selectedTextIndex])

  return {
    selectedTextIndex,
    selectedTest: tests[selectedTextIndex],
    selectText,
    selectRandomText,
    selectPreviousText,
    selectNextText,
  }
}
