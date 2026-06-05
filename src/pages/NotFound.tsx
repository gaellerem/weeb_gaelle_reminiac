import { Link } from "react-router-dom"
import PageLayout from "./PageLayout"

export default function NotFound() {
    return (
        <PageLayout>
            <section className="flex flex-col items-center justify-center gap-32 text-center">
                <h1 className="text-9xl font-extrabold text-secondary">404</h1>
                <div className="flex flex-col gap-16">
                    <p className="text-2xl font-bold">Page introuvable</p>
                    <p className="text-white/60">
                        La page que vous cherchez n'existe pas ou a été déplacée.
                    </p>
                </div>
                <Link to="/" className="secondary_button py-12 px-28">
                    Retour à l'accueil
                </Link>
            </section>
        </PageLayout>
    )
}