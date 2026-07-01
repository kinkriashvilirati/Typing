import { formatDifference, formatSeconds } from '../utils/reactionGame'

const orbLabels = {
  ready: 'Start',
  running: 'Stop!',
  result: 'Next',
}

export default function TimerStage({ phase, targetTime, elapsedTime, result, onAction }) {
  const progress = Math.min((elapsedTime / targetTime) * 100, 100)

  return (
    <section className="relative min-h-[620px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#0c101b] p-8 shadow-[0_35px_100px_rgb(0_0_0/0.38)] max-sm:min-h-[560px] max-sm:p-5" aria-label="Timer game">
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgb(255_255_255/0.025)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.025)_1px,transparent_1px)] [background-size:34px_34px]" aria-hidden="true" />
      <div className="absolute -right-32 bottom-10 size-80 rounded-full bg-violet-600/15 blur-3xl" aria-hidden="true" />

      <div className="relative flex h-full min-h-[556px] flex-col items-center text-center max-sm:min-h-[510px]">
        <span className="text-[0.65rem] font-black tracking-[0.22em] text-muted uppercase">Target time</span>
        <strong className="mt-2 font-mono text-4xl tracking-[0.12em] text-ink">{formatSeconds(targetTime)}</strong>

        <div className="mt-5 font-mono text-[clamp(4rem,10vw,5.5rem)] leading-none font-black tracking-[-0.08em] text-white" aria-label={`${formatSeconds(elapsedTime)} seconds`}>
          {formatSeconds(elapsedTime)}
        </div>

        <div className="mt-5 min-h-14" aria-live="polite">
          {phase === 'ready' && <p className="text-sm text-muted-strong">Start the clock, then trust your timing.</p>}
          {phase === 'running' && <p className="text-sm font-bold text-purple-300">Clock running · stop on {formatSeconds(targetTime)}</p>}
          {phase === 'result' && result && (
            <div>
              <strong className="block text-lg text-ink">{result.rating}</strong>
              <span className={result.absoluteDifference <= 0.075 ? 'text-success' : 'text-muted-strong'}>
                {formatDifference(result.difference)}
              </span>
            </div>
          )}
        </div>

        <div className="mt-auto grid place-items-center">
          <div
            className="grid size-64 place-items-center rounded-full p-1.5 transition-all duration-150 max-sm:size-56"
            style={{ background: `conic-gradient(#a855f7 ${progress}%, rgb(255 255 255 / 0.08) ${progress}%)` }}
          >
            <button
              type="button"
              onClick={onAction}
              className={`relative grid size-full cursor-pointer place-items-center overflow-hidden rounded-full border border-white/12 font-black text-white shadow-[0_24px_70px_rgb(88_28_135/0.48)] transition duration-150 hover:scale-[1.025] focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-accent/70 active:scale-95 ${phase === 'running' ? 'bg-linear-to-br from-orange-500 via-rose-500 to-fuchsia-700' : 'bg-linear-to-br from-violet-500 to-purple-900'}`}
              aria-label={`${orbLabels[phase]} timer`}
            >
              <span className="absolute -top-12 left-8 size-36 rounded-full bg-white/15 blur-2xl" aria-hidden="true" />
              <span className="relative text-4xl tracking-[-0.04em]">{orbLabels[phase]}</span>
            </button>
          </div>
          <span className="mt-5 text-xs font-bold tracking-[0.18em] text-muted uppercase">Tap or press space</span>
        </div>
      </div>
    </section>
  )
}
