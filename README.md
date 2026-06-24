# Portfolio

```
.
├── index.html      # structure + content
├── styles.css      # theming (pastel light/dark), layout, animations
├── script.js       # theme toggle, mobile nav, scroll reveals, scrollspy
├── assets/
│   └── abegail.jpeg # headshot
└── vercel.json     # static config (optional)
```

Roles that cycle in the hero are in `script.js` → the `roles` array. Colors live as
CSS variables at the top of `styles.css` (`--lav`, `--mint`, `--blush`, plus the
light/dark blocks) if you want to shift the palette.

## Deploy to Vercel

**Option A — Vercel CLI (fastest):**
```bash
npm i -g vercel       # once
cd path/to/this/folder
vercel                # follow prompts; accept defaults
vercel --prod         # promote to your production URL
```
Vercel auto-detects this as a static site — no settings needed.

**Option B — GitHub + Vercel dashboard:**
1. Push this folder to a GitHub repo.
2. On vercel.com → **Add New → Project → Import** the repo.
3. Framework preset: **Other** (static). Leave build/output empty. Deploy.

**Option C — drag & drop:** zip this folder and drop it into the Vercel dashboard's
new-project upload.

## Local preview
Just open `index.html` in a browser, or run a tiny server so paths resolve cleanly:
```bash
python3 -m http.server 5173   # then visit http://localhost:5173
```

## Notes
- Theme preference is saved in `localStorage` and falls back to the visitor's
  system setting on first visit.
- Respects `prefers-reduced-motion` — animations switch off for visitors who ask.
- Keyboard accessible with visible focus rings and a skip link.
# portfolio