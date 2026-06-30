export default function PageIntro({ eyebrow, title, description }) {
  return (
    <header className="mb-10 max-w-3xl">
      <p className="mb-3 text-xs font-black tracking-[0.18em] text-success uppercase">{eyebrow}</p>
      <h1 className="text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] font-black tracking-[-0.06em] text-ink">{title}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-strong">{description}</p>
    </header>
  )
}
