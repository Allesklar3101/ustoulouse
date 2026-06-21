# US Toulouse — Dossier de livraison
**Date :** juin 2025

---

## Contenu du dossier

| Fichier | Page |
|---|---|
| `index.html` | Page d'accueil |
| `club.html` | Le Club |
| `football.html` | Football |
| `randonnee.html` | Randonnée |
| `padel.html` | Padel |
| `actualites.html` | Actualités (grille + filtres) |
| `article.html` | Template article (WordPress) |
| `boutique.html` | Boutique |
| `contact.html` | Contact |
| `partenaires.html` | Partenaires |
| `espace-membre.html` | Espace membre (login + dashboard) |
| `mentions-legales.html` | Mentions légales |
| `cookies.html` | Politique de cookies |
| `navigation-complete.html` | **Fichier de prévisualisation** — toutes les pages navigables dans un seul fichier |

---

## Comment modifier les pages

Chaque fichier HTML est **autonome et autosuffisant** : il contient tout le CSS, tout le JS et toutes les images (en base64 dans le HTML). Aucune dépendance externe n'est nécessaire, sauf les polices Google et les icônes Tabler chargées en CDN.

### Faire des retours à Claude

Deux façons de travailler :

**Option A — Via `navigation-complete.html` (recommandé pour la révision)**
1. Ouvre `navigation-complete.html` dans ton navigateur
2. Navigue entre les pages avec les liens et boutons du site
3. Note les modifications page par page (ex : "page Football, section Équipes : changer le titre")
4. Envoie tes notes à Claude

**Option B — Modifier directement le HTML et renvoyer à Claude**
1. Ouvre le fichier concerné dans un éditeur de texte (VS Code recommandé)
2. Fais tes modifications
3. Renvoie le fichier modifié à Claude en précisant ce que tu as changé
4. Claude propagera les modifications (menu, footer, etc.) sur toutes les pages

---

## Ce qui est global (partagé entre toutes les pages)

Ces éléments sont **identiques sur toutes les pages**. Si tu veux modifier l'un d'eux, Claude le répercutera partout automatiquement :

- **Menu** : barre + overlay plein écran (burger), avec tous les liens de navigation
- **Footer** : logo, description, réseaux sociaux, colonnes liens, mentions légales / cookies

### Liens internes (chemins utilisés dans le menu et le footer)

| Chemin | Page |
|---|---|
| `/` | Accueil |
| `/association-sportive` | Le Club |
| `/football` | Football |
| `/randonnee` | Randonnée |
| `/padel` | Padel |
| `/actualites` | Actualités |
| `/article` | Article |
| `/partenaires` | Partenaires |
| `/boutique` | Boutique |
| `/contact` | Contact |
| `/espace-membre` | Espace membre |
| `/mentions-legales` | Mentions légales |
| `/cookies` | Politique de cookies |

---

## À compléter dans les mentions légales et cookies

Les champs entre `[crochets]` dans `mentions-legales.html` et `cookies.html` sont à remplir :
- Adresse du siège social
- Numéro SIRET
- Nom du président / responsable éditorial
- Nom et adresse de l'hébergeur
- Outil de statistiques (Matomo ou Google Analytics)

---

## Stack technique

- HTML5 / CSS3 / JS vanilla (aucun framework)
- Polices : **Poppins** via Google Fonts
- Icônes : **Tabler Icons** via CDN
- Images : base64 embarquées dans le HTML
- Variables CSS : `--bleu:#064e89` · `--bleu-clair:#2ea3f2` · `--brun:#8b664b` · `--brun-clair:#b8936a`
