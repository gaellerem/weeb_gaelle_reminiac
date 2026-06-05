import { useEffect, useState, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getArticleBySlug, deleteArticle } from "../api/client"
import { useAuth } from "../contexts/AuthContext"
import type { Article } from "../models/articles"
import PageLayout from "./PageLayout"
import ConfirmDialog from "../components/ConfirmDialog"
import { useToast } from "../hooks/useToast"

export default function BlogDetail() {
    const { user } = useAuth()
    const { slug } = useParams<{ slug: string }>()
    const toast = useToast()
    const navigate = useNavigate()

    const [article, setArticle] = useState<Article | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [deleteOpen, setDeleteOpen] = useState(false)

    const isOwner = user?.id === article?.author.id


    const fetchArticle = useCallback(async () => {
        if (!slug) return
        setLoading(true)
        try {
            const data = await getArticleBySlug(slug)
            setArticle(data)
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }, [slug])

    useEffect(() => {
        fetchArticle()
    }, [fetchArticle])

    const handleDelete = async () => {
        try {
            await deleteArticle(article!.slug)
            toast.success("Article supprimé avec succès.")
            navigate("/blog")
        } catch (error: any) {
            toast.error(error.message)
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
                ) : !article ? (
                    <p className="text-white/60">Article introuvable.</p>
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
                            {article.content.split("\n\n").map((paragraph, i) => (
                                <p key={i} className="mb-16">
                                    {paragraph.split("\n").map((line, j, arr) => (
                                        <span key={j}>
                                            {line}
                                            {j < arr.length - 1 && <br />}
                                        </span>
                                    ))}
                                </p>
                            ))}
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
                                    onClick={() => setDeleteOpen(true)}
                                    className="secondary_button py-12 px-28 border border-red-500/40! bg-red-500/10! text-red-400! hover:bg-red-500/20! hover:border-red-500/60!"
                                >
                                    Supprimer
                                </button>
                            </div>
                        )}
                        <ConfirmDialog
                            open={deleteOpen}
                            onClose={() => setDeleteOpen(false)}
                            onConfirm={handleDelete}
                            title="Supprimer l'article"
                            description="Cette action est irréversible. L'article sera définitivement supprimé."
                            confirmLabel="Supprimer"
                            danger
                        />
                    </article>
                )}
            </section>
        </PageLayout>
    )
}