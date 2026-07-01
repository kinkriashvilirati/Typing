import { useCallback } from 'react'
import useGameScores from '@/features/scores/hooks/useGameScores'

const mapTypingRow = (row) => ({
  id: row.id,
  text: row.details.text,
  wpm: Number(row.score),
  accuracy: Number(row.details.accuracy),
  elapsed: Number(row.details.elapsed),
  completedAt: row.created_at,
})

export default function useTypingScores(userId) {
  const { saveScore, ...gameScores } = useGameScores({
    userId,
    game: 'typing',
    mapRow: mapTypingRow,
  })

  const saveTypingScore = useCallback((result, textTitle) => {
    return saveScore({
      score: result.wpm,
      details: {
        text: textTitle,
        accuracy: result.accuracy,
        elapsed: result.elapsed,
        correctCharacters: result.correctCharacters,
        mistakes: result.mistakes,
      },
    })
  }, [saveScore])

  return { ...gameScores, saveTypingScore }
}
