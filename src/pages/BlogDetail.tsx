import { useEffect, useState, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getArticleBySlug, deleteArticle } from "../api/client"
import { useAuth } from "../contexts/AuthContext"
import type { Article } from "../models/articles"
import PageLayout from "./PageLayout"

export default function BlogDetail() {
    const { slug } = useParams<{ slug: string }>()
    const [article, setArticle] = useState<Article | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const { user } = useAuth()
    const isOwner = user?.id === article?.author.id

    const navigate = useNavigate()

    const fetchArticle = useCallback(async () => {
        if (!slug) return
        setLoading(true)
        try {
            const data = await getArticleBySlug(slug)
            setArticle(data)
        } catch {
            setError("Article introuvable.")
        } finally {
            setLoading(false)
        }
    }, [slug])

    useEffect(() => {
        fetchArticle()
    }, [fetchArticle])

    const handleDelete = async () => {
        if (!confirm("Supprimer cet article ?")) return
        try {
            await deleteArticle(article!.slug)
            navigate("/blog")
        } catch {
            console.error("Erreur lors de la suppression")
        }
    }

    const formattedDate = article
        ? new Date(article.created_at).toLocaleDateString("fr-FR", {
            day: "numeric", month: "long", year: "numeric"
        })
        : null

    return (
        <PageLayout>
            <section className="flex flex-col gap-32 items-center">
                <button
                    onClick={() => navigate("/blog")}
                    className="self-start text-white/60 hover:text-white transition-colors"
                >
                    ← Retour au blog
                </button>

                {loading ? (
                    <p>Chargement de l'article...</p>
                ) : error || !article ? (
                    <p className="text-white/60">{error ?? "Article introuvable."}</p>
                ) : (
                    <article className="flex flex-col gap-32 max-w-3xl w-full text-left">
                        <div className="flex flex-col gap-16 text-center">
                            <h1 className="text-4xl font-extrabold">{article.title}</h1>
                            <p className="text-white/50 text-sm">
                                Par{" "}
                                <span className="text-white/80 font-medium">
                                    {article.author.first_name} {article.author.last_name}
                                </span>
                                {" "}· {formattedDate}
                            </p>
                        </div>

                        <div className="text-white/80 leading-relaxed text-lg">
                            {article.content}
                        </div>
                        { isOwner && (
                            <div className="flex gap-16 justify-end">
                                <button
                                    onClick={() => navigate(`/blog/${article.slug}/edit`)}
                                    className="secondary_button py-12 px-28"
                                >
                                    Modifier
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="secondary_button py-12 px-28 text-red-400 border-red-400/30 hover:border-red-400"
                                >
                                    Supprimer
                                </button>
                            </div>
                        )}
                    </article>
                )}
            </section>
        </PageLayout>
    )
}