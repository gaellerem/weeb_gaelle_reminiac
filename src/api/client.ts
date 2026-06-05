import axios, { type AxiosResponse } from "axios";
import type { Article } from "../models/articles";
import type { User } from "../models/users";

// Instance publique — pas de token (articles en lecture, login, register)
export const api = axios.create({
    baseURL: "http://localhost:8000/",
    withCredentials: true,
    headers: { "Content-Type": "application/json" }
})

// Instance privée — token JWT automatique (actions authentifiées)
export const privateApi = axios.create({
    baseURL: "http://localhost:8000/",
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

export const login = async (data: LoginData) => {
    try {
        const response = await handleRequest<UserResponse>(
            api.post("users/login/", data)
        );

        sessionStorage.setItem("access", response.access);
        sessionStorage.setItem("user", JSON.stringify(response.user));

        return response;
    } catch (error: any) {
        throw new Error(error.data?.message || "Email ou mot de passe incorrect.");
    }
};

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