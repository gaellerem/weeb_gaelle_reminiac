import PageLayout from "./PageLayout"
import ArticlesList from "../components/articles/ArticlesList"
import { getArticles } from "../api/client"
import { useCallback, useEffect, useState } from "react"
import type { Article } from "../models/articles"

export default function Blog() {
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
            console.log("Articles chargés :", articles)
        } catch (error) {
            console.error("Erreur lors du chargement des articles :", error)
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