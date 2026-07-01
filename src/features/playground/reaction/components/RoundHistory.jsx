import { formatDifference, formatSeconds } from '../utils/reactionGame'

export default function RoundHistory({ history }) {
  if (history.length === 0) return null

  return (
    <section className="mt-8" aria-labelledby="round-history-title">
      <div className="mb-4 flex items-center justify-between">
        <h2 id="round-history-title" className="text-xl font-black text-ink">Recent rounds</h2>
        <span className="text-xs font-bold text-muted">Closest wins</span>
      </div>
      <div className="grid grid-cols-3 gap-3 max-md:grid-cols-2 max-sm:grid-cols-1">
        {history.map((result, index) => (
          <article key={result.id} className="rounded-xl border border-white/7 bg-white/3 p-4">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-black tracking-wider text-muted uppercase">Round {history.length - index}</span>
              <span className="font-mono text-xs text-muted-strong">Target {formatSeconds(result.target)}</span>
            </div>
            <strong className="mt-3 block font-mono text-2xl text-ink">{formatSeconds(result.elapsed)}s</strong>
            <span className={`mt-1 block text-sm ${result.absoluteDifference <= 0.075 ? 'text-success' : 'text-muted-strong'}`}>
              {formatDifference(result.difference)}
            </span>
          </article>
        ))}
      </div>
    </section>
  )
}
