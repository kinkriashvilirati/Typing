import { useCallback, useEffect, useState } from 'react'
import { MAX_PLAYER_NAME_LENGTH, MAX_SAVED_SCORES } from '../config'
import { loadPlayer, persistPlayer } from '../utils/storage'

export default function usePlayer() {
  const [player, setPlayer] = useState(loadPlayer)

  useEffect(() => {
    persistPlayer(player)
  }, [player])

  const saveName = useCallback((name) => {
    const cleanName = name.trim().slice(0, MAX_PLAYER_NAME_LENGTH)
    if (!cleanName) return false

    setPlayer((current) => ({ ...current, name: cleanName }))
    return true
  }, [])

  const saveScore = useCallback((score) => {
    setPlayer((current) => ({
      ...current,
      scores: [score, ...current.scores].slice(0, MAX_SAVED_SCORES),
    }))
  }, [])

  const clearScores = useCallback(() => {
    setPlayer((current) => ({ ...current, scores: [] }))
  }, [])

  return {
    name: player.name,
    scores: player.scores,
    saveName,
    saveScore,
    clearScores,
  }
}
