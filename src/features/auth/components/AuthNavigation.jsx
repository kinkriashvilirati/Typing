import { signOut } from '../api/authApi'
import useAuth from '../hooks/useAuth'
import { ROUTES } from '@/shared/navigation/routes'

export default function AuthNavigation({ currentRoute }) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <span className="h-9 w-20 animate-pulse rounded-lg bg-white/5" aria-label="Loading account" />
  }

  if (!user) {
    const isActive = currentRoute === ROUTES.register

    return (
      <a
        href={`#${ROUTES.register}`}
        className={`rounded-lg px-3 py-2 text-sm font-bold transition-colors max-sm:px-2 ${isActive ? 'bg-brand/15 text-brand' : 'text-muted-strong hover:bg-white/5 hover:text-ink'}`}
        aria-current={isActive ? 'page' : undefined}
      >
        Register
      </a>
    )
  }

  const handleSignOut = async () => {
    const { error } = await signOut()
    if (!error) window.location.hash = ROUTES.home
  }

  return (
    <div className="flex items-center gap-2">
      <span className="max-w-36 truncate text-xs font-bold text-muted-strong max-md:hidden">{user.email}</span>
      <button type="button" onClick={handleSignOut} className="cursor-pointer rounded-lg border border-white/10 px-3 py-2 text-sm font-bold text-muted-strong transition-colors hover:text-ink max-sm:px-2">
        Sign out
      </button>
    </div>
  )
}
