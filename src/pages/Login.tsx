import { type FormEvent, useEffect, useState } from "react";
import PageLayout from "./PageLayout"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../hooks/useToast";

export default function Login() {
    const { login, isAuthenticated } = useAuth();
    const toast = useToast();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/")
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await login({ email, password });
            navigate("/");
        } catch (error: any) {
            toast.error(error.message);
        }
    };
    return (
        <PageLayout>
        <section className="flex flex-col items-center gap-32 text-xl">
            <form className="flex flex-col gap-32 items-center max-w-md px-4" onSubmit={handleLogin}>
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
                <button className="secondary_button px-18 py-12" type="submit">
                    Se connecter
                </button>
                <Link to="/forgot-password" className="font-semibold text-sm hover:text-secondary transition">Mot de passe oublié ?</Link>

                <p className="text-sm text-white/70">
                    Vous n'avez pas de compte ? Vous pouvez en {" "}
                    <Link to="/register" className="font-semibold underline decoration-white hover:decoration-secondary hover:text-secondary transition">
                    créer un
                    </Link>
                </p>
            </form>
        </section>
        </PageLayout>
    )
}