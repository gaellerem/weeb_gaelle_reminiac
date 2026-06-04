import { useEffect, useState, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getArticleBySlug, updateArticle } from "../api/client"
import { useAuth } from "../contexts/AuthContext"
import type { Article } from "../models/articles"
import PageLayout from "./PageLayout"

export default function BlogEdit() {
    const { slug } = useParams<{ slug: string }>()
    const navigate = useNavigate()
    const { user } = useAuth()
    const [article, setArticle] = useState<Article | null>(null)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchArticle = useCallback(async () => {
        if (!slug) return
        setLoading(true)
        try {
            const data = await getArticleBySlug(slug)
            if (user?.id !== data.author.id) {
                navigate(`/blog/${slug}`)
                return
            }
            setArticle(data)
            setTitle(data.title)
            setContent(data.content)
        } catch {
            setError("Article introuvable.")
        } finally {
            setLoading(false)
        }
    }, [slug, user, navigate])

    useEffect(() => {
        fetchArticle()
    }, [fetchArticle])

    const handleSubmit = async () => {
        if (!article) return
        setSaving(true)
        try {
            const updated = await updateArticle(article.slug, { title, content })
            navigate(`/blog/${updated.slug}`)
        } catch {
            setError("Erreur lors de la sauvegarde.")
        } finally {
            setSaving(false)
        }
    }

    return (
        <PageLayout>
            <section className="flex flex-col gap-32 items-center">
                <button
                    onClick={() => navigate(`/blog/${slug}`)}
                    className="self-start text-white/60 hover:text-white transition-colors"
                >
                    ← Retour à l'article
                </button>

                {loading ? (
                    <p>Chargement de l'article...</p>
                ) : error ? (
                    <p className="text-white/60">{error}</p>
                ) : (
                    <div className="flex flex-col gap-24 max-w-3xl w-full">
                        <h1 className="text-4xl font-extrabold">Modifier l'article</h1>

                        <div className="flex flex-col gap-8">
                            <label className="text-white/60 text-sm">Titre</label>
                            <input
                                type="text"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                className="bg-white/5 border border-white/10 rounded-xl px-20 py-12 text-white focus:outline-none focus:border-secondary transition-colors"
                            />
                        </div>

                        <div className="flex flex-col gap-8">
                            <label className="text-white/60 text-sm">Contenu</label>
                            <textarea
                                value={content}
                                onChange={e => setContent(e.target.value)}
                                rows={16}
                                className="bg-white/5 border border-white/10 rounded-xl px-20 py-12 text-white focus:outline-none focus:border-secondary transition-colors resize-none"
                            />
                        </div>

                        {error && <p className="text-red-400 text-sm">{error}</p>}

                        <div className="flex gap-16 justify-end">
                            <button
                                onClick={() => navigate(`/blog/${slug}`)}
                                className="secondary_button py-12 px-28 text-white/60"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={saving}
                                className="secondary_button py-12 px-28 disabled:opacity-50"
                            >
                                {saving ? "Sauvegarde..." : "Sauvegarder"}
                            </button>
                        </div>
                    </div>
                )}
            </section>
        </PageLayout>
    )
}