export default function TypingPreview() {
  return (
    <div className="w-full max-w-md rounded-xl border border-white/8 bg-[#0a111e] p-5 shadow-2xl">
      <div className="mb-5 flex items-center justify-between text-xs font-bold text-muted">
        <span>TYPEFLOW</span>
        <span className="text-brand">72 WPM</span>
      </div>
      <p className="font-mono text-xl leading-9 font-bold text-muted-strong">
        <span className="text-success">Build rhythm</span>{' '}
        <span className="relative bg-brand/15 text-ink">one<span className="absolute bottom-0 left-0 h-0.5 w-full bg-brand" /></span>{' '}
        word at a time.
      </p>
      <div className="mt-6 flex gap-2" aria-hidden="true">
        {['T', 'Y', 'P', 'E'].map((key) => (
          <span key={key} className="grid size-9 place-items-center rounded-md border border-white/10 bg-surface-strong font-mono text-xs text-muted-strong">{key}</span>
        ))}
      </div>
    </div>
  )
}
