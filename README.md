# Tongyao Liu — Personal Website

Personal site built with Astro: English at `/`, Chinese at `/zh/`. Static output, deployed to GitHub Pages.

## Commands

```sh
npm install        # once
npm run dev        # local preview at http://localhost:4321
npm run build      # build into dist/
npm run preview    # serve the built dist/
```

## Where things live

| What | File |
|---|---|
| CV content (education, internships, awards, skills…) | `src/data/cv.ts` — source: `Curriculum_Vitae/存档/v4_20261121` |
| Projects (one file per language) | `src/content/projects/en/*.md`, `src/content/projects/zh/*.md` |
| Interface text (nav, headings, buttons) | `src/i18n/ui.ts` |
| Colours, fonts, spacing | `src/styles/global.css` (`:root` variables) |
| Downloadable CV PDFs | `public/cv/` |
| Profile picture | `src/components/Avatar.astro` (see below) |
| 3D hand in the hero | `src/scripts/hand-scene.ts` |
| Scroll animations | `src/scripts/motion.ts` |
| Project diagrams (until real screenshots exist) | `src/components/ProjectVisual.astro` |

Project frontmatter is schema-checked (`src/content.config.ts`): a missing field fails the build.

## Adding the profile picture

1. Save the square portrait as `public/avatar.webp` (about 800×800).
2. In `src/components/Avatar.astro`, set `const AVATAR = '/avatar.webp';`.

## Updating the CV

1. Copy the new PDFs over `public/cv/Tongyao_Liu_CV_EN.pdf` and `public/cv/Tongyao_Liu_CV_ZH.pdf`.
2. Update the matching entries in `src/data/cv.ts` and, if projects changed, the files in `src/content/projects/`.

## Deploying (GitHub Pages)

1. Create a public GitHub repository named **`cpg25ncu.github.io`** and push this folder to its `main` branch.
2. In the repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Each push to `main` runs `.github/workflows/deploy.yml` and publishes to **https://tongyaoliu.com/**.

### Custom domain

- `tongyaoliu.com` is registered at Cloudflare. DNS (Cloudflare, **DNS only**, not proxied): four `A` records to `185.199.108–111.153`, four `AAAA` records to `2606:50c0:8000–8003::153`, and `www` as a `CNAME` to `cpg25ncu.github.io`.
- The domain is set under the repo's **Settings → Pages → Custom domain**, with **Enforce HTTPS** on. With the GitHub Actions source no `CNAME` file is needed.
- `site` in `astro.config.mjs` must match the domain (canonical URLs, sitemap).
- `cpg25ncu.github.io` and `www.tongyaoliu.com` redirect to `https://tongyaoliu.com/`. Other Pages sites under this account (e.g. `/dormitory-management-system/`) move to the domain too.

## Design notes

- Style references: Linear (type, thin lines, cards), Apple's MacBook Pro page (hero, big numbers, pill buttons) and an Apple-style landing page (scroll storytelling on project pages).
- No Apple or Linear assets, logos, copy or fonts are used. Fonts: Inter and JetBrains Mono (self-hosted via Fontsource), with system CJK fonts.
- Motion respects `prefers-reduced-motion`; every page reads fine without JavaScript.
