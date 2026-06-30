import Button from '../ui/Button'

function AppHeader({ onRestart }) {
  return (
    <header className="mb-6 flex items-center justify-between gap-6 max-sm:items-start">
      <div>
        <p className="mb-2 text-xs font-black tracking-[0.16em] text-success uppercase">Focus mode</p>
        <h1 className="text-[clamp(2rem,6vw,3.3rem)] leading-none font-black tracking-[-0.055em]">Typeflow</h1>
        <p className="mt-2.5 text-muted-strong max-sm:hidden">Build rhythm, accuracy, and speed—one word at a time.</p>
      </div>
      <Button onClick={onRestart} title="Restart the current test" className="max-sm:px-3">
        <span aria-hidden="true">↻</span> Restart
      </Button>
    </header>
  )
}

export default AppHeader
