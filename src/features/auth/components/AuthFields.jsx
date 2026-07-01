import { ALLOWED_EMAIL_DOMAIN } from '../constants'

const inputClassName = 'min-h-12 w-full rounded-lg border border-white/10 bg-[#111a28] px-4 text-ink placeholder:text-muted focus:border-brand focus:outline-3 focus:outline-brand/15'

export default function AuthFields({ email, setEmail, password, setPassword, repeatedPassword, setRepeatedPassword, isRegistration }) {
  return (
    <>
      <Field label="Work email">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={`you@${ALLOWED_EMAIL_DOMAIN}`}
          autoComplete="email"
          required
          className={inputClassName}
        />
      </Field>

      <Field label="Password">
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete={isRegistration ? 'new-password' : 'current-password'}
          required
          className={inputClassName}
        />
      </Field>

      {isRegistration && (
        <Field label="Repeat password">
          <input
            type="password"
            value={repeatedPassword}
            onChange={(event) => setRepeatedPassword(event.target.value)}
            autoComplete="new-password"
            required
            className={inputClassName}
          />
        </Field>
      )}
    </>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-muted-strong">{label}</span>
      {children}
    </label>
  )
}
