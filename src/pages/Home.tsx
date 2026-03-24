import Navbar from "../components/Navbar"
import Footer from "../components/footer/Footer"
import { HeroSection, TrustSection, LearnSection, StayTunedSection } from "../components/home"

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col bg-primary text-white">
            <Navbar />
            <main className="flex flex-col gap-32 lg:gap-80">
                <HeroSection />
                <TrustSection />
                <LearnSection />
                <StayTunedSection />
            </main>
            <Footer />
        </div>
    )
}