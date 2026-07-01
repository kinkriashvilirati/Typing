import Button from '@/shared/ui/Button'
import Panel from '@/shared/ui/Panel'
import { formatScoreDate } from '@/shared/utils/formatters'
import { formatDifference, formatSeconds } from '../utils/reactionGame'

export default function SavedReactionScores({ scores, isLoading, errorMessage, onClear }) {
  const handleClear = async () => {
    if (scores.length === 0) return
    if (window.confirm('Clear all your saved TimerBattle scores?')) await onClear()
  }

  return (
    <Panel className="mt-8 p-6" aria-labelledby="saved-reaction-scores">
      <div className="mb-5 flex items-center justify-between gap-5 max-sm:flex-col max-sm:items-start">
        <div>
          <p className="mb-2 text-xs font-black tracking-[0.16em] text-accent uppercase">Synced results</p>
          <h2 id="saved-reaction-scores" className="text-xl font-black text-ink">Your TimerBattle scores</h2>
        </div>
        <Button variant="ghost" onClick={handleClear} disabled={scores.length === 0}>Clear scores</Button>
      </div>

      {errorMessage && <p className="mb-4 rounded-lg bg-danger/10 p-3 text-sm text-danger">Could not sync scores: {errorMessage}</p>}
      {isLoading && <p className="py-7 text-center text-muted">Loading your scores…</p>}
      {!isLoading && scores.length === 0 && <p className="py-7 text-center text-muted">Complete a round and your result will appear here.</p>}

      {!isLoading && scores.length > 0 && (
        <div className="grid grid-cols-3 gap-3 max-md:grid-cols-2 max-sm:grid-cols-1">
          {scores.map((result) => (
            <article key={result.id} className="rounded-xl border border-white/7 bg-white/3 p-4">
              <div className="flex items-center justify-between gap-3 text-xs text-muted">
                <span>Target {formatSeconds(result.target)}</span>
                <span>{formatScoreDate(result.completedAt)}</span>
              </div>
              <strong className="mt-3 block font-mono text-2xl text-ink">{formatSeconds(result.elapsed)}s</strong>
              <span className={`mt-1 block text-sm ${result.absoluteDifference <= 0.075 ? 'text-success' : 'text-muted-strong'}`}>
                {formatDifference(result.difference)}
              </span>
            </article>
          ))}
        </div>
      )}
    </Panel>
  )
}
