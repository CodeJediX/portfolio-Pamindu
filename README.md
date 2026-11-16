# Pamindu Karunadasa — Engineering portfolio

[Live portfolio](https://stalwart-fenglisu-eb2115.netlify.app/) · [GitHub profile](https://github.com/CodeJediX) · [LinkedIn](https://www.linkedin.com/in/pamindu-karunadasa)

A curated portfolio covering software, applied AI, hardware, and visual design. A dedicated dataset page links to the published Kaggle collection and preserves original-source attribution. The project case studies explain the problem, implementation, contribution, and scope of each featured project. Midnight Blue and Electric Cyan are the default. The theme switch remembers a visitor’s choice of the light version. A brief introduction on each page load respects reduced motion. Volunteering roles use accessible expandable details, with restrained scroll and hover motion.

## Development

Requires Node.js 22 or newer. The site has **no production or build dependencies**.

```sh
npm run build
npm test
npm run dev
```

Open `http://127.0.0.1:4174`. The preview serves the standalone production output in `dist/`. Run the build again after source changes. `npm run check` builds and runs the structural checks together.

## Structure

| Location | Purpose |
| --- | --- |
| `src/projects.mjs` | Curated project content and profile links |
| `src/profile-updates.mjs` | Additional projects and certifications |
| `src/home.mjs` | Homepage sections and project presentation |
| `src/detail.mjs` | Project-page template |
| `src/evidence.mjs`, `src/github-activity.json` | Research links and dated Kaggle and GitHub snapshots |
| `src/resume.mjs`, `resume/pamindu-karunadasa-resume.pdf` | Printable résumé template and PDF download |
| `src/components.mjs` | Shared document, metadata, navigation, footer, circuit illustration |
| `assets/site.css` | Responsive design tokens and styles |
| `assets/site.js` | Optional menu, filters, and circuit interactions |
| `assets/portfolio.css`, `assets/portfolio.js` | Portfolio layouts, quick search, gallery viewer, and contact form |
| `assets/appearance.css`, `assets/appearance-init.js` | Themes and bounded first-visit preloader |
| `assets/images/` | Optimized original photographs, screenshots, and project artwork |
| `assets/fonts/` | Self-hosted Manrope and IBM Plex Mono, with OFL licenses |
| `scripts/` | Static build and local preview server |
| `tests/` | Structural and optional browser regression checks |
| `docs/` | Audit, content provenance, and verification notes |

Edit the source templates, then run `npm run build`. The build regenerates the committed HTML, robots file, and sitemap. When the résumé changes, use the résumé page’s print action to save a new A4 PDF, and place it in `resume/` before rebuilding.

## Deployment

The repository's existing GitHub Pages configuration publishes `main` from the repository root. The generator writes the committed root pages **and** a clean `dist/` release. This retains the established Pages workflow and supports direct refreshes of every project URL without SPA rewrites. `.nojekyll` avoids unnecessary Jekyll processing.

The quality workflow builds, tests internal destinations and metadata, checks generated output is current, and uploads a `dist/` artifact. GitHub's existing Pages workflow handles publication after a push to `main`.

`dist/` can also be deployed to a static host. If changing the public domain, update `profile.site` in `src/projects.mjs` and rebuild to update canonicals, metadata, sitemap, and 404 navigation. `robots.txt` is served within the project path; on a shared GitHub Pages domain, only an account-root robots file can control the entire hostname. The sitemap remains directly available.

## Browser verification

The browser regression script uses optional development tools, not shipped site dependencies:

```sh
npm install --no-save --package-lock=false playwright @axe-core/playwright
# Start npm run dev in another terminal, then:
node tests/browser.cjs
node tests/appearance.cjs
node tests/spatial.cjs
```

The script uses locally installed Chrome (`channel: chrome`). It checks 320, 390, 768, 1024, 1440, and 1920 px layouts, image loading, project filtering, mobile navigation, keyboard controls, reduced motion, static fallbacks, console errors, page refreshes, and automated WCAG A/AA checks. Artifacts go to ignored `test-results/`. `TEST_URL` can target a deployed base URL; `QA_NODE_MODULES` optionally points at an existing development-tool installation.

## Content policy

Only project-supported technologies and attributable achievements are included. Project pages distinguish prototypes, repository implementation, and verified outcomes. The résumé is built from the same profile and project sources. Direct contact submissions require Netlify Forms detection on the site and a new deploy. When Netlify has not registered the form, the form opens a draft in the visitor’s email app.

Original portfolio content and assets remain available in Git history at `18a7f7a`. See [the audit](docs/AUDIT.md), [research and curation](docs/RESEARCH.md), and [verification](docs/TESTING.md).
