import { MAX_PLAYER_NAME_LENGTH, MAX_SAVED_SCORES, STORAGE_KEY } from '../constants/config'

const fallbackPlayer = { name: 'Guest', scores: [] }

export function loadPlayer() {
  try {
    const savedPlayer = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (!savedPlayer || typeof savedPlayer !== 'object') return fallbackPlayer

    return {
      name: typeof savedPlayer.name === 'string' && savedPlayer.name.trim()
        ? savedPlayer.name.trim().slice(0, MAX_PLAYER_NAME_LENGTH)
        : fallbackPlayer.name,
      scores: Array.isArray(savedPlayer.scores)
        ? savedPlayer.scores
          .filter((score) => score && typeof score === 'object')
          .slice(0, MAX_SAVED_SCORES)
        : [],
    }
  } catch {
    return fallbackPlayer
  }
}

export function persistPlayer(player) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(player))
  } catch (error) {
    console.warn('Typeflow could not save this player.', error)
  }
}
