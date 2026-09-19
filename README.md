# Pamindu Karunadasa — Engineering portfolio

[Live portfolio](https://codejedix.github.io/portfolio-Pamindu/) · [GitHub profile](https://github.com/CodeJediX) · [LinkedIn](https://www.linkedin.com/in/pamindu-karunadasa)

A curated portfolio covering software, applied AI, hardware, and visual design. Eight static project pages explain the problem, implementation, contribution, and scope of each featured project. Light and dark themes follow the system preference and remember a manual choice. A brief first-visit introduction respects reduced motion.

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
| `src/components.mjs` | Shared document, metadata, navigation, footer, circuit illustration |
| `assets/site.css` | Responsive design tokens and styles |
| `assets/site.js` | Optional menu, filters, and circuit interactions |
| `assets/appearance.css`, `assets/appearance-init.js` | Themes and bounded first-visit preloader |
| `assets/images/` | Optimized original photographs, screenshots, and project artwork |
| `assets/fonts/` | Self-hosted Manrope and IBM Plex Mono, with OFL licenses |
| `scripts/` | Static build and local preview server |
| `tests/` | Structural and optional browser regression checks |
| `docs/` | Audit, content provenance, and verification notes |

Edit the source templates, then run `npm run build`. Do not edit generated `index.html`, `projects/*/index.html`, `404.html`, `robots.txt`, or `sitemap.xml` directly.

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
```

The script uses locally installed Chrome (`channel: chrome`). It checks 320, 390, 768, 1024, 1440, and 1920 px layouts, image loading, project filtering, mobile navigation, keyboard controls, reduced motion, static fallbacks, console errors, page refreshes, and automated WCAG A/AA checks. Artifacts go to ignored `test-results/`. `TEST_URL` can target a deployed base URL; `QA_NODE_MODULES` optionally points at an existing development-tool installation.

## Content policy

Only project-supported technologies and attributable achievements are included. Project pages distinguish prototypes, repository implementation, and verified outcomes. The CV link in the old site requires authentication and is intentionally omitted. Contact uses the publicly provided email address and real profile links, with no simulated form submission.

Original portfolio content and assets remain available in Git history at `18a7f7a`. See [the audit](docs/AUDIT.md), [research and curation](docs/RESEARCH.md), and [verification](docs/TESTING.md).
