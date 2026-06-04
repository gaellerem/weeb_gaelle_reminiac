import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

function PrivateRoute({ children }: { children: React.ReactNode }) {
    const { user } = useAuth()
    return user ? <>{children}</> : <Navigate to="/login" replace />
}

export default PrivateRoute