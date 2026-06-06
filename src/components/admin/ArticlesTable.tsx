import { useNavigate } from "react-router-dom"
import type { Article } from "../../models/articles"

interface ArticlesTableProps {
    articles: Article[]
    onDelete: (article: Article) => void
}

export default function ArticlesTable({
    articles,
    onDelete,
}: ArticlesTableProps) {
    const navigate = useNavigate()

    if (articles.length === 0) {
        return (
            <p className="text-white/60">
                Aucun article.
            </p>
        )
    }
    return (
        <div className="admin-table-div">
            <table className="admin-table">
                <thead className="admin-table-head">
                    <tr>
                        <th className="admin-table-th">Titre</th>
                        <th className="admin-table-th">Auteur</th>
                        <th className="admin-table-th">Date</th>
                        <th className="admin-table-th text-right">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {articles.map((article) => (
                        <tr
                            key={article.slug}
                            className="admin-table-row"
                        >
                            <td className="admin-table-td font-medium">
                                {article.title}
                            </td>

                            <td className="admin-table-td">
                                {article.author.first_name}{" "}
                                {article.author.last_name}
                            </td>

                            <td className="admin-table-td">
                                {new Date(
                                    article.created_at
                                ).toLocaleDateString("fr-FR")}
                            </td>

                            <td className="admin-table-td text-sm">
                                <div className="flex justify-end gap-12">
                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/blog/${article.slug}/edit`
                                            )
                                        }
                                        className="admin-btn btn-amber"
                                    >
                                        Modifier
                                    </button>

                                    <button
                                        onClick={() =>
                                            onDelete(article)
                                        }
                                        className="admin-btn btn-red"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}