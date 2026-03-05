# الجالية اليمنية | Yemen Students Society Website

## Quick Start
1. Open the folder in VS Code
2. Install "Live Server" extension (by Ritwick Dey)
3. Right-click `index.html` → "Open with Live Server"
4. The website will open in your browser with live reload

**Note:** You need a local server (like Live Server) because the site loads `content.json` via fetch. Double-clicking `index.html` directly won't load the language system properly.

## Project Structure
```
yemen-site/
├── index.html              ← Main page (all sections)
├── css/
│   ├── variables.css       ← Colors, fonts, spacing tokens
│   ├── reset.css           ← Browser reset
│   ├── base.css            ← Typography, body, scrollbar
│   ├── layout.css          ← Containers, grids, sections
│   ├── components.css      ← Navbar, buttons, cards, lightbox
│   ├── sections.css        ← Hero, about, heritage, gallery, etc.
│   ├── animations.css      ← GSAP initial states, keyframes
│   └── responsive.css      ← Mobile/tablet breakpoints
├── js/
│   ├── navigation.js       ← Scroll, smooth scroll, mobile menu
│   ├── language.js         ← Arabic/English toggle (i18n)
│   ├── gallery.js          ← Filter buttons + lightbox
│   ├── animations.js       ← GSAP ScrollTrigger animations
│   └── main.js             ← App init + fallback content
├── data/
│   └── content.json        ← All text in Arabic + English
└── assets/
    ├── logo/logo.jpg       ← Society logo
    ├── images/             ← Add your photos here
    ├── fonts/              ← Custom fonts (if needed)
    └── videos/             ← Video files (if needed)
```

## How to Edit Content
- **Text:** Edit `data/content.json` — all Arabic and English text lives here
- **Colors:** Edit `css/variables.css` — change the palette
- **Photos:** Drop images into `assets/images/`, then update the gallery in `index.html`
- **Team:** Update names/roles in `index.html` team section + `content.json`

## Adding Real Photos to Gallery
Replace the gradient placeholders in `index.html`:
```html
<!-- Before (placeholder) -->
<div class="gallery-item__image" style="...gradient..."></div>

<!-- After (real photo) -->
<img class="gallery-item__image" src="assets/images/sanaa.jpg" alt="Old Sana'a">
```

## Technologies
- **GSAP 3.12** + ScrollTrigger (CDN) — scroll animations
- **Google Fonts** — Amiri, Noto Naskh Arabic, Cormorant Garamond, Lora, Inter
- **Vanilla JS** — no frameworks needed
- **CSS Custom Properties** — easy theming
