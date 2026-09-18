# Portfolio audit and redesign

Reviewed 18 September 2026. Baseline: `18a7f7a60f32a4cadae0a60a0fefb967dd79be1b` on `main`.

The original repository contained a single approximately 104 KB HTML document combining all styling, content, and behavior, plus 29 root-level raster assets. There was no build, test suite, component organization, or project documentation. The established Pages site served this file. The Linktree also points to an older Netlify portfolio.

## Findings and decisions

| Area | Finding | Final decision |
| --- | --- | --- |
| Visual identity | Five neon colors, glow, glass effects, a custom cursor, particles, and an unrelated alternate entertainment theme competed with the work. | Rebuild around an editorial engineering language: warm paper, graphite, orange, a quiet grid, and a single circuit illustration. |
| First impression | Full-screen decorative hero, generic rotating role text, and a deliberate two-second preloader delayed understanding. The name was a div rather than an H1. | Immediate static identity, study direction, interests, project CTA, GitHub link, and one H1. |
| Navigation | Dense desktop links and a mobile toggle without accessible disclosure state. Some icon-only links were unnamed or pointed to `#`. | Clear four-item navigation, a real disclosure button, state, Escape handling, focus return, and explicit link names. |
| Projects | Eight projects received roughly equal visual weight. Recent substantial work was missing. Detail views depended on clickable cards and JavaScript modals. | Six curated projects with normal links and complete, independently shareable static pages. Three other hardware/design/application pieces remain in supporting sections. |
| Content accuracy | Car Rental was described as Laravel/React, but its repository contains Java. To-Do linked to a Kotlin repository while describing React. Grocery's published code is frontend-only, despite broader profile claims. Education dates said 2029–2031, contradicting the public LinkedIn education record. | Correct the car-rental description; omit unsupported stacks, precise conflicting dates, broad impact metrics, and unsupported expertise. |
| About and skills | Useful identity and interests mixed with ungrounded win totals and broad technology claims. | Concise undergraduate introduction, research interests clearly framed as interests, and skills connected to real work. |
| Experience | Important activities were present, but minor certificates and long volunteer lists diluted stronger achievements. | Retain the internship, selected competitions, student-community work, INSPIRE, and relevant design activities. |
| Accessibility | Zoom disabled by `maximum-scale=1.0,user-scalable=no`; hidden default cursor; animation without reduced-motion support; clickable project containers; modal focus was not managed. | Normal zoom and cursor, semantic links/buttons, visible focus, skip link, consistent headings, alt text, contrast checks, native disclosure, and reduced motion. |
| Progressive enhancement | Scroll-reveal sections started invisible; essential content and project details depended on JS. | Static visible content and working destinations before any JS runs. Only optional controls are enhanced. |
| Performance | A 6.6 MB decorative GIF, a 5.1 MB alternate portrait, external font/icon requests, repeated animations, and an all-pairs particle connection loop. | Remove the unused large assets and loops; optimize selected images to WebP; self-host fonts; use approximately 4 KB of optional JavaScript. |
| Contact | Public email rendered as text, placeholder Instagram link, and an unnecessarily detailed street address. A keyword chatbot hid the resume link. | Working mailto and verified professional profiles. Retain Sri Lanka as location. Remove fake chat behavior, street-level address, and inaccessible CV. |
| SEO | Basic title, missing description/social metadata, no project URLs, sitemap, or structured profile. | Unique page titles/descriptions/canonicals, OpenGraph and Twitter metadata, PNG social preview, favicon, sitemap, and structured data. |
| Code and hosting | No organized source or checks. Existing GitHub Pages root deployment was available. | Dependency-free Node static generation, shared templates, curated data, isolated CSS/JS, tests, CI, and existing Pages deployment. |

## Preserved information

Name, university, professional direction, contact email, GitHub/LinkedIn identity, original project screenshots, portrait, selected engineering projects, competition recognition, Sampath internship, and ERIC/IEEE/BCS activities informed the rewrite. Waste-Wiz photographs and design experience were deliberately retained because GitHub alone does not capture them.

Original files are recoverable in Git history. Unused root images and unrelated animations were removed from the current version after their content was reviewed; selected images were converted to optimized assets.

## Interaction rationale

The exploded circuit is an abstract illustration of hardware, intelligence, and interface—not a claimed circuit design or research result. Its assemble/explode button explains how the layers relate. CSS perspective adds restrained desktop movement. The illustration has a static SVG fallback, no camera access, no model downloads, no GPU renderer, and no idle animation loop. Reduced-motion and coarse-pointer users receive a stable presentation.

Project filters expose a small set of meaningful categories. The selected state is announced with `aria-pressed`; the result count uses a status region. Project pages avoid modal focus/routing problems and retain direct URL refresh support.
