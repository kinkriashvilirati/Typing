const MIN_TARGET_SECONDS = 2.5
const MAX_TARGET_SECONDS = 7.5

export function createTargetTime() {
  const range = MAX_TARGET_SECONDS - MIN_TARGET_SECONDS
  return Number((MIN_TARGET_SECONDS + Math.random() * range).toFixed(3))
}

export function createReactionResult(target, elapsed) {
  const difference = elapsed - target
  const absoluteDifference = Math.abs(difference)

  return {
    id: `${Date.now()}-${Math.random()}`,
    target,
    elapsed,
    difference,
    absoluteDifference,
    rating: getRating(absoluteDifference),
  }
}

function getRating(difference) {
  if (difference <= 0.025) return 'Perfect timing'
  if (difference <= 0.075) return 'Razor sharp'
  if (difference <= 0.15) return 'Great stop'
  if (difference <= 0.3) return 'Very close'
  return 'Keep tuning'
}

export function formatSeconds(value) {
  return Number(value).toFixed(3)
}

export function formatDifference(value) {
  const timing = value < 0 ? 'early' : 'late'
  return `${Math.abs(value).toFixed(3)}s ${timing}`
}
