const variants = {
  primary: 'bg-success text-[#08111f] font-extrabold hover:brightness-105',
  secondary: 'border border-white/10 bg-surface-strong text-ink font-bold hover:border-brand/50 hover:bg-[#2b3a50]',
  ghost: 'border border-white/10 bg-transparent text-muted-strong hover:border-white/20 hover:text-ink disabled:cursor-not-allowed disabled:opacity-40',
}

export default function Button({ variant = 'primary', className = '', children, ...props }) {
  return (
    <button
      className={`min-h-10 cursor-pointer rounded-lg px-4 transition duration-150 hover:-translate-y-px focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand/60 disabled:hover:translate-y-0 ${variants[variant]} ${className}`}
      type="button"
      {...props}
    >
      {children}
    </button>
  )
}
