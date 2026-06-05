import { type FormEvent, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import PageLayout from "./PageLayout"
import { confirmPasswordReset } from "../api/client"
import { useToast } from "../hooks/useToast"

export default function ResetPassword() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const toast = useToast()

    const uidb64 = searchParams.get("uidb64") ?? ""
    const token = searchParams.get("token") ?? ""

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (password !== confirmPassword) {
            toast.error("Les mots de passe ne correspondent pas.")
            return
        }
        if (password.length < 12) {
            toast.error("Le mot de passe doit contenir au moins 12 caractères.")
            return
        }
        if (!uidb64 || !token) {
            toast.error("Lien invalide ou expiré.")
            navigate("/login")
            return
        }
        setLoading(true)
        try {
            await confirmPasswordReset({ uidb64, token, password })
            toast.success("Mot de passe réinitialisé avec succès.")
            navigate("/login")
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <PageLayout>
            <section className="flex flex-col items-center gap-32">
                <form className="flex flex-col gap-32 items-center max-w-md px-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-12 text-center">
                        <h1 className="text-4xl font-extrabold">Nouveau mot de passe</h1>
                    </div>

                    <div className="w-full flex flex-col gap-16">
                        <div>
                            <label htmlFor="password" className="sr-only">Nouveau mot de passe</label>
                            <input
                                id="password"
                                className="contact_input"
                                type="password"
                                placeholder="Nouveau mot de passe"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="sr-only">Confirmer le mot de passe</label>
                            <input
                                id="confirmPassword"
                                className="contact_input"
                                type="password"
                                placeholder="Confirmer le mot de passe"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        className="secondary_button px-28 py-12 disabled:opacity-50"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Réinitialisation..." : "Réinitialiser"}
                    </button>
                </form>
            </section>
        </PageLayout>
    )
}