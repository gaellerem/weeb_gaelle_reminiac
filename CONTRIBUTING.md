# Contributing

## Branches

Les branches suivent la convention `type/description-courte` :

| Type | Usage |
|------|-------|
| `feat/` | Nouvelle fonctionnalité |
| `fix/` | Correction de bug |
| `chore/` | Maintenance, dépendances, config |
| `refactor/` | Refactorisation sans changement de comportement |
| `docs/` | Documentation uniquement |

Exemples :
```
feat/user-dashboard
fix/toast-not-showing
chore/update-dependencies
docs/readme
```

## Commits

Format : `type: description courte en français`

```
feat(usage): ajout de la page dashboard
fix(usage): correction du toast après navigation
chore: mise à jour de tailwind
```

Un commit = une intention. Évite les commits fourre-tout.

## Pull Requests

### Titre

Même format que les commits : `type: description courte`

```
feat(usage): blog platform with authentication and user features
fix(usage): owner buttons visible to all users
```

### Description

Chaque PR doit contenir :

- **Description** — ce que fait la PR et pourquoi
- **Changes** — liste des fichiers créés ou modifiés avec leur rôle
- **Tests** — ce qui a été vérifié manuellement
- **Notes** — limitations connues, décisions techniques, ce qui reste à faire

### Règles

- Une PR = une fonctionnalité ou une correction
- Toujours partir d'une branche à jour avec `develop`
- Les PRs de features mergent dans `develop`
- `develop` merge dans `main` pour les releases

## Structure des fichiers

```
src/
├── api/          # Endpoints et instances Axios
├── components/   # Composants réutilisables
├── contexts/     # Contextes React (auth, etc.)
├── hooks/        # Hooks utilitaires
├── models/       # Interfaces TypeScript
└── pages/        # Pages associées aux routes
```

Les composants spécifiques à une entité vont dans un sous-dossier :
`components/articles/`, `components/home/`, `components/footer/`

## Conventions de code

- **TypeScript strict** — pas de `any` sauf cas justifié
- **Pas de `console.log`** en production — utilise les toasts pour le feedback utilisateur
- **Toasts** pour tous les retours utilisateur (succès, erreur), jamais `alert()`
- **`PrivateRoute`** pour toute route nécessitant une authentification
- **`api`** pour les requêtes publiques, **`privateApi`** pour les requêtes authentifiées
- Les endpoints et leur gestion d'erreur restent dans `src/api/client.ts`