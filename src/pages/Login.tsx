import Navbar from "../components/Navbar"
import Footer from "../components/footer/Footer"
import { Link } from "react-router-dom"

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col bg-primary text-white">
        <Navbar />
        <main>
            <section className="flex flex-col items-center gap-32">
                <form className="flex flex-col gap-32 items-center">
                    <input className="contact_input" type="email" placeholder="Email" />
                    <input className="contact_input" type="password" placeholder="Mot de passe" />

                    <button className="secondary_button h-11.75 w-38.5" type="submit">
                        Se connecter
                    </button>
                    <Link to="/login" className="font-semibold text-sm hover:text-secondary transition">Mot de passe oublié ?</Link>

                    <p className="text-xs text-white/70">
                        Vous n'avez pas de compte ? Vous pouvez en {" "}
                        <Link to="/signup" className="font-semibold underline decoration-white hover:decoration-secondary hover:text-secondary transition">
                            créer un
                        </Link>
                    </p>
                </form>
            </section>
        </main>
        <Footer />
    </div>
  )
}