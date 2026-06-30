export default function Panel({ as: Component = 'section', className = '', children, ...props }) {
  return (
    <Component
      className={`rounded-lg border border-white/5 bg-surface/95 shadow-[0_24px_70px_rgb(0_0_0/0.24)] ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
