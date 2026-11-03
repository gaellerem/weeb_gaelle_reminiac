import { type FormEvent, useState } from "react"
import { Link } from "react-router-dom"
import PageLayout from "./PageLayout"
import { requestPasswordReset } from "../api/client"
import { useToast } from "../hooks/useToast"

export default function ForgotPassword() {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const toast = useToast()

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true)
        try {
            await requestPasswordReset(email)
            toast.success("Si cet email existe, un lien de réinitialisation vous a été envoyé.")
            setEmail("")
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <PageLayout>
            <section className="flex flex-col items-center gap-32">
                <form className="flex w-full max-w-md flex-col items-center gap-32 px-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-12 text-center">
                        <h1 className="text-4xl font-extrabold">Mot de passe oublié</h1>
                        <p className="text-white/60 text-sm">
                            Entrez votre email et nous vous enverrons un lien de réinitialisation.
                        </p>
                    </div>

                    <div className="w-full">
                        <label htmlFor="email" className="sr-only">Email</label>
                        <input
                            id="email"
                            className="input"
                            type="email"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <button
                        className="secondary_button px-28 py-12 disabled:opacity-50"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Envoi..." : "Envoyer le lien"}
                    </button>

                    <Link to="/login" className="font-semibold text-sm text-white/60 hover:text-secondary transition">
                        ← Retour à la connexion
                    </Link>
                </form>
            </section>
        </PageLayout>
    )
}