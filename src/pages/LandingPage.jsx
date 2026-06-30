import PageContainer from '@/shared/layout/PageContainer'
import { ROUTES } from '@/shared/navigation/routes'

const destinations = [
  {
    eyebrow: 'Build',
    title: 'Work tools',
    description: 'Small utilities for banner development, testing, and everyday creative work.',
    route: ROUTES.workTools,
    accent: 'from-brand/25 to-brand/5',
  },
  {
    eyebrow: 'Play',
    title: 'Playground',
    description: 'Experiments, challenges, and the Typeflow typing test.',
    route: ROUTES.playground,
    accent: 'from-success/25 to-success/5',
  },
]

export default function LandingPage() {
  return (
    <PageContainer className="flex min-h-[calc(100vh-4rem)] flex-col justify-center">
      <section className="py-12">
        <p className="mb-4 text-xs font-black tracking-[0.2em] text-success uppercase">Developer workspace</p>
        <h1 className="max-w-5xl text-[clamp(3rem,9vw,7.5rem)] ext-ink">
          Make useful things.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-strong">
          Codev-RK is a growing collection of practical banner tools and creative coding experiments.
        </p>
      </section>

      <section className="grid grid-cols-2 gap-5 pb-12 max-md:grid-cols-1" aria-label="Explore Codev-RK">
        {destinations.map((destination) => (
          <a
            key={destination.route}
            href={`#${destination.route}`}
            className={`group rounded-xl border border-white/5 bg-linear-to-br ${destination.accent} p-7 shadow-[0_24px_70px_rgb(0_0_0/0.2)] transition duration-200 hover:-translate-y-1 hover:border-white/15 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-brand/60`}
          >
            <span className="text-xs font-black tracking-[0.16em] text-muted-strong uppercase">{destination.eyebrow}</span>
            <span className="mt-12 flex items-end justify-between gap-5">
              <span>
                <strong className="block text-3xl font-black text-ink">{destination.title}</strong>
                <span className="mt-2 block max-w-md leading-7 text-muted-strong">{destination.description}</span>
              </span>
              <span className="text-2xl text-ink transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
            </span>
          </a>
        ))}
      </section>
    </PageContainer>
  )
}
