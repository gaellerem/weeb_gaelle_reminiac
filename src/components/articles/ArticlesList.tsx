import type { Article } from "../../models/articles";
import ArticleCard from "./ArticleCard";

interface ArticlesListProps {
    articles: Article[];
}

function ArticlesList({ articles }: ArticlesListProps) {
    if ( !articles || articles.length === 0 ) {
        return <p className="text-center text-white/60">Aucun article trouvé.</p>;
    }

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-32">
                {articles.map(article => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>
        </div>
    );
}

export default ArticlesList;