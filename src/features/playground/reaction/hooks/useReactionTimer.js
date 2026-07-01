import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createReactionResult, createTargetTime } from '../utils/reactionGame'

const MAX_HISTORY_ITEMS = 6

export default function useReactionTimer() {
  const [phase, setPhase] = useState('ready')
  const [targetTime, setTargetTime] = useState(createTargetTime)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [latestResult, setLatestResult] = useState(null)
  const [history, setHistory] = useState([])
  const startedAt = useRef(null)
  const animationFrame = useRef(null)

  const startRound = useCallback(() => {
    startedAt.current = performance.now()
    setElapsedTime(0)
    setLatestResult(null)
    setPhase('running')
  }, [])

  const stopRound = useCallback(() => {
    if (!startedAt.current) return

    const elapsed = (performance.now() - startedAt.current) / 1000
    const result = createReactionResult(targetTime, elapsed)

    cancelAnimationFrame(animationFrame.current)
    setElapsedTime(elapsed)
    setLatestResult(result)
    setHistory((current) => [result, ...current].slice(0, MAX_HISTORY_ITEMS))
    setPhase('result')
    startedAt.current = null
  }, [targetTime])

  const prepareRound = useCallback(() => {
    setTargetTime(createTargetTime())
    setElapsedTime(0)
    setLatestResult(null)
    setPhase('ready')
  }, [])

  const handleAction = useCallback(() => {
    if (phase === 'ready') startRound()
    if (phase === 'running') stopRound()
    if (phase === 'result') prepareRound()
  }, [phase, prepareRound, startRound, stopRound])

  useEffect(() => {
    if (phase !== 'running') return undefined

    const updateTimer = () => {
      setElapsedTime((performance.now() - startedAt.current) / 1000)
      animationFrame.current = requestAnimationFrame(updateTimer)
    }

    animationFrame.current = requestAnimationFrame(updateTimer)
    return () => cancelAnimationFrame(animationFrame.current)
  }, [phase])

  useEffect(() => {
    const handleKeyDown = (event) => {
      const isInteractiveElement = ['INPUT', 'BUTTON', 'TEXTAREA', 'SELECT'].includes(event.target.tagName)
      if (event.code !== 'Space' || isInteractiveElement || event.repeat) return

      event.preventDefault()
      handleAction()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleAction])

  const bestResult = useMemo(() => {
    return history.reduce((best, result) => {
      if (!best || result.absoluteDifference < best.absoluteDifference) return result
      return best
    }, null)
  }, [history])

  return {
    phase,
    targetTime,
    elapsedTime,
    latestResult,
    history,
    bestResult,
    handleAction,
  }
}
