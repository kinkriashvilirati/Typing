import { useEffect } from 'react'

const ignoredKeys = new Set([
  'Shift', 'CapsLock', 'Tab', 'Alt', 'Control', 'Meta',
  'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
])

function isFormField(target) {
  return target instanceof HTMLElement
    && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
}

export function useTypingKeyboard(options) {
  const {
    text, currentIndex, mistakes, started, finished, startTime, durationSeconds,
    setCurrentIndex, setMistakes, setCharacterStates, setStarted, setStartTime,
    resetTest, completeTest,
  } = options

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isFormField(event.target)) return

      if ([' ', 'Backspace', 'Tab'].includes(event.key)) event.preventDefault()

      if (event.key === 'Escape') {
        resetTest()
        return
      }
      if (finished) return

      if (event.key === 'Backspace') {
        if (currentIndex === 0) return

        setCharacterStates((states) => {
          const nextStates = [...states]
          nextStates[currentIndex] = undefined
          nextStates[currentIndex - 1] = undefined
          return nextStates
        })
        setCurrentIndex((index) => index - 1)
        return
      }

      const isIgnored = event.ctrlKey
        || event.altKey
        || event.metaKey
        || ignoredKeys.has(event.key)
        || /^F\d{1,2}$/.test(event.key)
        || event.key.length !== 1
      if (isIgnored) return

      let effectiveStartTime = startTime
      if (!started) {
        effectiveStartTime = Date.now()
        setStartTime(effectiveStartTime)
        setStarted(true)
      }

      if (event.key !== text[currentIndex]) {
        setMistakes((count) => count + 1)
        setCharacterStates((states) => {
          const nextStates = [...states]
          nextStates[currentIndex] = 'wrong'
          return nextStates
        })
        return
      }

      const nextIndex = currentIndex + 1
      setCurrentIndex(nextIndex)
      setCharacterStates((states) => {
        const nextStates = [...states]
        nextStates[currentIndex] = 'correct'
        return nextStates
      })

      if (nextIndex === text.length) {
        const elapsed = Math.min((Date.now() - effectiveStartTime) / 1000, durationSeconds)
        completeTest(nextIndex, mistakes, elapsed)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [completeTest, currentIndex, durationSeconds, finished, mistakes, resetTest, setCharacterStates, setCurrentIndex, setMistakes, setStarted, setStartTime, started, startTime, text])
}
