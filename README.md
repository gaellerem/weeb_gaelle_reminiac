# weeb — Blog Platform

Plateforme blog full-stack avec authentification JWT, gestion des articles et formulaire de contact.

## Stack

- **Frontend** : React + TypeScript + Vite + Tailwind CSS v4
- **Routing** : React Router v7
- **HTTP** : Axios (double instance public/privée)
- **UI** : Base UI (toasts, dialogs)
- **Backend** : Django REST Framework (repo séparé)

## Prérequis

- Node.js >= 18
- Le backend Django lancé sur `http://localhost:8000`

## Installation

```bash
git clone <url-du-repo>
cd weeb
npm install
```

## Lancement

```bash
npm run dev
```

L'application est accessible sur `http://localhost:5173`.

## Structure

```
src/
├── api/
│   └── client.ts          # Instances Axios, endpoints, gestion des erreurs
├── components/
│   ├── articles/          # ArticleCard, ArticleForm, ArticlesList
│   ├── home/              # Sections de la page d'accueil
│   ├── footer/            # Footer
│   ├── ConfirmDialog.tsx  # Dialog de confirmation réutilisable
│   ├── ContactForm.tsx    # Formulaire de contact
│   ├── Navbar.tsx         # Navbar responsive avec état auth
│   ├── PrivateRoute.tsx   # Protection des routes authentifiées
│   └── ToastProvider.tsx  # Système de toasts (Base UI)
├── contexts/
│   └── AuthContext.tsx    # État utilisateur global
├── hooks/
│   └── useToast.ts        # Hook utilitaire pour les toasts
├── models/
│   ├── articles.ts        # Interface Article
│   └── users.ts           # Interface User
└── pages/
    ├── Blog.tsx            # Liste des articles
    ├── BlogDetail.tsx      # Détail d'un article
    ├── BlogForm.tsx        # Création / édition d'un article
    ├── Contact.tsx         # Page contact
    ├── Dashboard.tsx       # Dashboard utilisateur
    ├── ForgotPassword.tsx  # Demande de reset password
    ├── Home.tsx            # Page d'accueil
    ├── Login.tsx           # Connexion
    ├── PageLayout.tsx      # Layout commun (Navbar + Footer)
    ├── Register.tsx        # Inscription
    └── ResetPassword.tsx   # Réinitialisation du mot de passe
```

## Authentification

L'authentification repose sur des JWT stockés en `sessionStorage`. Deux instances Axios coexistent :

- `api` — requêtes publiques (lecture articles, login, register, contact)
- `privateApi` — requêtes authentifiées avec token Bearer + refresh automatique

## Routes

| Path | Accès | Description |
|------|-------|-------------|
| `/` | Public | Page d'accueil |
| `/blog` | Public | Liste des articles |
| `/blog/:slug` | Public | Détail d'un article |
| `/blog/new` | Connecté | Créer un article |
| `/blog/:slug/edit` | Propriétaire | Modifier un article |
| `/contact` | Public | Formulaire de contact |
| `/login` | Public | Connexion |
| `/register` | Public | Inscription |
| `/forgot-password` | Public | Demande de reset password |
| `/reset-password` | Public | Réinitialisation du mot de passe |
| `/dashboard` | Connecté | Dashboard utilisateur |