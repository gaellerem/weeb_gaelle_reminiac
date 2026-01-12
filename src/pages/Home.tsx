import Navbar from "../components/Navbar"
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-primary text-white">
      <Navbar />
      <div className="grow flex items-center justify-center">
        Page Home
      </div>
    </div>
  )
}