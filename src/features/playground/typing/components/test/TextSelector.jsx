import Button from '@/shared/ui/Button'

function TextSelector({ tests, selectedIndex, onSelect, onPrevious, onRandom, onNext }) {
  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-4 max-md:flex-col max-md:items-start">
        <div className="flex min-w-0 flex-col gap-1 text-sm font-bold text-muted-strong">
          <span className="text-ink">{tests[selectedIndex].title}</span>
          <span>{tests.length} {tests.length === 1 ? 'text' : 'texts'} available</span>
        </div>
        <div className="flex flex-wrap justify-end gap-2 max-md:justify-start" aria-label="Text controls">
          <Button variant="secondary" onClick={onPrevious}>Prev</Button>
          <Button variant="secondary" onClick={onRandom}>Random</Button>
          <Button variant="secondary" onClick={onNext}>Next</Button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-2.5" aria-label="Choose typing text">
        {tests.map((test, index) => {
          const selected = index === selectedIndex

          return (
            <button
              key={test.title}
              type="button"
              aria-pressed={selected}
              onClick={() => onSelect(index)}
              className={`min-w-0 cursor-pointer rounded-lg border p-3 text-left transition duration-150 hover:-translate-y-px hover:border-brand/50 hover:bg-[#2b3a50] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand/60 ${selected ? 'border-brand/75 bg-brand/15' : 'border-white/10 bg-surface-strong'}`}
            >
              <span className="block overflow-hidden font-extrabold text-ellipsis whitespace-nowrap text-ink">{test.title}</span>
              <span className="mt-1 block text-xs font-bold text-muted-strong">{test.text.length} characters</span>
            </button>
          )
        })}
      </div>
    </>
  )
}

export default TextSelector
