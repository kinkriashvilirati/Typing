import { useCallback } from 'react'
import useGameScores from '@/features/scores/hooks/useGameScores'

const mapReactionRow = (row) => ({
  id: row.id,
  target: Number(row.details.target),
  elapsed: Number(row.details.elapsed),
  difference: Number(row.details.difference),
  absoluteDifference: Number(row.score),
  rating: row.details.rating,
  completedAt: row.created_at,
})

export default function useReactionScores(userId) {
  const { saveScore, ...gameScores } = useGameScores({
    userId,
    game: 'reaction',
    mapRow: mapReactionRow,
  })

  const saveReactionScore = useCallback((result) => {
    return saveScore({
      score: result.absoluteDifference,
      details: {
        target: result.target,
        elapsed: result.elapsed,
        difference: result.difference,
        rating: result.rating,
      },
    })
  }, [saveScore])

  return { ...gameScores, saveReactionScore }
}
