import type { Article } from "../../models/articles"
import { Link } from "react-router-dom"

interface ArticleCardProps {
    article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
    const formattedDate = new Date(article.created_at).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    return (
        <Link to={`/blog/${article.slug}`} className="group">
            <article className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-32 hover:border-secondary hover:bg-white/10 transition-all duration-300 h-full flex flex-col gap-24">
                <div className="flex flex-col gap-16">
                    <h3 className="text-2xl font-bold group-hover:text-secondary transition-colors line-clamp-2">
                        {article.title}
                    </h3>
                    <p className="text-sm text-white/60">
                        {(() => {
                            const authorDisplay = [article.author.first_name, article.author.last_name]
                                .filter(Boolean)
                                .join(" ") || "unknown";
                            return `Par ${authorDisplay} • ${formattedDate}`;
                        })()}
                    </p>
                </div>

                {article.content && (
                    <p className="text-white/70 text-sm line-clamp-3 grow">
                        {article.content}
                    </p>
                )}

                <div className="text-secondary text-sm font-semibold group-hover:translate-x-1 transition-transform">
                    Lire l'article →
                </div>
            </article>
        </Link>
    )
}
