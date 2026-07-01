import { ALLOWED_EMAIL_DOMAIN } from '../constants'
import useAuthForm from '../hooks/useAuthForm'
import AuthFields from './AuthFields'

export default function AuthForm() {
  const form = useAuthForm()

  return (
    <div className="rounded-2xl border border-white/8 bg-surface/95 p-7 shadow-[0_30px_90px_rgb(0_0_0/0.35)] max-sm:p-5">
      <div className="mb-7">
        <p className="text-xs font-black tracking-[0.16em] text-success uppercase">Codev-RK account</p>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-ink">{form.isRegistration ? 'Create your account' : 'Welcome back'}</h2>
        <p className="mt-2 text-sm leading-6 text-muted-strong">
          {form.isRegistration ? 'Register once to keep your game scores across devices.' : 'Sign in to continue saving your scores.'}
        </p>
      </div>

      <form className="space-y-4" onSubmit={form.handleSubmit}>
        <AuthFields {...form} />
        <p className="text-xs text-muted">Only verified <strong className="text-muted-strong">@{ALLOWED_EMAIL_DOMAIN}</strong> email addresses can register.</p>

        <div className="min-h-6 text-sm" aria-live="polite">
          {form.errorMessage && <p className="text-danger">{form.errorMessage}</p>}
          {form.successMessage && <p className="text-success">{form.successMessage}</p>}
        </div>

        <button
          type="submit"
          disabled={form.isSubmitting}
          className="min-h-13 w-full cursor-pointer rounded-lg bg-linear-to-r from-brand to-success px-5 font-black text-[#08111f] transition hover:brightness-105 disabled:cursor-wait disabled:opacity-60"
        >
          {form.isSubmitting ? 'Please wait…' : form.isRegistration ? 'Register' : 'Sign in'}
        </button>
      </form>

      <button type="button" onClick={form.changeMode} className="mt-5 w-full cursor-pointer text-sm font-bold text-muted-strong transition-colors hover:text-ink">
        {form.isRegistration ? 'Already registered? Sign in' : 'Need an account? Register'}
      </button>
    </div>
  )
}
