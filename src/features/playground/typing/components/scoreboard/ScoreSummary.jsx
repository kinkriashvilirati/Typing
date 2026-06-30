function SummaryItem({ label, value }) {
  return (
    <div className="rounded-lg bg-surface-strong/75 px-4 py-3.5">
      <span className="block text-xs font-bold text-muted">{label}</span>
      <strong className="mt-1 block text-xl text-brand">{value}</strong>
    </div>
  )
}

export default function ScoreSummary({ scores }) {
  const bestWpm = scores.length
    ? Math.max(...scores.map((score) => Number(score.wpm) || 0))
    : '—'
  const bestAccuracy = scores.length
    ? `${Math.max(...scores.map((score) => Number(score.accuracy) || 0))}%`
    : '—'

  return (
    <div className="my-5 grid grid-cols-3 gap-2.5 max-sm:grid-cols-1">
      <SummaryItem label="Best WPM" value={bestWpm} />
      <SummaryItem label="Best accuracy" value={bestAccuracy} />
      <SummaryItem label="Tests finished" value={scores.length} />
    </div>
  )
}
