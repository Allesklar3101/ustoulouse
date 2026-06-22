# Intégration Divi — Page Contact (TEST)

Voici la page Contact découpée et prête pour Divi. Les images sont sorties du code (fini le base64 de 30 MB !).

---

## Contenu du dossier

```
contact/
├── style-global.css        ← le CSS (à mettre UNE fois pour tout le site)
├── script-global.js        ← le JS (menu, etc.)
├── images/                 ← les 4 images de la page (à uploader dans WordPress)
│   ├── img-001.png  (logo)
│   ├── img-002.png  (logo menu)
│   ├── img-003.png  (photo fond)
│   └── img-004.png  (logo footer)
└── blocs/                  ← les blocs HTML à coller dans des modules Code
    ├── 01-menu.html        ← menu (→ Theme Builder, pas dans la page)
    ├── 02-section-1.html   ← hero
    ├── 03-section-2.html
    ├── 04-section-3.html
    └── 05-footer.html      ← footer (→ Theme Builder, pas dans la page)
```

---

## Étape par étape

### 1️⃣ Uploader les images (une fois)
- WordPress → **Médias → Ajouter** → glisse les 4 fichiers du dossier `images/`
- Pour chaque image, **copie son URL** (ex : `https://tonsite.com/wp-content/uploads/2025/06/img-003.png`)

### 2️⃣ Remplacer les chemins d'images dans les blocs
Dans les fichiers `.html`, les images sont écrites :
```
{{IMG}}/img-003.png
```
👉 Remplace **`{{IMG}}/img-003.png`** par l'URL WordPress complète de cette image.
(Dans TextEdit : menu **Édition → Rechercher → Remplacer**)

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

### 5️⃣ Le contenu de la page Contact
- Édite la page Contact avec Divi
- Pour **chaque** fichier `02-section-1.html`, `03-...`, `04-...` :
  - Ajoute une **section** Divi (pleine largeur) → une **ligne** → un module **Code**
  - Colle le contenu du fichier
- Tu peux aussi tout mettre dans **un seul module Code** (colle les 3 sections à la suite) — plus rapide.

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
| Sections `02`, `03`, `04`... | Modules Code dans la page |
| Remplacer `{{IMG}}/...` | Par les URLs WordPress |

---

✅ **Si cette méthode te convient, je te prépare les 12 autres pages pareil.**
Les blocs font quelques Ko → faciles à ouvrir même dans TextEdit.
