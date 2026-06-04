import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import PageLayout from "./PageLayout"
import ArticlesList from "../components/articles/ArticlesList"
import { getArticles } from "../api/client"
import type { Article } from "../models/articles"
import { useToast } from "../hooks/useToast"
import { useAuth } from "../contexts/AuthContext"

export default function Blog() {
    const { user } = useAuth()
    const toast = useToast()
    const navigate = useNavigate()

    const [articles, setArticles] = useState<Article[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const withLoading = useCallback(async (fn: () => Promise<void>) => {
        setLoading(true)
        try {
            await fn()
        } finally {
            setLoading(false)
        }
    }, [])

    const refetchArticles = useCallback(() => withLoading(async () => {
        try {
            const articles = await getArticles()
            setArticles(articles)
        } catch (error: any) {
            toast.error(error.message)
        }
    }), [withLoading])

    useEffect(() => {
        refetchArticles()
    }, [refetchArticles])

    return (
        <PageLayout>
            <section className="flex flex-col gap-80 text-center items-center">
                <div className="flex flex-col gap-32">
                    <h1 className="text-7xl font-extrabold">
                        Le Blog
                    </h1>
                    { user && <button className="secondary_button self-center" onClick={() => navigate("/blog/new")}>
                        Créer un nouvel article
                    </button>}
                    {loading ? (
                        <p>Chargement des articles...</p>
                    ) : (
                        <ArticlesList articles={articles} />
                    )}
                </div>
            </section>
        </PageLayout>
    )
}