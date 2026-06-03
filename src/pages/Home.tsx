import PageLayout from "./PageLayout"
import { HeroSection, TrustSection, LearnSection, StayTunedSection } from "../components/home"

export default function Home() {
  return (
    <PageLayout className="flex flex-col gap-32 lg:gap-80">
      <HeroSection />
      <TrustSection />
      <LearnSection />
      <StayTunedSection />
    </PageLayout>
  )
}