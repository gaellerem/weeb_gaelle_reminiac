import axios from "axios";
import type { Article } from "../models/articles";

interface CreateArticlePayload {
    title: string;
    content: string;
    slug: string;
}

export const api = axios.create({
    baseURL: "http://localhost:8000/",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.response.use(
    response => response,
    error => {
        if (!error.response) {
            return Promise.reject({ type: "network", message: "Impossible de joindre le serveur." });
        }

        const { status, data } = error.response;

        if (status >= 500) {
            return Promise.reject({ type: "server", message: "Erreur serveur." });
        }

        if (status === 400) {
            return Promise.reject({ type: "validation", errors: data });
        }

        if (status === 404) {
            return Promise.reject({ type: "not_found", message: "Ressource non trouvée." });
        }

        // Autres erreurs
        return Promise.reject({ type: "other", message: data?.detail || "Erreur inconnue." });
    }
);

const handleRequest = async <T>(promise: Promise<any>): Promise<T> => {
    const response = await promise;
    return response.data;
};

export const getArticles = (params?: { category_id?: number }) => handleRequest<Article[]>(api.get("articles/", { params }));

export const getArticle = (id: number) => handleRequest<Article>(api.get(`articles/${id}/`));

export const createArticle = (payload: CreateArticlePayload) => handleRequest<Article>(api.post("articles/", payload));

export const updateArticle = (id: number, payload: Partial<CreateArticlePayload>) => handleRequest<Article>(api.patch(`articles/${id}/`, payload));

export const deleteArticle = (id: number) => handleRequest<void>(api.delete(`articles/${id}/`));