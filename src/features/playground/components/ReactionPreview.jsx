export default function ReactionPreview() {
  return (
    <div className="relative grid size-64 place-items-center rounded-full border border-accent/25 bg-[#0a0d17] shadow-[0_0_70px_rgb(167_139_250/0.18)] max-sm:size-56">
      <span className="absolute inset-4 rounded-full border border-dashed border-accent/20" aria-hidden="true" />
      <span className="absolute inset-10 rounded-full bg-linear-to-br from-[#8b5cf6] to-[#581c87] shadow-[0_18px_50px_rgb(88_28_135/0.5)]" aria-hidden="true" />
      <span className="relative text-center">
        <span className="block font-mono text-4xl font-black text-white">0.489</span>
        <span className="mt-2 block text-xs font-black tracking-[0.2em] text-purple-200 uppercase">Tap</span>
      </span>
    </div>
  )
}
