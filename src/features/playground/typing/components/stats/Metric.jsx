const accentClasses = {
  default: 'text-ink',
  brand: 'text-brand',
  danger: 'text-danger',
  accent: 'text-accent',
}

export default function Metric({ label, value, accent = 'default' }) {
  return (
    <div className="min-w-0 text-center max-md:text-left">
      <span className="text-sm font-semibold text-muted-strong">{label}</span>
      <strong className={`mt-1 block text-3xl leading-none ${accentClasses[accent]}`}>{value}</strong>
    </div>
  )
}
