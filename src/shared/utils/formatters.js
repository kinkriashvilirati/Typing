// Formatting shared by game scoreboards and result panels.
export function formatTime(totalSeconds) {
  const safeSeconds = Math.max(0, Math.trunc(totalSeconds))
  const minutes = Math.floor(safeSeconds / 60)
  const seconds = safeSeconds % 60

  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

export function formatScoreDate(dateString) {
  const date = new Date(dateString)

  if (Number.isNaN(date.getTime())) return '—'

  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}
