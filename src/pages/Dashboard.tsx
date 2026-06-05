import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useToast } from "../hooks/useToast"
import { getArticles } from "../api/client"
import type { Article } from "../models/articles"
import PageLayout from "./PageLayout"
import ArticleCard from "../components/articles/ArticleCard"

export default function Dashboard() {
    const { user } = useAuth()
    const toast = useToast()
    const navigate = useNavigate()

    const [articles, setArticles] = useState<Article[]>([])
    const [loadingArticles, setLoadingArticles] = useState(true)

    const fetchMyArticles = useCallback(async () => {
        setLoadingArticles(true)
        try {
            const all = await getArticles()
            setArticles(all.filter(a => a.author.id === user?.id))
        } catch {
            toast.error("Erreur lors du chargement des articles.")
        } finally {
            setLoadingArticles(false)
        }
    }, [user])

    useEffect(() => {
        fetchMyArticles()
    }, [fetchMyArticles])

    return (
        <PageLayout>
            <section className="flex flex-col gap-80 max-w-5xl mx-auto w-full">

                {/* Profil */}
                <div className="flex flex-col gap-24">
                    <h1 className="text-4xl font-extrabold">Mon profil</h1>
                    {user?.is_staff && (
                        <h2 className="text-secondary text-2xl font-semibold">
                            Administrateur
                        </h2>
                    )}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-32 flex flex-col gap-16">
                        <div className="flex flex-col gap-8">
                            <span className="text-white/50 text-sm">Nom</span>
                            <span className="font-semibold">
                                {user?.first_name} {user?.last_name}
                            </span>
                        </div>
                        <div className="flex flex-col gap-8">
                            <span className="text-white/50 text-sm">Email</span>
                            <span className="font-semibold">{user?.email}</span>
                        </div>
                    </div>
                </div>

                {/* Mes articles */}
                <div className="flex flex-col gap-24">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-extrabold">Mes articles</h2>
                        <button
                            onClick={() => navigate("/blog/new")}
                            className="secondary_button py-12 px-28"
                        >
                            Nouvel article
                        </button>
                    </div>
                    {loadingArticles ? (
                        <p>Chargement des articles...</p>
                    ) : articles.length === 0 ? (
                        <p className="text-white/60">Vous n'avez pas encore écrit d'article.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-32">
                            {articles.map(article => (
                                <ArticleCard key={article.slug} article={article} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </PageLayout>
    )
}