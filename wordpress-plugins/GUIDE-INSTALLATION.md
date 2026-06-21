# Plugins US Toulouse — Guide d'installation

Deux plugins WordPress développés sur mesure pour le club :

1. **UST Classements** — gestion manuelle des classements sportifs (autonome)
2. **UST Paiements** — paiements Stripe via WooCommerce (cotisations, dons, boutique)

---

## 1. UST Classements

### Installation
1. Compresser le dossier `ust-classements/` en `.zip` (ou copier le dossier dans `wp-content/plugins/`)
2. WordPress → Extensions → Ajouter → Téléverser → choisir le zip → Installer → Activer
3. Un menu **« Classements »** apparaît dans l'administration

### Utilisation
1. **Créer une compétition** : menu Classements → renseigner nom (ex : « Départemental 2 — Poule A »), saison, sport → Créer
2. **Saisir le classement** : cliquer sur « Gérer » → ajouter les équipes ligne par ligne
   - Saisir Victoires / Nuls / Défaites : **les matchs joués et les points (V×3 + N) sont calculés automatiquement**
   - Possibilité de forcer un total de points (cases retraits/bonus)
   - Cocher **« UST »** pour mettre votre équipe en surbrillance bleue
3. **Afficher** sur n'importe quelle page/article :
   ```
   [ust_classement id="1"]
   ```
   (l'ID est indiqué dans la liste des compétitions)
   - Ou via le bloc Gutenberg **« UST Classement »**

### Aucune dépendance — fonctionne seul.

---

## 2. UST Paiements (Stripe + WooCommerce)

### Pré-requis (à installer AVANT)
1. **WooCommerce** (Extensions → Ajouter → rechercher « WooCommerce » → Installer → Activer → suivre l'assistant)
2. **WooCommerce Stripe Payment Gateway** (extension officielle, même procédure)
3. Renseigner vos **clés API Stripe** : WooCommerce → Réglages → Paiements → Stripe
   - Clé publiable + clé secrète (depuis votre dashboard Stripe)
   - Configurer le **webhook** Stripe (URL fournie dans les réglages Stripe) pour la confirmation des paiements

### Installation du plugin
1. Compresser `ust-paiements/` en `.zip` (ou copier dans `wp-content/plugins/`)
2. Téléverser et activer comme ci-dessus
3. Un menu **« UST Paiements »** apparaît — il affiche l'état de Stripe et les raccourcis

> Le plugin crée automatiquement les catégories produit **« Cotisations »** et **« Dons »**.

### A. Boutique
Standard WooCommerce. Créer les produits (taille, stock, photos). Payables par Stripe automatiquement.
La page `boutique.html` du site est remplacée par la page Boutique de WooCommerce (ou intégrée via le thème).

### B. Cotisations / Adhésions
1. Créer un **produit** par cotisation (Produits → Ajouter)
   - Cocher **« Virtuel »**
   - Catégorie : **Cotisations**
   - Prix + description courte (ex : « Football senior — 1 entraînement/sem + matchs »)
2. Afficher sur une page :
   ```
   [ust_cotisations]
   ```
   → cartes « Adhérer » qui mènent directement au paiement Stripe

### C. Dons (montant libre)
Ajouter sur une page (le produit « Don » est créé automatiquement) :
```
[ust_don montants="10,20,50,100"]
```
→ montants suggérés + champ libre + paiement Stripe sécurisé

---

## Correspondance avec le site existant

| Élément du site statique | Remplacé par |
|---|---|
| Tableau classement dans `football.html` | `[ust_classement id="..."]` |
| Tunnel Stripe simulé dans `boutique.html` | WooCommerce + Stripe (réel) |
| Cotisations espace membre | `[ust_cotisations]` |
| (nouveau) Dons | `[ust_don]` |

---

## Sécurité & bonnes pratiques
- Les deux plugins utilisent les **nonces** WordPress, l'**échappement** des sorties et les **requêtes préparées** (SQL).
- Les paiements ne transitent **jamais** par votre serveur : Stripe gère les données carte (conformité PCI).
- Pensez à tester en **mode test Stripe** (clés `pk_test_` / `sk_test_`) avant de passer en production.

---

## Style
Les affichages front reprennent la charte UST :
`--bleu:#064e89` · `--bleu-clair:#2ea3f2` · `--brun:#8b664b` · police **Poppins**.
Pour ajuster, modifier `assets/classements-front.css` et `assets/paiements-front.css`.
