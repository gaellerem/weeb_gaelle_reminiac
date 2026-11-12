import axios, { type AxiosResponse } from "axios";
import type { Article } from "../models/articles";
import type { User } from "../models/users";

// Instance publique — pas de token (articles en lecture, login, register)
export const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    withCredentials: true,
    headers: { "Content-Type": "application/json" }
})

// Instance privée — token JWT automatique (actions authentifiées)
export const privateApi = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    withCredentials: true,
    headers: { "Content-Type": "application/json" }
})


privateApi.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("access");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

privateApi.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;
        if (!error.response) {
            return Promise.reject({ type: "network", message: "Erreur réseau. Veuillez vérifier votre connexion." });
        }

        // Si la requête de refresh échoue, rediriger vers la page de login
        if (originalRequest?.url && originalRequest.url.includes("users/token/refresh")) {
            sessionStorage.removeItem("access");
            window.location.href = "/login";
            return Promise.reject({ type: "auth", message: "Session expirée. Veuillez vous reconnecter." });
        }

        if (error.response.status === 401 && originalRequest && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshResponse = await api.post("users/token/refresh/", {}, { withCredentials: true });
                sessionStorage.setItem("access", refreshResponse.data.access);
                originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.access}`;
                return api(originalRequest);
            } catch (err) {
                sessionStorage.removeItem("access");
                window.location.href = "/login";
                return Promise.reject({ type: "auth", message: "Session expirée. Veuillez vous reconnecter." });
            }
        }

        return Promise.reject(error);
    }
);

class ApiError extends Error {
    status: number
    data: any

    constructor(status: number, data: any, message: string) {
        super(message)
        this.status = status
        this.data = data
    }
}

const handleRequest = async <T>(promise: Promise<AxiosResponse<T>>): Promise<T> => {
    try {
        const response = await promise;
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new ApiError(error.response.status, error.response.data, error.response.data.message || "Une erreur est survenue.");
        }
        throw new ApiError(0, null, "Erreur réseau. Veuillez vérifier votre connexion.");
    }
};

export const getCurrentUser = (): User | null => {
    const stored = sessionStorage.getItem("user");
    if (!stored) return null;
    try {
        return JSON.parse(stored) as User;
    } catch {
        sessionStorage.removeItem("user");
        return null;
    }
};


// ===== Auth =====
export interface UserResponse {
    message: string;
    user: User;
    access: string;
}

export interface TwoFactorChallengeResponse {
    requires_2fa: true;
    two_factor_token: string;
    user: User;
}

export interface TwoFactorSetupResponse {
    message: string;
    secret: string;
    provisioning_uri: string;
}

export interface TwoFactorActionResponse {
    message: string;
    user: User;
}

export interface RegisterData {
    first_name: string
    last_name: string
    email: string
    password: string
    password_confirm: string
}

export interface LoginData {
    email: string
    password: string
}

export const register = async (data: RegisterData) => {
    try {
        return await handleRequest<UserResponse>(api.post("users/register/", data));
    } catch (error: any) {
        throw new Error(error.data?.message || "Une erreur est survenue lors de l'inscription.");
    }
};

export const login = async (
    data: LoginData
): Promise<UserResponse | TwoFactorChallengeResponse> => {
    try {
        const response = await handleRequest<UserResponse | TwoFactorChallengeResponse>(
            api.post("users/login/", data)
        );

        if (!("access" in response)) {
            sessionStorage.removeItem("access");
            sessionStorage.removeItem("user");
            return response;
        }

        sessionStorage.setItem("access", response.access);
        sessionStorage.setItem("user", JSON.stringify(response.user));

        return response;
    } catch (error: any) {
        throw new Error(error.data?.message || "Email ou mot de passe incorrect.");
    }
};

export const verifyTwoFactorLogin = (
    twoFactorToken: string,
    code: string
) =>
    handleRequest<UserResponse>(
        api.post("users/2fa/verify-login/", {
            two_factor_token: twoFactorToken,
            code,
        })
    );

export const setupTwoFactor = () =>
    handleRequest<TwoFactorSetupResponse>(
        privateApi.post("users/2fa/setup/")
    );

export const confirmTwoFactor = (code: string) =>
    handleRequest<TwoFactorActionResponse>(
        privateApi.post("users/2fa/confirm/", { code })
    );

export const disableTwoFactor = (code: string) =>
    handleRequest<TwoFactorActionResponse>(
        privateApi.post("users/2fa/disable/", { code })
    );

export const logout = async () => {
    const response = await handleRequest(api.post("users/logout/", {}));
    sessionStorage.removeItem("access");
    sessionStorage.removeItem("user");
    return response;
};

export const requestPasswordReset = async (email: string) => {
    try {
        return await handleRequest(api.post("users/password-reset/request/", { email }))
    } catch (error: any) {
        throw new Error(error.data?.message || "Une erreur est survenue.")
    }
}

export const confirmPasswordReset = async (data: {
    uidb64: string
    token: string
    password: string
}) => {
    try {
        return await handleRequest(api.post("users/password-reset/confirm/", data))
    } catch (error: any) {
        throw new Error(error.data?.message || "Lien invalide ou expiré.")
    }
}

// ===== Articles =====
export const getArticles = () => handleRequest<Article[]>(api.get("articles/"));

export const getArticleBySlug = (slug: string) => handleRequest<Article>(api.get(`articles/${slug}/`));

export const createArticle = (data: { title: string; content: string }) => handleRequest<Article>(privateApi.post("articles/", data));

export const updateArticle = (slug: string, data: { title: string; content: string }) =>
    handleRequest<Article>(privateApi.patch(`articles/${slug}/`, data))
export const deleteArticle = (slug: string) =>
    handleRequest(privateApi.delete(`articles/${slug}/`))


// ===== Contact =====
export interface ContactData {
    first_name: string
    last_name: string
    email: string
    subject: string
    message: string
}

export const sendContact = async (data: ContactData) => {
    try {
        return await handleRequest(api.post("contact/", data))
    } catch (error: any) {
        const firstError = Object.values(error.data ?? {})?.[0]
        throw new Error(
            Array.isArray(firstError) ? firstError[0] : error.message
        )
    }
}

// ===== Admin =====
export const getUsers = () =>
    handleRequest<User[]>(
        privateApi.get("api/admin/users/")
    )

export const updateUser = (
    id: string,
    data: {
        is_active?: boolean
        is_staff?: boolean
        first_name?: string
        last_name?: string
    }
) =>
    handleRequest<User>(
        privateApi.patch(`api/admin/users/${id}/`, data)
    )