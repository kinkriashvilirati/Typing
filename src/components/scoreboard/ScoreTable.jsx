import { formatScoreDate, formatTime } from '../../utils/formatters'

function ScoreTable({ scores }) {
  if (scores.length === 0) {
    return <p className="px-3 pt-7 pb-2.5 text-center text-muted">Finish a typing test and your score will appear here.</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="text-xs tracking-[0.08em] text-muted uppercase">
            <th className="border-b border-white/10 p-3">Text</th>
            <th className="border-b border-white/10 p-3">WPM</th>
            <th className="border-b border-white/10 p-3">Accuracy</th>
            <th className="border-b border-white/10 p-3">Time</th>
            <th className="border-b border-white/10 p-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={`${score.completedAt}-${index}`} className="text-sm text-muted-strong">
              <td className="max-w-64 overflow-hidden border-b border-white/10 p-3 font-bold text-ellipsis whitespace-nowrap text-ink">{score.text || 'Typing test'}</td>
              <td className="border-b border-white/10 p-3 whitespace-nowrap">{Number(score.wpm) || 0}</td>
              <td className="border-b border-white/10 p-3 whitespace-nowrap">{Number(score.accuracy) || 0}%</td>
              <td className="border-b border-white/10 p-3 whitespace-nowrap">{formatTime(Number(score.elapsed) || 0)}</td>
              <td className="border-b border-white/10 p-3 whitespace-nowrap">{formatScoreDate(score.completedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ScoreTable
