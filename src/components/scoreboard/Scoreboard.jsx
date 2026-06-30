import Button from '../ui/Button'
import Panel from '../ui/Panel'
import ScoreSummary from './ScoreSummary'
import ScoreTable from './ScoreTable'

function Scoreboard({ name, scores, onClear }) {
  const handleClear = () => {
    if (scores.length === 0) return
    if (window.confirm('Clear all saved scores for this player?')) onClear()
  }

  return (
    <Panel className="p-6" aria-label="Player scoreboard">
      <div className="flex items-center justify-between gap-5 max-sm:flex-col max-sm:items-start">
        <div>
          <p className="mb-2 text-xs font-black tracking-[0.16em] text-success uppercase">Personal bests</p>
          <h2 className="text-2xl font-black">{name}&apos;s scoreboard</h2>
        </div>
        <Button variant="ghost" onClick={handleClear} disabled={scores.length === 0}>Clear scores</Button>
      </div>
      <ScoreSummary scores={scores} />
      <ScoreTable scores={scores} />
    </Panel>
  )
}

export default Scoreboard
