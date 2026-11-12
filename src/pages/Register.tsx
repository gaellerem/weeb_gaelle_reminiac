import { type FormEvent, useEffect, useState } from "react";
import PageLayout from "./PageLayout"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../hooks/useToast";

export default function Register() {
    const navigate = useNavigate();
    const { register, isAuthenticated } = useAuth();
    const toast = useToast();

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [registered, setRegistered] = useState(false);
    const [formError, setFormError] = useState("");

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (submitting) return;

        setFormError("");
        if (password !== confirmPassword) {
            setFormError("Les mots de passe ne correspondent pas.");
            return;
        }
        if (password.length < 12) {
            setFormError("Le mot de passe doit contenir au moins 12 caractères.");
            return
        }

        setSubmitting(true);
        try {
            await register({ first_name: name, last_name: surname, email, password, password_confirm: confirmPassword });
            setRegistered(true);
        } catch (error: any) {
            const message = error.message || "L'inscription a échoué. Veuillez réessayer.";
            setFormError(message);
            toast.error(message);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <PageLayout>
            <section className="flex flex-col items-center gap-32 text-xl">
                {registered ? (
                    <div className="flex flex-col items-center gap-16 max-w-md px-4 text-center" role="status" aria-live="polite">
                        <h1 className="text-3xl font-extrabold">Inscription réussie</h1>
                        <p className="text-base text-white/70">
                            Votre compte a été créé et doit être validé par un administrateur avant que vous puissiez vous connecter.
                        </p>
                        <Link to="/login" className="secondary_button px-18 py-12">
                            Aller à la connexion
                        </Link>
                    </div>
                ) : (
                <form className="flex flex-col gap-32 items-center max-w-md px-4" onSubmit={handleRegister} aria-busy={submitting}>
                    <div className="w-full">
                        <label htmlFor="name" className="sr-only">Prénom</label>
                        <input
                            id="name"
                            className="input"
                            type="text"
                            placeholder="Prénom"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="surname" className="sr-only">Nom</label>
                        <input
                            id="surname"
                            className="input"
                            type="text"
                            placeholder="Nom"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            required
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="email" className="sr-only">Email</label>
                        <input
                            id="email"
                            className="input"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="w-full flex flex-col gap-16">
                        <div>
                            <label htmlFor="password" className="sr-only">Mot de passe</label>
                            <input
                                id="password"
                                className="input"
                                type="password"
                                placeholder="Mot de passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="sr-only">Confirmer le mot de passe</label>
                            <input
                                id="confirmPassword"
                                className="input"
                                type="password"
                                placeholder="Confirmer le mot de passe"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    {formError && (
                        <p className="w-full text-sm text-red-400" role="alert">
                            {formError}
                        </p>
                    )}
                    <button className="secondary_button px-18 py-12" type="submit" disabled={submitting}>
                        {submitting ? "Inscription..." : "S'inscrire"}
                    </button>
                    <p className="text-sm text-white/70">
                        Vous avez déjà un compte ? Vous pouvez vous{" "}
                        <Link to="/login" className="font-semibold underline decoration-white hover:decoration-secondary hover:text-secondary transition">
                            connecter
                        </Link>
                    </p>
                </form>
                )}
            </section>
        </PageLayout>
    )
}