import { useEffect, useRef } from 'react'
import { formatTime } from '@/shared/utils/formatters'
import Button from '@/shared/ui/Button'
import Panel from '@/shared/ui/Panel'
import ResultItem from './ResultItem'

function ResultsPanel({ result, onRestart }) {
  const panelRef = useRef(null)

  useEffect(() => {
    panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [])

  return (
    <Panel ref={panelRef} className="p-6" aria-label="Typing test results">
      <div className="mb-5 flex items-center justify-between gap-4 max-sm:flex-col max-sm:items-stretch">
        <h2 className="text-2xl font-black">Results</h2>
        <Button onClick={onRestart} className="max-sm:w-full">Try again</Button>
      </div>
      <div className="grid grid-cols-5 gap-3 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
        <ResultItem label="Final WPM" value={result.wpm} />
        <ResultItem label="Accuracy" value={`${result.accuracy}%`} />
        <ResultItem label="Correct Characters" value={result.correctCharacters} />
        <ResultItem label="Mistakes" value={result.mistakes} />
        <ResultItem label="Elapsed Time" value={formatTime(result.elapsed)} />
      </div>
    </Panel>
  )
}

export default ResultsPanel
