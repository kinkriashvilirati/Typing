import PageContainer from '@/shared/layout/PageContainer'
import { ROUTES } from '@/shared/navigation/routes'
import TypingTest from './TypingTest'

export default function TypingPage() {
  return (
    <PageContainer>
      <a href={`#${ROUTES.playground}`} className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-muted-strong transition-colors hover:text-ink">
        <span aria-hidden="true">←</span> All playground games
      </a>
      <TypingTest />
    </PageContainer>
  )
}
