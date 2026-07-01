import { ALLOWED_EMAIL_DOMAIN, MIN_PASSWORD_LENGTH } from '../constants'

export function normalizeEmail(email) {
  return email.trim().toLowerCase()
}

export function hasAllowedEmailDomain(email) {
  const [localPart, domain, ...extraParts] = normalizeEmail(email).split('@')
  return Boolean(localPart) && Boolean(domain) && extraParts.length === 0 && domain === ALLOWED_EMAIL_DOMAIN
}

export function validateCredentials({ email, password, repeatedPassword, isRegistration }) {
  if (!hasAllowedEmailDomain(email)) {
    return `Use your @${ALLOWED_EMAIL_DOMAIN} email address.`
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Password must contain at least ${MIN_PASSWORD_LENGTH} characters.`
  }

  if (isRegistration && password !== repeatedPassword) {
    return 'Passwords do not match.'
  }

  return null
}
