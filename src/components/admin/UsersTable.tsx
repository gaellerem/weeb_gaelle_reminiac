import type { User } from "../../models/users"

interface UsersTableProps {
    users: User[]
    onToggleActive: (user: User) => void
}

export default function UsersTable({
    users,
    onToggleActive,
}: UsersTableProps) {
    if (users.length === 0) {
        return (
            <p className="text-white/60">
                Aucun utilisateur.
            </p>
        )
    }
    return (
        <div className="admin-table-div">
            <table className="admin-table">
                <thead className="admin-table-head">
                    <tr>
                        <th className="admin-table-th">Statut</th>
                        <th className="admin-table-th">Nom</th>
                        <th className="admin-table-th">Email</th>
                        <th className="admin-table-th">Rôle</th>
                        <th className="admin-table-th">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => (
                        <tr
                            key={user.id}
                            className="admin-table-row"
                        >
                            <td className="admin-table-td">
                                <span
                                    className={`admin-badge ${
                                        user.is_active
                                            ? "admin-badge-active"
                                            : "admin-badge-pending"
                                    }`}
                                >
                                    {user.is_active
                                        ? "Validé"
                                        : "En attente"}
                                </span>
                            </td>

                            <td className="admin-table-td">
                                {user.first_name} {user.last_name}
                            </td>

                            <td className="admin-table-td">
                                {user.email}
                            </td>

                            <td className="admin-table-td">
                                {user.is_staff ? (
                                    "Admin"
                                ) : (
                                    "Utilisateur"
                                )}
                            </td>

                            <td className="admin-table-td">
                                <div className="flex justify-end">
                                    {user.is_active ? (
                                        <button
                                            onClick={() =>
                                                onToggleActive(user)
                                            }
                                            className="admin-btn btn-red w-full"
                                        >
                                            Désactiver
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() =>
                                                onToggleActive(user)
                                            }
                                            className="admin-btn btn-green w-full"
                                        >
                                            Valider
                                        </button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}