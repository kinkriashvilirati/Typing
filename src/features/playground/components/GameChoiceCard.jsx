const colorStyles = {
  brand: {
    eyebrow: 'text-brand',
    border: 'hover:border-brand/45',
    glow: 'bg-brand/20',
  },
  purple: {
    eyebrow: 'text-accent',
    border: 'hover:border-accent/45',
    glow: 'bg-accent/20',
  },
}

export default function GameChoiceCard({ eyebrow, title, description, route, color, preview }) {
  const styles = colorStyles[color]

  return (
    <a
      href={`#${route}`}
      className={`group relative isolate min-h-[480px] overflow-hidden rounded-2xl border border-white/7 bg-[#111827]/90 p-7 shadow-[0_28px_80px_rgb(0_0_0/0.28)] transition duration-300 hover:-translate-y-1.5 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-brand/60 ${styles.border}`}
    >
      <span className={`absolute -top-24 -right-24 -z-10 size-64 rounded-full blur-3xl transition-opacity duration-300 group-hover:opacity-90 ${styles.glow}`} aria-hidden="true" />
      <div className="flex h-full flex-col">
        <p className={`text-xs font-black tracking-[0.17em] uppercase ${styles.eyebrow}`}>{eyebrow}</p>
        <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] text-ink">{title}</h2>
        <p className="mt-3 max-w-md leading-7 text-muted-strong">{description}</p>
        <div className="my-8 flex flex-1 items-center justify-center">{preview}</div>
        <span className="flex items-center justify-between border-t border-white/7 pt-5 font-extrabold text-ink">
          Play now
          <span className="text-xl transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
        </span>
      </div>
    </a>
  )
}
