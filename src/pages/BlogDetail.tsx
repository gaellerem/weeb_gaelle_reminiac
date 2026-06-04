import { useEffect, useState, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getArticleBySlug } from "../api/client"
import type { Article } from "../models/articles"
import PageLayout from "./PageLayout"

export default function BlogDetail() {
    const { slug } = useParams<{ slug: string }>()
    const navigate = useNavigate()
    const [article, setArticle] = useState<Article | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

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
                    </article>
                )}
            </section>
        </PageLayout>
    )
}