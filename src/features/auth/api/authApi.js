import { supabase } from '@/shared/api/supabaseClient'
import { normalizeEmail } from '../utils/authValidation'

export function registerWithEmail(email, password) {
  return supabase.auth.signUp({
    email: normalizeEmail(email),
    password,
  })
}

export function signInWithEmail(email, password) {
  return supabase.auth.signInWithPassword({
    email: normalizeEmail(email),
    password,
  })
}

export function signOut() {
  return supabase.auth.signOut()
}
