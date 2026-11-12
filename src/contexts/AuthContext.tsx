import { createContext, useContext, useMemo, useState, type ReactNode } from "react"
import type { User } from "../models/users"
import {
    getCurrentUser,
    login as apiLogin,
    logout as apiLogout,
    register as apiRegister,
    verifyTwoFactorLogin as apiVerifyTwoFactorLogin,
    type LoginData,
    type RegisterData,
    type TwoFactorChallengeResponse,
} from "../api/client"

interface AuthContextValue {
    user: User | null
    isAuthenticated: boolean
    login: (data: LoginData) => Promise<TwoFactorChallengeResponse | null>
    verifyTwoFactorLogin: (twoFactorToken: string, code: string) => Promise<void>
    updateUser: (user: User) => void
    register: (data: RegisterData) => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(() => getCurrentUser())

    const login = async (data: LoginData) => {
        const response = await apiLogin(data);
        if ("requires_2fa" in response && response.requires_2fa) {
            return response;
        }
        setUser(response.user);
        return null;
    };

    const verifyTwoFactorLogin = async (twoFactorToken: string, code: string) => {
        const response = await apiVerifyTwoFactorLogin(twoFactorToken, code);
        sessionStorage.setItem("access", response.access);
        updateUser(response.user);
    };

    const updateUser = (updatedUser: User) => {
        sessionStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
    };

    const register = async (data: RegisterData) => {
        await apiRegister(data)
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
            verifyTwoFactorLogin,
            updateUser,
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
