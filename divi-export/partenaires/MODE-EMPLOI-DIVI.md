# Intégration Divi — Page Partenaires

Voici la page Partenaires découpée et prête pour Divi. Les images sont sorties du code (fini le base64 de 30 MB !).

---

## Contenu du dossier

```
partenaires/
├── style-global.css        ← le CSS (à mettre UNE fois pour tout le site)
├── script-global.js        ← le JS (menu, etc.)
├── images/                 ← les 11 image(s) de la page (à uploader dans WordPress)
│   ├── img-001.png
│   ├── img-002.png
│   ├── img-003.png
│   ├── img-004.png
│   ├── img-005.png
│   ├── img-006.png
│   ├── img-007.png
│   ├── img-008.png
│   ├── img-009.png
│   ├── img-010.png
│   ├── img-011.png
└── blocs/                  ← les blocs HTML à coller dans des modules Code
    ├── 01-menu.html        ← menu (→ Theme Builder, pas dans la page)
    ├── 02-section-1.html ← NosPartenaires
    ├── 03-section-2.html ← Ils soutiennent le club
    ├── 04-section-3.html ← Devenir partenaire
    ├── 05-section-4.html ← Pourquoi nous rejoindre ?
    ├── 06-section-5.html
    ├── 07-section-6.html ← Devenirpartenaire
    └── 05-footer.html      ← footer (→ Theme Builder, pas dans la page)
```

---

## Étape par étape

### 1️⃣ Uploader les images (une fois)
- WordPress → **Médias → Ajouter** → glisse les fichiers du dossier `images/`
- Pour chaque image, **copie son URL** (ex : `https://tonsite.com/wp-content/uploads/img-001.png`)

### 2️⃣ Remplacer les chemins d'images dans les blocs
Dans les fichiers `.html`, les images sont écrites :
```
{{IMG}}/img-001.png
```
👉 Remplace **`{{IMG}}/img-XXX.png`** par l'URL WordPress complète de cette image.

### 3️⃣ Mettre le CSS global (une seule fois pour tout le site)
- Divi → **Options du thème → Général → CSS personnalisé**
  *(ou Apparence → Personnaliser → CSS additionnel)*
- Colle tout le contenu de **`style-global.css`**
- ⚠️ À ne faire **qu'une fois** — ce CSS sert à toutes les pages

### 4️⃣ Le menu et le footer → dans le Theme Builder
- Divi → **Theme Builder**
- Crée un **En-tête global** → ajoute un module **Code** → colle `01-menu.html`
- Crée un **Pied de page global** → module **Code** → colle `05-footer.html`
- Ainsi le menu/footer s'affichent sur **toutes les pages** automatiquement

### 5️⃣ Le contenu de la page Partenaires
- Édite la page avec Divi
- Pour chaque fichier de section :
  - `02-section-1.html` (NosPartenaires)
  - `03-section-2.html` (Ils soutiennent le club)
  - `04-section-3.html` (Devenir partenaire)
  - `05-section-4.html` (Pourquoi nous rejoindre ?)
  - `06-section-5.html`
  - `07-section-6.html` (Devenirpartenaire)
  - Ajoute une **section** Divi (pleine largeur) → une **ligne** → un module **Code**
  - Colle le contenu du fichier

### 6️⃣ Le JavaScript
- Divi → **Options du thème → Intégration → Corps (body)**
  *(« Add code to the < body >»)*
- Colle le contenu de **`script-global.js`** entre des balises :
  ```html
  <script>
  ... (contenu de script-global.js) ...
  </script>
  ```
- À ne faire **qu'une fois** pour tout le site.

---

## Résumé de ce qui est global (à faire 1 seule fois)
| Élément | Où | Fréquence |
|---|---|---|
| `style-global.css` | Options thème → CSS perso | 1× pour tout le site |
| `script-global.js` | Options thème → body | 1× pour tout le site |
| `01-menu.html` | Theme Builder → en-tête | 1× |
| `05-footer.html` | Theme Builder → pied de page | 1× |

## Par page (à répéter)
| Élément | Où |
|---|---|
| Sections `02`, `03`... | Modules Code dans la page |
| Remplacer `{{IMG}}/...` | Par les URLs WordPress |
