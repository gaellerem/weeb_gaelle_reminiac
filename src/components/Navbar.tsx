import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="py-24 px-80">
        <div className="flex justify-between items-center p-24 shadow-nav rounded-xl bg-white-5">
            <div className="flex items-center gap-38">
                <span className="text-3xl font-bold">weeb</span>
                <div className="flex items-center gap-16">
                    <Link to="/" className="navlink">About Us</Link>
                    <Link to="/" className="navlink">Contact</Link>
                </div>
            </div>
            <div className="flex items-center gap-16">
                <Link to="/" className="navlink">Log In</Link>
                <Link to="/" className="secondary_button py-12 px-28">Join Now</Link>
            </div>
        </div>
    </nav>
  )
}