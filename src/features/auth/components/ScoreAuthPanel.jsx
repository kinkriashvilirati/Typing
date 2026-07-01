import Button from '@/shared/ui/Button'
import Panel from '@/shared/ui/Panel'
import { ROUTES } from '@/shared/navigation/routes'
import { signOut } from '../api/authApi'
import useAuth from '../hooks/useAuth'

export default function ScoreAuthPanel() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <Panel className="h-20 animate-pulse" aria-label="Loading account" />
  }

  if (!user) {
    return (
      <Panel className="flex items-center justify-between gap-5 p-5 max-sm:flex-col max-sm:items-stretch" aria-label="Register to save scores">
        <div className="flex items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand/15 text-xl text-brand" aria-hidden="true">◇</span>
          <div>
            <strong className="block">Register to save scores</strong>
            <span className="mt-1 block text-xs text-muted">You can play as a guest, but guest results are not stored.</span>
          </div>
        </div>
        <a href={`#${ROUTES.register}`} className="grid min-h-10 place-items-center rounded-lg bg-success px-4 font-extrabold text-[#08111f] transition hover:-translate-y-px hover:brightness-105">
          Register
        </a>
      </Panel>
    )
  }

  return (
    <Panel className="flex items-center justify-between gap-5 p-5 max-sm:flex-col max-sm:items-stretch" aria-label="Signed-in account">
      <div className="flex min-w-0 items-center gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-linear-to-br from-brand to-success text-lg font-black text-[#08111f]" aria-hidden="true">
          {user.email?.charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0">
          <strong className="block truncate">{user.email}</strong>
          <span className="mt-1 block text-xs text-success">Your completed scores are synced.</span>
        </div>
      </div>
      <Button variant="ghost" onClick={signOut}>Sign out</Button>
    </Panel>
  )
}
