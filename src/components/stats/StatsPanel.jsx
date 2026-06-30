import { formatTime } from '../../utils/formatters'
import Panel from '../ui/Panel'
import Metric from './Metric'

function StatsPanel({ stats }) {
  const roundedProgress = Math.round(stats.progress)

  return (
    <Panel className="p-6" aria-label="Typing test stats">
      <div className="grid grid-cols-4 gap-5 max-md:grid-cols-2 max-sm:grid-cols-1">
        <Metric label="Time Remaining" value={formatTime(stats.timeRemaining)} />
        <Metric label="WPM" value={stats.wpm} accent="brand" />
        <Metric label="Accuracy" value={`${stats.accuracy}%`} accent="danger" />
        <Metric label="Progress" value={`${roundedProgress}%`} accent="accent" />
      </div>

      <div className="mt-6" aria-label="Progress">
        <div className="mb-2 flex justify-between gap-4 text-sm font-semibold text-muted-strong max-sm:flex-col max-sm:gap-1">
          <span>Progress</span>
          <span>{stats.currentIndex} / {stats.totalCharacters} characters</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-[#3a4657]">
          <div
            className="h-full rounded-[inherit] bg-linear-to-r from-brand to-success transition-[width] duration-150"
            style={{ width: `${stats.progress}%` }}
          />
        </div>
      </div>
    </Panel>
  )
}

export default StatsPanel
