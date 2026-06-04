import axios, { type AxiosResponse } from "axios";
import type { Article } from "../models/articles";
import type { User } from "../models/users";

export const api = axios.create({
    baseURL: "http://localhost:8000/",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    },
});


// api.interceptors.request.use(
//     (config) => {
//         const token = sessionStorage.getItem("access");
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     }
// );

// api.interceptors.response.use(
//     response => response,
//     async (error) => {
//         const originalRequest = error.config;
//         if (!error.response) {
//             return Promise.reject({ type: "network", message: "Erreur réseau. Veuillez vérifier votre connexion." });
//         }

//         // Si la requête de refresh échoue, rediriger vers la page de login
//         if (originalRequest?.url && originalRequest.url.includes("users/token/refresh")) {
//             sessionStorage.removeItem("access");
//             window.location.href = "/login";
//             return Promise.reject({ type: "auth", message: "Session expirée. Veuillez vous reconnecter." });
//         }

//         if (error.response.status === 401 && originalRequest && !originalRequest._retry) {
//             originalRequest._retry = true;
//             try {
//                 const refreshResponse = await api.post("users/token/refresh/", {}, { withCredentials: true });
//                 sessionStorage.setItem("access", refreshResponse.data.access);
//                 originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.access}`;
//                 return api(originalRequest);
//             } catch (err) {
//                 sessionStorage.removeItem("access");
//                 window.location.href = "/login";
//                 return Promise.reject({ type: "auth", message: "Session expirée. Veuillez vous reconnecter." });
//             }
//         }

//         return Promise.reject(error);
//     }
// );

const handleRequest = async <T>(promise: Promise<AxiosResponse<T>>): Promise<T> => {
    const response = await promise;
    return response.data;
};

// ===== Auth =====
export interface UserResponse {
    message: string;
    user: User;
    access: string;
}

export const register = async (data: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirm: string;
}) => {
    const response = await handleRequest<UserResponse>(api.post("users/register/", data));
    sessionStorage.setItem("access", response.access);
    return response;
};

export const login = async (data: {
    email: string;
    password: string;
}) => {
    const response = await handleRequest<UserResponse>(api.post("users/login/", data));
    sessionStorage.setItem("access", response.access);
    return response;
};

export const logout = async () => {
    const response = await handleRequest(api.post("users/logout/", {}));
    sessionStorage.removeItem("access");
    return response;
};

// ===== Articles =====
export const getArticles = (params?: { category_id?: number }) => handleRequest<Article[]>(api.get("articles/", { params }));

export const getArticle = (id: number) => handleRequest<Article>(api.get(`articles/${id}/`));