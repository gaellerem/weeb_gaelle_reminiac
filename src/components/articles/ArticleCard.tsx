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
        <Link to={`/articles/${article.id}`} className="group">
            <article className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-32 hover:border-secondary hover:bg-white/10 transition-all duration-300 h-full flex flex-col gap-24">
                <div className="flex flex-col gap-16">
                    <h3 className="text-2xl font-bold group-hover:text-secondary transition-colors line-clamp-2">
                        {article.title}
                    </h3>
                    <p className="text-sm text-white/60">
                        {(() => {
                            const a = article.author as any;
                            const nameParts = [a?.first_name, a?.last_name].filter(Boolean);
                            const display = nameParts.length ? nameParts.join(' ') : (a?.email ?? `#${a?.id ?? ''}`);
                            return `Auteur ${display} • ${formattedDate}`;
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
