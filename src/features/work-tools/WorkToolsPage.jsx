import PageContainer from '@/shared/layout/PageContainer'
import PageIntro from '@/shared/ui/PageIntro'
import RandomBannerBrief from './components/RandomBannerBrief'

export default function WorkToolsPage() {
  return (
    <PageContainer>
      <PageIntro
        eyebrow="Workspace"
        title="Work tools"
        description="A home for focused utilities that make banner development, QA, and integration work easier."
      />
      <RandomBannerBrief />
    </PageContainer>
  )
}
