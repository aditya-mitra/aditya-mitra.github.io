# 01: Scaffold tracer: Frame and Hero greeting, tested and deployable

**What to build:** A visitor opens `/` on the production build and sees the base look (flat blue-violet field, black type), the Frame with the Monogram and the "Let's talk" cell, and the Hero greeting with its intro text. The four Sections exist in order as landmarks so later tickets fill them in. Everything the page says comes from one content source. The test seam (production build, served locally, driven by Playwright at a mobile and a desktop viewport) and a Lighthouse mobile run exist and pass, and a push to `main` deploys to GitHub Pages. Covers stories 7-12, 51, 57, 58, 62-65 and the Stack, Page structure, Content source and Delivery decisions.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

Spec: `.scratch/portfolio-site/spec.md`. Vocabulary: `GLOSSARY.md`.

- [ ] Astro static site with bun; plain CSS; Motion installed; no UI framework
- [ ] One content module holds all copy, Work Cards, Roster, Honours, contact links and the optional (unset) booking URL, filled in from the spec and the resume
- [ ] Frame: black viewport border and fixed top bar; Monogram (new "AM" SVG) links to the top; "Let's talk" is a mailto link; no section links
- [ ] Hero shows "HEY!" as the only h1 and the agreed intro text; four Sections render in order as labelled landmarks
- [ ] Self-hosted Latin-subset fonts (Gasoek One, Alumni Sans, a free or system body face) with font-display swap and Hero preloads; fluid clamp() sizing; mobile layout works
- [ ] Visible focus indicator and logical tab order
- [ ] Playwright suite runs against the served production build at mobile and desktop viewports, with one command; includes absence checks (no phone number, no section links in the Frame, no /lab or Services link)
- [ ] Lighthouse mobile-preset script runs against the same served build and reports the four category scores
- [ ] GitHub Actions workflow builds with bun and publishes to Pages on push to main; .env, resume.pdf and pic.webp stay ignored and unpublished
