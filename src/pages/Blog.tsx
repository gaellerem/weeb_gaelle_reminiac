import PageLayout from "./PageLayout"
import ArticlesList from "../components/articles/ArticlesList"
import { getArticles } from "../api/client"
import { useEffect, useState } from "react"
import type { Article } from "../models/articles"

export default function Blog() {
    const [articles, setArticles] = useState<Article[]>([])
    const [loading, setLoading] = useState<boolean>(true);

    const withLoading = async (fn: () => Promise<void>) => {
        document.body.style.cursor = "wait"
        setLoading(true)
        try {
            await fn();
        } finally {
            document.body.style.cursor = "default"
            setLoading(false)
        }
    }

    const refetchArticles = () => withLoading(async () => {
        try {
            const articles = await getArticles()
            setArticles(articles)
            console.log("Articles chargés :", articles)
        } catch (error) {
            console.error("Erreur lors du chargement des articles :", error);
        }
    })

    useEffect(() => {
        refetchArticles()
    }, [])

    return (
        <PageLayout>
            <section className="flex flex-col gap-80 text-center items-center">
                <div className="flex flex-col gap-32">
                    <h1 className="text-7xl font-extrabold">
                        Le Blog
                    </h1>
                    { loading ? (
                        <p>Chargement des articles...</p>
                    ) : (
                        <ArticlesList articles={articles} />
                    )}
                </div>
            </section>
        </PageLayout>
    )
}