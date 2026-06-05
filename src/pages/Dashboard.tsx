import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Tabs } from '@base-ui/react/tabs'
import { useAuth } from "../contexts/AuthContext"
import { useToast } from "../hooks/useToast"
import { getArticles, getUsers, updateUser, deleteArticle } from "../api/client"
import type { User } from "../models/users"
import type { Article } from "../models/articles"
import PageLayout from "./PageLayout"
import ArticleCard from "../components/articles/ArticleCard"
import UsersTable from "../components/admin/UsersTable"
import ArticlesTable from "../components/admin/ArticlesTable"
import ConfirmDialog from "../components/ConfirmDialog"

export default function Dashboard() {
    const { user } = useAuth()
    const toast = useToast()
    const navigate = useNavigate()

    const [articles, setArticles] = useState<Article[]>([])
    const [loadingArticles, setLoadingArticles] = useState(true)
    const [adminMode, setAdminMode] = useState(false)
    const [users, setUsers] = useState<User[]>([])
    const [loadingUsers, setLoadingUsers] = useState(false)
    const [allArticles, setAllArticles] = useState<Article[]>([])
    const [loadingAdminArticles, setLoadingAdminArticles] = useState(false)
    const [adminLoaded, setAdminLoaded] = useState(false)
    const [articleToDelete, setArticleToDelete] = useState<Article | null>(null)
    const [deleteOpen, setDeleteOpen] = useState(false)

    const fetchMyArticles = useCallback(async () => {
        setLoadingArticles(true)
        try {
            const all = await getArticles()
            setArticles(all.filter(a => a.author.id === user?.id))
        } catch {
            toast.error("Erreur lors du chargement des articles.")
        } finally {
            setLoadingArticles(false)
        }
    }, [user])

    const fetchUsers = useCallback(async () => {
        if (!user?.is_staff) return

        setLoadingUsers(true)

        try {
            const data = await getUsers()
            setUsers(data)
        } catch {
            toast.error("Erreur lors du chargement des utilisateurs.")
        } finally {
            setLoadingUsers(false)
        }
    }, [user])

    const fetchAllArticles = useCallback(async () => {
        if (!user?.is_staff) return

        setLoadingAdminArticles(true)

        try {
            const data = await getArticles()
            setAllArticles(data)
        } catch {
            toast.error("Erreur lors du chargement des articles.")
        } finally {
            setLoadingAdminArticles(false)
        }
    }, [user])

    useEffect(() => {
        fetchMyArticles()
    }, [fetchMyArticles])

    useEffect(() => {
        if (!adminMode || !user?.is_staff || adminLoaded) {
            return
        }

        fetchUsers()
        fetchAllArticles()
        setAdminLoaded(true)
    }, [
        adminMode,
        user,
        adminLoaded,
        fetchUsers,
        fetchAllArticles
    ])

    const handleToggleUser = async (
        targetUser: User
    ) => {
        try {
            await updateUser(targetUser.id, {
                is_active: !targetUser.is_active,
            })

            toast.success(
                targetUser.is_active
                    ? "Utilisateur désactivé."
                    : "Utilisateur validé."
            )

            fetchUsers()
        } catch (error: any) {
            toast.error(
                error.message ??
                "Impossible de modifier l'utilisateur."
            )
        }
    }

    const handleDeleteArticle = async () => {
        if (!articleToDelete) return
        try {
            await deleteArticle(articleToDelete.slug)

            toast.success("Article supprimé.")

            setAllArticles(prev =>
                prev.filter(a => a.slug !== articleToDelete.slug)
            )
            setDeleteOpen(false)
            setArticleToDelete(null)
        } catch (error: any) {
            toast.error(
                error.message ??
                "Impossible de supprimer l'article."
            )
        }
    }

    return (
        <PageLayout>
            <section className="flex flex-col gap-48 max-w-6xl mx-auto w-full">
                <div className="flex items-center justify-between">
                    <h1 className="text-4xl font-extrabold">
                        {adminMode ? "Administration" : "Mon profil"}
                    </h1>

                    {user?.is_staff && (
                        <div className="flex rounded-3xl border border-secondary">
                            <button
                                onClick={() => setAdminMode(false)}
                                className={`toggle ${!adminMode ? "bg-secondary": "text-secondary hover:text-white transition"}`}
                            >
                                Profil
                            </button>
                            <button
                                onClick={() => setAdminMode(true)}
                                className={`toggle ${adminMode ? "bg-secondary": "text-secondary hover:text-white transition"}`}
                            >
                                Administration
                            </button>
                        </div>
                    )}
                </div>
                {/* Mode profil */}
                {!adminMode && (
                    <div className={`flex flex-col lg:flex-row gap-48 items-start`}>
                    {/* Colonne gauche — Profil */}
                    <div className="flex flex-col gap-16 lg:w-72 shrink-0">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-32 flex flex-col gap-16">
                            <div className="flex flex-col gap-8">
                                <span className="text-white/50 text-sm">Nom</span>
                                <span className="font-semibold">
                                    {user?.first_name} {user?.last_name}
                                </span>
                            </div>
                            <div className="flex flex-col gap-8">
                                <span className="text-white/50 text-sm">Email</span>
                                <span className="font-semibold">{user?.email}</span>
                            </div>
                        </div>
                    </div>
                    <div className="hidden lg:block w-px bg-white/10 self-stretch" />
                    {/* Colonne droite — Articles */}
                    <div className="flex flex-col gap-24 flex-1">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-extrabold">Mes articles</h2>
                            <button
                                onClick={() => navigate("/blog/new")}
                                className="secondary_button py-2 px-5"
                            >
                                Nouvel article
                            </button>
                        </div>
                        {loadingArticles ? (
                            <p>Chargement des articles...</p>
                        ) : articles.length === 0 ? (
                            <p className="text-white/60">Vous n'avez pas encore écrit d'article.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
                                {articles.map(article => (
                                    <ArticleCard key={article.slug} article={article} withContent={false}/>
                                ))}
                            </div>
                        )}
                    </div>

                    </div>
                )}
                {/* Mode administration */}
                {adminMode && (
                    <Tabs.Root
                        defaultValue="users"
                        className="admin-tabs"
                    >
                        <Tabs.List className="admin-tabs-list">
                            <Tabs.Tab
                                value="users"
                                className="admin-tab"
                            >
                                Utilisateurs
                            </Tabs.Tab>

                            <Tabs.Tab
                                value="articles"
                                className="admin-tab"
                            >
                                Articles
                            </Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel
                            value="users"
                            className="mt-5"
                        >
                            {loadingUsers ? (
                                <div className="flex justify-center py-12">
                                    <p className="text-white/60">
                                        Chargement des utilisateurs...
                                    </p>
                                </div>
                            ) : (
                                <UsersTable
                                    users={users}
                                    onToggleActive={handleToggleUser}
                                />
                            )}
                        </Tabs.Panel>

                        <Tabs.Panel
                            value="articles"
                            className="mt-5"
                        >
                            {loadingAdminArticles ? (
                                <div className="flex justify-center py-12">
                                    <p className="text-white/60">
                                        Chargement des articles...
                                    </p>
                                </div>
                            ) : (
                                <ArticlesTable
                                    articles={allArticles}
                                    onDelete={(article) => {
                                        setArticleToDelete(article)
                                        setDeleteOpen(true)
                                    }}
                                />
                            )}
                        </Tabs.Panel>
                    </Tabs.Root>
                )}
                <ConfirmDialog
                    open={deleteOpen}
                    onClose={() => setDeleteOpen(false)}
                    onConfirm={handleDeleteArticle}
                    title="Supprimer l'article"
                    description="Cette action est irréversible. L'article sera définitivement supprimé."
                    confirmLabel="Supprimer"
                    danger
                />
            </section>
        </PageLayout>
    )
}