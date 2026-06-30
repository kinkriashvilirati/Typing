import { useMemo } from 'react'
import { tokenizeText } from '../../utils/typing'

const baseCharacterClass = 'relative inline-block min-w-[0.62ch] rounded text-center transition-colors duration-100'

function Character({ character, status, active }) {
  const stateClass = status === 'correct'
    ? 'text-success opacity-85'
    : status === 'wrong'
      ? 'bg-danger/20 text-danger'
      : active
        ? 'bg-brand/15 text-ink'
        : ''

  return (
    <span className={`${baseCharacterClass} ${stateClass}`}>
      {character}
      {active && (
        <span
          className={`absolute bottom-[0.08em] left-0 h-0.5 w-full rounded-full ${status === 'wrong' ? 'bg-danger shadow-[0_0_14px_rgb(255_107_115/0.68)]' : 'bg-brand shadow-[0_0_14px_rgb(110_168_255/0.75)]'}`}
          aria-hidden="true"
        />
      )}
    </span>
  )
}

export default function TypingText({ text, characterStates, currentIndex, finished }) {
  const tokens = useMemo(() => tokenizeText(text), [text])

  return (
    <div className="font-mono text-[1.78rem] leading-[1.58] font-bold text-[rgb(169_177_193/0.62)] max-md:text-[1.42rem] max-sm:text-[1.22rem]" aria-live="polite">
      {tokens.map((token) => {
        if (token.isWhitespace) {
          return (
            <Character
              key={token.start}
              character={token.value}
              status={characterStates[token.start]}
              active={!finished && currentIndex === token.start}
            />
          )
        }

        return (
          <span key={token.start} className="inline-block whitespace-nowrap">
            {Array.from(token.value).map((character, localIndex) => {
              const index = token.start + localIndex
              return (
                <Character
                  key={index}
                  character={character}
                  status={characterStates[index]}
                  active={!finished && currentIndex === index}
                />
              )
            })}
          </span>
        )
      })}
    </div>
  )
}
