import { useEffect, useState } from 'react'
import { ROUTES } from './routes'

function readRoute() {
  return window.location.hash.slice(1) || ROUTES.home
}

export default function useHashRoute() {
  const [route, setRoute] = useState(readRoute)

  useEffect(() => {
    const handleRouteChange = () => setRoute(readRoute())
    window.addEventListener('hashchange', handleRouteChange)

    return () => window.removeEventListener('hashchange', handleRouteChange)
  }, [])

  return route
}
