import { type FormEvent, useEffect, useState } from "react";
import PageLayout from "./PageLayout"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../hooks/useToast";

export default function Login() {
    const { login, verifyTwoFactorLogin, isAuthenticated } = useAuth();
    const toast = useToast();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [twoFactorToken, setTwoFactorToken] = useState<string | null>(null);
    const [code, setCode] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/")
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (submitting) return;

        setSubmitting(true);
        try {
            if (twoFactorToken) {
                await verifyTwoFactorLogin(twoFactorToken, code);
                navigate("/");
            } else {
                const challenge = await login({ email, password });
                if (challenge) {
                    setTwoFactorToken(challenge.two_factor_token);
                    setPassword("");
                } else {
                    navigate("/");
                }
            }
        } catch (error: any) {
            toast.error(error.message || "Impossible de se connecter.");
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <PageLayout>
        <section className="flex flex-col items-center gap-32 text-xl">
            <form className="flex flex-col gap-32 items-center max-w-md px-4" onSubmit={handleLogin}>
                {twoFactorToken ? (
                    <>
                        <div className="w-full flex flex-col gap-12">
                            <h1 className="text-3xl font-extrabold">Vérification en deux étapes</h1>
                            <p className="text-sm text-white/70">
                                Saisissez le code à 6 chiffres affiché dans votre application d’authentification.
                            </p>
                            <label htmlFor="two-factor-code" className="sr-only">Code de vérification</label>
                            <input
                                id="two-factor-code"
                                className="input"
                                type="text"
                                inputMode="numeric"
                                autoComplete="one-time-code"
                                pattern="[0-9]{6}"
                                maxLength={6}
                                placeholder="Code à 6 chiffres"
                                required
                                value={code}
                                onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
                            />
                        </div>
                        <button
                            className="secondary_button px-18 py-12"
                            type="submit"
                            disabled={submitting}
                        >
                            {submitting ? "Vérification..." : "Vérifier le code"}
                        </button>
                        <button
                            className="font-semibold text-sm hover:text-secondary transition"
                            type="button"
                            onClick={() => {
                                setTwoFactorToken(null);
                                setCode("");
                            }}
                        >
                            Revenir à la connexion
                        </button>
                    </>
                ) : (
                    <>
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
                        <div className="w-full">
                            <label htmlFor="password" className="sr-only">Mot de passe</label>
                            <input
                                id="password"
                                className="input"
                                type="password"
                                placeholder="Mot de passe"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            className="secondary_button px-18 py-12"
                            type="submit"
                            disabled={submitting}
                        >
                            {submitting ? "Connexion..." : "Se connecter"}
                        </button>
                        <Link to="/forgot-password" className="font-semibold text-sm hover:text-secondary transition">Mot de passe oublié ?</Link>

                        <p className="text-sm text-white/70">
                            Vous n'avez pas de compte ? Vous pouvez en {" "}
                            <Link to="/register" className="font-semibold underline decoration-white hover:decoration-secondary hover:text-secondary transition">
                            créer un
                            </Link>
                        </p>
                    </>
                )}
            </form>
        </section>
        </PageLayout>
    )
}