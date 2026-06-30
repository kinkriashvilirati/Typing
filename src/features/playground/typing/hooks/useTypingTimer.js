import { useEffect } from 'react'

export default function useTypingTimer({ started, finished, startTime, durationSeconds, currentIndex, mistakes, setElapsedSeconds, completeTest }) {
  useEffect(() => {
    if (!started || finished || !startTime) return undefined

    const tick = () => {
      const elapsed = Math.min((Date.now() - startTime) / 1000, durationSeconds)
      setElapsedSeconds(elapsed)

      if (elapsed >= durationSeconds) {
        completeTest(currentIndex, mistakes, elapsed)
      }
    }

    const timerId = window.setInterval(tick, 250)
    return () => window.clearInterval(timerId)
  }, [completeTest, currentIndex, durationSeconds, finished, mistakes, setElapsedSeconds, started, startTime])
}
