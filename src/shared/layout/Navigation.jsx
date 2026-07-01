import { ROUTES } from '../navigation/routes'

const links = [
  { label: 'Work tools', route: ROUTES.workTools },
  { label: 'Playground', route: ROUTES.playground },
]

function NavLink({ route, currentRoute, children }) {
  const isActive = currentRoute === route || currentRoute.startsWith(`${route}/`)

  return (
    <a
      href={`#${route}`}
      className={`rounded-lg px-3 py-2 text-sm font-bold transition-colors focus-visible:outline-3 focus-visible:outline-brand/60 max-sm:px-2 ${isActive ? 'bg-brand/15 text-brand' : 'text-muted-strong hover:bg-white/5 hover:text-ink'}`}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </a>
  )
}

export default function Navigation({ currentRoute }) {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#0b1220]/90 backdrop-blur-xl" aria-label="Main navigation">
      <div className="mx-auto flex min-h-16 w-[min(1120px,calc(100%-40px))] items-center justify-between gap-5 max-sm:w-[calc(100%-28px)] max-sm:flex-col max-sm:items-stretch max-sm:gap-2 max-sm:py-3">
        <a href={`#${ROUTES.home}`} className="text-lg font-black tracking-tight text-ink">
          Codev<span className="text-success">-RK</span>
        </a>

        <div className="flex items-center gap-1 max-sm:justify-between">
          {links.map((link) => (
            <NavLink key={link.route} route={link.route} currentRoute={currentRoute}>
              {link.label}
            </NavLink>
          ))}
          <span className="px-3 py-2 text-sm font-bold text-muted-strong max-sm:px-2">Register</span>
        </div>
      </div>
    </nav>
  )
}
