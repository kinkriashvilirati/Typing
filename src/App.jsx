import LandingPage from '@/pages/LandingPage'
import PlaygroundPage from '@/features/playground/PlaygroundPage'
import ReactionGamePage from '@/features/playground/reaction/ReactionGamePage'
import TypingPage from '@/features/playground/typing/TypingPage'
import WorkToolsPage from '@/features/work-tools/WorkToolsPage'
import Navigation from '@/shared/layout/Navigation'
import useHashRoute from '@/shared/navigation/useHashRoute'
import { ROUTES } from '@/shared/navigation/routes'

const pages = {
  [ROUTES.home]: LandingPage,
  [ROUTES.workTools]: WorkToolsPage,
  [ROUTES.playground]: PlaygroundPage,
  [ROUTES.typingGame]: TypingPage,
  [ROUTES.reactionGame]: ReactionGamePage,
}

export default function App() {
  const route = useHashRoute()
  const Page = pages[route] ?? LandingPage

  return (
    <>
      <Navigation currentRoute={route} />
      <Page />
    </>
  )
}
