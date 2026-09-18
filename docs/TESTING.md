# Verification

Test date: 18 September 2026. Production files generated with Node.js 22.18.0 and tested in installed Chrome using Playwright. The evidence files alongside this document record the individual checks.

## Build and structural checks

- `npm run check`: PASS. Eight static HTML pages generated (home, six projects, and 404).
- All local links, fragment destinations, and referenced page assets resolve.
- Unique titles/canonicals, single H1, descriptions, social metadata, structured content, alt text, image dimensions, and safe external-link attributes checked.
- Every featured entry has source evidence and an explicit scope statement.
- Social preview PNG exists. Favicon, sitemap, and robots file generated.
- Optional frontend JavaScript: 3,532 bytes uncompressed.
- Twelve optimized project/profile images: 520,404 bytes combined.
- Complete standalone `dist/` output: approximately 725 KB uncompressed, including all eight pages, shared images, fonts, licenses, CSS/JS, and social preview. This is the entire release, not an initial network-transfer claim.

## Browser checks

See [browser-test-report.json](browser-test-report.json).

| Check | Result |
| --- | --- |
| Homepage at 320, 390, 768, 1024, 1440, 1920 px | PASS: no horizontal overflow, all images load |
| Six project pages at 390 and 1440 px | PASS: load and direct refresh |
| All-work, AI, software, web/design filters | PASS: visible counts 6, 4, 4, 1 |
| Mobile menu | PASS: open/close, Escape, focus return, anchor navigation |
| Circuit illustration | PASS: Enter/Space operate assemble/explode state |
| Reduced motion | PASS: pointer transform disabled |
| JavaScript disabled | PASS: mobile navigation, all six entries, project links |
| Runtime and console errors | None recorded |
| Automated WCAG 2/2.1 A/AA | Zero violations on home (desktop/mobile) and six project pages (desktop) |

Desktop, mobile, and project detail screenshots were visually inspected. Accessibility automation supplements the keyboard and responsive checks; it is not a claim of a formal accessibility certification or exhaustive assistive-technology testing.

## Lighthouse

Local **production build**, mobile preset, Chrome headless, all four requested categories:

| Category | Score |
| --- | ---: |
| Performance | 100 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

An earlier run measured 99/100/100/100. A supplementary accessible-name diagnostic identified visual labels overridden by ARIA; the overrides were removed and the final run measured the values above. Local development serving does not provide the same compression/cache behavior as the public CDN, so these are explicitly local lab scores, not guaranteed field scores. Public deployment verification is performed separately.

## External destinations

See [external-link-report.json](external-link-report.json).

- 15 of 16 unique external destinations returned HTTP 200, including the GitHub repositories, public project sites, demonstration video, and Linktree.
- LinkedIn returns HTTP 999 to automation. The URL is corroborated by the user's Linktree and search-indexed public profile. This is reported as restricted, not asserted to have passed an automated browser check.
- External project sites were checked for reachability. Their camera/model initialization, external backend workflows, and clinical/agricultural outcomes are not certified by this portfolio audit.
- Contact uses `mailto:pamindu39@gmail.com`. No message was sent and no form falsely reports delivery.
- The former resume endpoint returned HTTP 401; the download CTA was omitted.
- The redesign intentionally uses a single editorial theme. There is no theme toggle to test or persist.

## Publication

The existing GitHub Pages deployment publishes the generated root from `main`. The source branch is fast-forwarded only after local checks, and publication is verified against the pushed commit and public pages. CI runs the build and structural checks and ensures the committed generated output matches its templates.
