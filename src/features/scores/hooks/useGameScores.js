import { useCallback, useEffect, useState } from 'react'
import { createGameScore, deleteGameScores, getGameScores } from '../api/gameScoresApi'

const emptyState = {
  userId: null,
  scores: [],
  errorMessage: '',
}

export default function useGameScores({ userId, game, mapRow, limit = 10 }) {
  const [state, setState] = useState(emptyState)
  const belongsToCurrentUser = Boolean(userId) && state.userId === userId

  useEffect(() => {
    if (!userId) return undefined

    let isActive = true
    getGameScores({ userId, game, limit })
      .then((rows) => {
        if (!isActive) return
        setState({ userId, scores: rows.map(mapRow), errorMessage: '' })
      })
      .catch((error) => {
        if (!isActive) return
        setState({ userId, scores: [], errorMessage: error.message })
      })

    return () => {
      isActive = false
    }
  }, [game, limit, mapRow, userId])

  const saveScore = useCallback(async ({ score, details }) => {
    if (!userId) return null

    try {
      const row = await createGameScore({ userId, game, score, details })
      const nextScore = mapRow(row)
      setState((current) => ({
        userId,
        scores: [nextScore, ...(current.userId === userId ? current.scores : [])].slice(0, limit),
        errorMessage: '',
      }))
      return nextScore
    } catch (error) {
      setState((current) => ({
        userId,
        scores: current.userId === userId ? current.scores : [],
        errorMessage: error.message,
      }))
      return null
    }
  }, [game, limit, mapRow, userId])

  const clearScores = useCallback(async () => {
    if (!userId) return false

    try {
      await deleteGameScores({ userId, game })
      setState({ userId, scores: [], errorMessage: '' })
      return true
    } catch (error) {
      setState((current) => ({ ...current, errorMessage: error.message }))
      return false
    }
  }, [game, userId])

  return {
    scores: belongsToCurrentUser ? state.scores : [],
    isLoading: Boolean(userId) && !belongsToCurrentUser,
    errorMessage: belongsToCurrentUser ? state.errorMessage : '',
    saveScore,
    clearScores,
  }
}
