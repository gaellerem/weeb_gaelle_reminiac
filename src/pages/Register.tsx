import { type SubmitEvent, useEffect, useState } from "react";
import PageLayout from "./PageLayout"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext";

export default function Register() {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { register, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    const handleRegister = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }
        try {
            await register({ first_name: name, last_name: surname, email, password, password_confirm: confirmPassword });
            navigate("/");
        } catch (err) {
            setError("Une erreur est survenue lors de l'inscription.");
        }
    }

    return (
        <PageLayout>
            <section className="flex flex-col items-center gap-32">
            <form className="flex flex-col gap-32 items-center max-w-md px-4" onSubmit={handleRegister}>
                <div className="w-full">
                    <label htmlFor="name" className="sr-only">Prénom</label>
                    <input 
                        id="name"
                        className="contact_input"
                        type="text"
                        placeholder="Prénom"
                        value={name} onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="w-full">
                    <label htmlFor="surname" className="sr-only">Nom</label>
                <input 
                        id="surname"
                        className="contact_input"
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
                        className="contact_input"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="w-full">
                    <label htmlFor="password" className="sr-only">Mot de passe</label>
                    <input 
                        id="password"
                        className="contact_input"
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label htmlFor="confirmPassword" className="sr-only">Confirmer le mot de passe</label>
                    <input
                        id="confirmPassword"
                        className="contact_input mt-2"
                        type="password"
                        placeholder="Confirmer le mot de passe"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                { error && <p className="text-red-500 text-sm">{error}</p> }

                <button className="secondary_button h-11.75 w-38.5" type="submit">
                    S'inscrire
                </button>

                <p className="text-xs text-white/70">
                    Vous avez déjà un compte ? Vous pouvez vous {" "}
                    <Link to="/login" className="font-semibold underline decoration-white hover:decoration-secondary hover:text-secondary transition">
                    connecter
                    </Link>
                </p>
            </form>
            </section>
        </PageLayout>
    )
}