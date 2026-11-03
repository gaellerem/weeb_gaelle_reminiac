# weeb — Blog Platform

Plateforme blog full-stack avec authentification JWT, gestion des articles et formulaire de contact.

## Stack

- **Frontend** : React + TypeScript + Vite + Tailwind CSS v4
- **Routing** : React Router
- **HTTP** : Axios (double instance public/privée)
- **UI** : Base UI (tabs, toasts, dialogs)
- **Backend** : Django REST Framework (repo séparé)

## Fonctionnalités

### Articles

- Consultation publique des articles
- Création d'article (utilisateur connecté)
- Modification de ses propres articles
- Suppression de ses propres articles
- Gestion complète des articles pour les administrateurs

### Authentification

- Inscription
- Connexion JWT
- Refresh automatique du token
- Validation manuelle des comptes par un administrateur

### Contact

- Envoi de messages via formulaire de contact

### Administration

- Gestion des utilisateurs
- Validation des comptes
- Désactivation des comptes
- Gestion globale des articles

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
│   ├── admin/             # ArticlesTable, UsersTable
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

Lors de l'inscription, les comptes sont créés avec `is_active=false`.

Un administrateur doit valider le compte avant que l'utilisateur puisse se connecter.

Si un utilisateur tente de se connecter avant validation, un message explicite lui est affiché.

## Routes

| Path | Accès | Description |
|------|-------|-------------|
| `/` | Public | Page d'accueil |
| `/blog` | Public | Liste des articles |
| `/blog/:slug` | Public | Détail d'un article |
| `/blog/new` | Connecté | Créer un article |
| `/blog/:slug/edit` | Propriétaire ou admin | Modifier un article |
| `/contact` | Public | Formulaire de contact |
| `/login` | Public | Connexion |
| `/register` | Public | Inscription |
| `/forgot-password` | Public | Demande de reset password |
| `/reset-password` | Public | Réinitialisation du mot de passe |
| `/dashboard` | Connecté / Admin | Dashboard utilisateur / Administration |

## Administration

Les utilisateurs avec `is_staff=true` disposent d'un mode administration accessible depuis le dashboard.

Fonctionnalités :

### Gestion des utilisateurs

- Liste complète des utilisateurs
- Affichage du statut :
  - Validé
  - En attente
- Activation d'un compte
- Désactivation d'un compte

### Gestion des articles

- Liste complète des articles
- Modification de n'importe quel article
- Suppression de n'importe quel article
- Confirmation avant suppression

## Gestion des erreurs

L'application centralise la gestion des erreurs via Axios et des notifications Toast.

Exemples :

- Session expirée
- Identifiants invalides
- Compte en attente de validation
- Erreurs réseau
- Erreurs de création/modification/suppression

## Backend

Le backend Django REST Framework est maintenu dans un dépôt séparé.

Il expose :

- Authentification JWT
- Gestion des utilisateurs
- Gestion des articles
- Administration
- Contact
- Réinitialisation de mot de passe

Le frontend communique exclusivement via l'API REST.