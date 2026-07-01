import PageContainer from '@/shared/layout/PageContainer'
import { ROUTES } from '@/shared/navigation/routes'
import PageIntro from '@/shared/ui/PageIntro'
import GameChoiceCard from './components/GameChoiceCard'
import ReactionPreview from './components/ReactionPreview'
import TypingPreview from './components/TypingPreview'

const games = [
  {
    eyebrow: 'Focus & flow',
    title: 'Typing test',
    description: 'Build rhythm, accuracy, and speed across a growing collection of passages.',
    route: ROUTES.typingGame,
    color: 'brand',
    preview: <TypingPreview />,
  },
  {
    eyebrow: 'Timing challenge',
    title: 'TimerBattle',
    description: 'Stop the clock on the target millisecond and sharpen your sense of timing.',
    route: ROUTES.reactionGame,
    color: 'purple',
    preview: <ReactionPreview />,
  },
]

export default function PlaygroundPage() {
  return (
    <PageContainer>
      <PageIntro
        eyebrow="Creative lab"
        title="Choose your game"
        description="Pick a challenge, chase a better score, and come back whenever your brain needs a different kind of break."
      />

      <section className="grid grid-cols-2 gap-6 max-lg:grid-cols-1" aria-label="Playground games">
        {games.map((game) => <GameChoiceCard key={game.route} {...game} />)}
      </section>
    </PageContainer>
  )
}
