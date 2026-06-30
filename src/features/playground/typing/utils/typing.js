export function calculateAccuracy(correctCharacters, mistakes) {
  const totalAttempts = correctCharacters + mistakes
  return totalAttempts === 0
    ? 100
    : Math.round((correctCharacters / totalAttempts) * 100)
}

export function calculateWpm(correctCharacters, elapsedSeconds, started = true) {
  if (!started || elapsedSeconds <= 0) return 0

  const elapsedMinutes = Math.max(elapsedSeconds / 60, 1 / 60)
  return Math.round((correctCharacters / 5) / elapsedMinutes)
}

export function getRandomIndex(length, previousIndex = null) {
  if (length <= 1) return 0

  const choices = Array.from({ length }, (_, index) => index)
    .filter((index) => index !== previousIndex)

  return choices[Math.floor(Math.random() * choices.length)]
}

export function wrapIndex(index, length) {
  return (index + length) % length
}

export function tokenizeText(text) {
  const tokens = []
  let start = 0

  for (const value of text.match(/\S+|\s/g) ?? []) {
    tokens.push({ value, start, isWhitespace: value.trim() === '' })
    start += value.length
  }

  return tokens
}
