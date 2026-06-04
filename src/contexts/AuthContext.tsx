import { createContext, useContext, useMemo, useState, type ReactNode } from "react"
import type { User } from "../models/users"
import { getCurrentUser, login as apiLogin, logout as apiLogout, register as apiRegister } from "../api/client"

interface LoginData {
    email: string
    password: string
}

interface RegisterData {
    first_name: string
    last_name: string
    email: string
    password: string
    password_confirm: string
}

interface AuthContextValue {
    user: User | null
    isAuthenticated: boolean
    login: (data: LoginData) => Promise<void>
    register: (data: RegisterData) => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(() => getCurrentUser())

    const login = async (data: LoginData) => {
        const response = await apiLogin(data)
        setUser(response.user)
    }

    const register = async (data: RegisterData) => {
        const response = await apiRegister(data)
        setUser(response.user)
    }

    const logout = async () => {
        await apiLogout()
        setUser(null)
    }

    const value = useMemo(
        () => ({
            user,
            isAuthenticated: Boolean(user),
            login,
            register,
            logout,
        }),
        [user],
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
