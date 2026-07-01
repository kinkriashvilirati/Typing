import PageContainer from '@/shared/layout/PageContainer'
import AuthForm from './components/AuthForm'

export default function RegisterPage() {
  return (
    <PageContainer className="grid min-h-[calc(100vh-4rem)] place-items-center">
      <div className="grid w-full grid-cols-[1fr_460px] items-center gap-16 max-lg:grid-cols-1">
        <section className="max-w-xl">
          <p className="mb-4 text-xs font-black tracking-[0.18em] text-success uppercase">Keep your progress</p>
          <h1 className="text-[clamp(3.5rem,8vw,6rem)] leading-[0.9] font-black tracking-[-0.065em] text-ink">
            Your scores,<br />wherever you play.
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-strong">
            One simple Codev-RK account saves Typeflow and TimerBattle results securely to your profile.
          </p>
        </section>
        <AuthForm />
      </div>
    </PageContainer>
  )
}
