function ResultItem({ label, value }) {
  return (
    <div className="min-w-0 rounded-lg bg-surface-strong p-4">
      <span className="text-sm font-semibold text-muted-strong">{label}</span>
      <strong className="mt-2 block text-2xl leading-none">{value}</strong>
    </div>
  )
}

export default ResultItem
