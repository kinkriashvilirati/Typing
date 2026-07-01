import { formatSeconds } from '../utils/reactionGame'

const actionLabels = {
  ready: 'Play now',
  running: 'Stop timer',
  result: 'New target',
}

export default function TimerBattleIntro({ phase, bestResult, rounds, onAction }) {
  return (
    <section className="flex flex-col justify-center py-8 max-lg:py-0">
      <span className="mb-8 w-fit rounded-full border border-accent/35 bg-accent/8 px-3 py-1.5 text-xs font-black tracking-[0.17em] text-purple-300 uppercase">
        <span className="mr-2 text-accent" aria-hidden="true">●</span>
        Reaction time game
      </span>

      <h1 className="text-[clamp(3.5rem,8vw,6rem)] leading-[0.88] font-black tracking-[-0.07em]">
        <span className="bg-linear-to-r from-cyan-400 via-brand to-violet-500 bg-clip-text text-transparent">TimerBattle</span>
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-8 text-muted-strong">
        Stop the timer at the exact target time. Train your reaction speed and timing accuracy, one millisecond at a time.
      </p>

      <button
        type="button"
        onClick={onAction}
        className="mt-9 min-h-16 max-w-md cursor-pointer rounded-lg bg-linear-to-r from-violet-600 via-fuchsia-500 to-orange-500 px-6 text-lg font-black text-white shadow-[0_14px_40px_rgb(168_85_247/0.28)] transition duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-accent/70"
      >
        {actionLabels[phase]}
      </button>
      <p className="mt-4 font-mono text-xs text-muted">Play as a guest · Spacebar works too</p>

      <div className="mt-10 grid max-w-md grid-cols-2 gap-3">
        <Stat label="Best difference" value={bestResult ? `${formatSeconds(bestResult.absoluteDifference)}s` : '—'} />
        <Stat label="Rounds played" value={rounds} />
      </div>
    </section>
  )
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border border-white/7 bg-white/3 p-4">
      <span className="block text-xs font-bold text-muted">{label}</span>
      <strong className="mt-2 block font-mono text-xl text-ink">{value}</strong>
    </div>
  )
}
