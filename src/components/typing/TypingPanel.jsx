import Panel from '../ui/Panel'
import TextSelector from './TextSelector'
import TypingText from './TypingText'

function TypingPanel({ tests, selectedIndex, selectedTest, characterStates, currentIndex, finished, onSelect, onPrevious, onRandom, onNext }) {
  return (
    <Panel className="p-[clamp(26px,4vw,34px)]" aria-label="Typing text">
      <TextSelector
        tests={tests}
        selectedIndex={selectedIndex}
        onSelect={onSelect}
        onPrevious={onPrevious}
        onRandom={onRandom}
        onNext={onNext}
      />
      <TypingText
        text={selectedTest.text}
        characterStates={characterStates}
        currentIndex={currentIndex}
        finished={finished}
      />
      <p className="mt-6 text-center text-xs text-muted">
        <kbd className="rounded border border-white/10 bg-[#111a28] px-1.5 py-1 text-muted-strong">Start typing</kbd>
        {' · Use '}
        <kbd className="rounded border border-white/10 bg-[#111a28] px-1.5 py-1 text-muted-strong">Backspace</kbd>
        {' to correct · Press '}
        <kbd className="rounded border border-white/10 bg-[#111a28] px-1.5 py-1 text-muted-strong">Esc</kbd>
        {' to restart'}
      </p>
    </Panel>
  )
}

export default TypingPanel
