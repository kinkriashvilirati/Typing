import { useState } from 'react'
import Button from '@/shared/ui/Button'
import Panel from '@/shared/ui/Panel'
import createBannerBrief from '../utils/createBannerBrief'

export default function RandomBannerBrief() {
  const [brief, setBrief] = useState(createBannerBrief)

  return (
    <Panel className="overflow-hidden" aria-labelledby="random-brief-title">
      <div className="border-b border-white/5 p-6">
        <p className="mb-2 text-xs font-black tracking-[0.16em] text-brand uppercase">One quick tool</p>
        <div className="flex items-end justify-between gap-5 max-sm:flex-col max-sm:items-start">
          <div>
            <h2 id="random-brief-title" className="text-2xl font-black">Random banner brief</h2>
            <p className="mt-2 text-muted-strong">Generate a small prompt when you want to practice a new creative.</p>
          </div>
          <Button onClick={() => setBrief(createBannerBrief())}>Generate another</Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-px bg-white/5 max-md:grid-cols-1">
        <BriefField label="Format" value={`${brief.size.name} · ${brief.size.dimensions}`} />
        <BriefField label="Industry" value={brief.industry} />
        <BriefField label="Animation challenge" value={brief.animation} />
      </div>
    </Panel>
  )
}

function BriefField({ label, value }) {
  return (
    <div className="bg-surface p-6">
      <span className="text-xs font-bold tracking-wider text-muted uppercase">{label}</span>
      <strong className="mt-3 block leading-7 text-ink">{value}</strong>
    </div>
  )
}
