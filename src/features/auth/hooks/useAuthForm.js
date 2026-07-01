import { useState } from 'react'
import { ROUTES } from '@/shared/navigation/routes'
import { registerWithEmail, signInWithEmail } from '../api/authApi'
import { normalizeEmail, validateCredentials } from '../utils/authValidation'

export default function useAuthForm() {
  const [mode, setMode] = useState('register')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatedPassword, setRepeatedPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isRegistration = mode === 'register'

  const changeMode = () => {
    setMode((current) => current === 'register' ? 'sign-in' : 'register')
    setErrorMessage('')
    setSuccessMessage('')
    setRepeatedPassword('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    const validationError = validateCredentials({ email, password, repeatedPassword, isRegistration })
    if (validationError) {
      setErrorMessage(validationError)
      return
    }

    setIsSubmitting(true)

    try {
      const { data, error } = isRegistration
        ? await registerWithEmail(email, password)
        : await signInWithEmail(email, password)

      if (error) {
        setErrorMessage(error.message)
        return
      }

      if (data.session) {
        window.location.hash = ROUTES.home
        return
      }

      setSuccessMessage(`Check ${normalizeEmail(email)} and confirm your account before signing in.`)
      setPassword('')
      setRepeatedPassword('')
    } catch {
      setErrorMessage('Could not reach the authentication service. Try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    repeatedPassword,
    setRepeatedPassword,
    errorMessage,
    successMessage,
    isSubmitting,
    isRegistration,
    changeMode,
    handleSubmit,
  }
}
