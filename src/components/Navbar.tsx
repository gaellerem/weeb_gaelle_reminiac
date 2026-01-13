import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="py-24 px-80">
        <div className="max-w-250 mx-auto">
            <div className="flex justify-between items-center p-24 shadow-xl rounded-2xl bg-white-5">
                <div className="flex items-center gap-38">
                    <Link to="/" className="brand">weeb</Link>
                    <div className="flex items-center gap-16">
                        <Link to="/" className="navlink hover_secondary">About Us</Link>
                        <Link to="/" className="navlink hover_secondary">Contact</Link>
                    </div>
                </div>
                <div className="flex items-center gap-16">
                    <Link to="/" className="navlink hover_secondary"><span className="px-16">Log In</span></Link>
                    <Link to="/" className="secondary_button py-12 px-28">Join Now</Link>
                </div>
            </div>
        </div>
    </nav>
  )
}