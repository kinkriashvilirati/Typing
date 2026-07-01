import { supabase } from '@/shared/api/supabaseClient'

export async function getGameScores({ userId, game, limit = 10 }) {
  const { data, error } = await supabase
    .from('game_scores')
    .select('id, game, score, details, created_at')
    .eq('user_id', userId)
    .eq('game', game)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data
}

export async function createGameScore({ userId, game, score, details }) {
  const { data, error } = await supabase
    .from('game_scores')
    .insert({
      user_id: userId,
      game,
      score,
      details,
    })
    .select('id, game, score, details, created_at')
    .single()

  if (error) throw error
  return data
}

export async function deleteGameScores({ userId, game }) {
  const { error } = await supabase
    .from('game_scores')
    .delete()
    .eq('user_id', userId)
    .eq('game', game)

  if (error) throw error
}
