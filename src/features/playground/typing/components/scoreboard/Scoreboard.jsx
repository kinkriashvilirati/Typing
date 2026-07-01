import Button from '@/shared/ui/Button'
import Panel from '@/shared/ui/Panel'
import ScoreSummary from './ScoreSummary'
import ScoreTable from './ScoreTable'

function Scoreboard({ scores, isLoading, errorMessage, onClear }) {
  const handleClear = async () => {
    if (scores.length === 0) return
    if (window.confirm('Clear all your saved typing scores?')) await onClear()
  }

  return (
    <Panel className="p-6" aria-label="Player scoreboard">
      <div className="flex items-center justify-between gap-5 max-sm:flex-col max-sm:items-start">
        <div>
          <p className="mb-2 text-xs font-black tracking-[0.16em] text-success uppercase">Personal bests</p>
          <h2 className="text-2xl font-black">Your typing scoreboard</h2>
        </div>
        <Button variant="ghost" onClick={handleClear} disabled={scores.length === 0}>Clear scores</Button>
      </div>
      <ScoreSummary scores={scores} />
      {errorMessage && <p className="mb-4 rounded-lg bg-danger/10 p-3 text-sm text-danger">Could not sync scores: {errorMessage}</p>}
      <ScoreTable scores={scores} isLoading={isLoading} />
    </Panel>
  )
}

export default Scoreboard
