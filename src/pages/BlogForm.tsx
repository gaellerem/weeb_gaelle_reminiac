import { useEffect, useState, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getArticleBySlug, createArticle, updateArticle } from "../api/client"
import { useAuth } from "../contexts/AuthContext"
import ArticleForm from "../components/articles/ArticleForm"
import { useToast } from "../hooks/useToast"

export default function BlogForm() {
    const { slug } = useParams<{ slug?: string }>()
    const isEditing = !!slug // permet de déterminer si on est en création ou édition selon la présence du slug dans l'URL
    const { user } = useAuth()
    const toast = useToast()

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [currentSlug, setCurrentSlug] = useState("")
    const [loading, setLoading] = useState(isEditing)
    const [saving, setSaving] = useState(false)

    const navigate = useNavigate()

    const fetchArticle = useCallback(async () => {
        // Si pas de slug, on est en création, pas besoin de fetch
        if (!slug) return
        setLoading(true)
        try {
            const data = await getArticleBySlug(slug)
            if (user?.id !== data.author.id && !user?.is_staff) {
                navigate(`/blog/${slug}`)
                return
            }
            setTitle(data.title)
            setContent(data.content)
            setCurrentSlug(data.slug)
        } catch {
            toast.error("Article introuvable.")
            navigate("/blog")
        } finally {
            setLoading(false)
        }
    }, [slug, user, navigate])

    useEffect(() => {
        if (isEditing) fetchArticle()
    }, [isEditing, fetchArticle])

    const handleSubmit = async () => {
        if (!title.trim() || !content.trim()) {
            toast.error("Le titre et le contenu sont obligatoires.")
            return
        }
        setSaving(true)
        try {
            if (isEditing) {
                const updated = await updateArticle(currentSlug, { title, content })
                toast.success("Article modifié.")
                navigate(`/blog/${updated.slug}`)
            } else {
                const created = await createArticle({ title, content })
                toast.success("Article publié.")
                navigate(`/blog/${created.slug}`)
            }
        } catch {
            toast.error(isEditing ? "Erreur lors de la sauvegarde." : "Erreur lors de la création.")
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <p>Chargement de l'article...</p>

    return (
        <ArticleForm
            heading={isEditing ? "Modifier l'article" : "Nouvel article"}
            title={title}
            content={content}
            onTitleChange={setTitle}
            onContentChange={setContent}
            onSubmit={handleSubmit}
            onCancel={() => navigate(isEditing ? `/blog/${slug}` : "/blog")}
            saving={saving}
            submitLabel={isEditing ? "Sauvegarder" : "Publier"}
            savingLabel={isEditing ? "Sauvegarde..." : "Publication..."}
        />
    )
}