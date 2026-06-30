import PageContainer from '@/shared/layout/PageContainer'
import PageIntro from '@/shared/ui/PageIntro'
import TypingTest from './typing/TypingTest'

export default function PlaygroundPage() {
  return (
    <PageContainer>
      <PageIntro
        eyebrow="Creative lab"
        title="Playground"
        description="A place for experiments, small challenges, and tools built simply because they are fun to make."
      />
      <TypingTest />
    </PageContainer>
  )
}
