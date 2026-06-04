import Navbar from "../components/Navbar"
import Footer from "../components/footer/Footer"
import type { ReactNode } from "react"

interface PageLayoutProps {
  children: ReactNode
  className?: string
}

export default function PageLayout({ children, className = "" }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-primary text-white">
      <Navbar />
      <main className={className}>
        {children}
      </main>
      <Footer />
    </div>
  )
}
