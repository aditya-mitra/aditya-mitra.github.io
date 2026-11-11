## Agent skills

### Issue tracker

Issues and specs live as local markdown files under `.scratch/<feature-slug>/`. See `docs/agents/issue-tracker.md`.

### Triage labels

The five default labels: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `GLOSSARY.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.

## Working in this repo

Astro static site, one page at `/`, plain CSS, no UI framework. bun is the package manager. Spec: `.scratch/portfolio-site/spec.md`. Use the vocabulary in `GLOSSARY.md`.

### Commands

| Task | Command |
| --- | --- |
| Install | `bun install` (once per checkout or worktree) |
| Build | `bun run build` (writes `dist/`) |
| Test | `bun run test` (builds, serves `dist/`, runs Playwright at the `mobile` and `desktop` projects) |
| Test without rebuilding | `bun run test:only tests/frame.spec.ts --project=mobile` |
| Lighthouse | `bun run lighthouse` (mobile preset; prints the four scores, fails below 95, report in `test-results/lighthouse.html`) |
| Screenshots | `bun run shots <outDir>` (desktop and mobile, viewport and full page) |
| Dev server | `bun run dev` |

- Tests have one seam: the production build, served by `scripts/serve.mjs`, driven by Playwright. Assert on what a visitor sees or can do, never on class names or component structure.
- The served port is derived from the checkout path (`scripts/port.mjs`), so parallel worktrees do not clash. Set `PORT` to override.
- Do not use `astro preview` or `astro check` in scripts: under agents and CI the first detaches into the background and the second waits for input.
- `@playwright/test` is pinned to 1.57.0 to match the Chromium build already in `~/.cache/ms-playwright`. Lighthouse uses that same Chromium.

### Where things go

| What | Where |
| --- | --- |
| Every word, link and list the page shows | `src/data/site.ts` (the content source; markup hard-codes no copy) |
| Section | `src/components/sections/<Name>.astro` (`Hero`, `Work`, `About`, `Contact`, `Footer`) |
| Scene | `src/components/scenes/<Name>Scene.astro` (already included by its Section; fill in the wrapper) |
| Frame part | `src/components/frame/` (`Frame` arranges `MonogramLink`, `LetsTalk`, `ModeToggle`) |
| Mode Toggle | `src/components/frame/ModeToggle.astro` (empty stub, already included by `Frame`) |
| Intro | `src/components/Intro.astro` (empty stub, already included by the page) |
| Monogram | `src/components/Monogram.astro` (inline SVG, takes the text colour) |
| Head metadata | `src/components/Seo.astro` |
| Colour, type, spacing and z-index tokens | `src/styles/tokens.css` |
| Base styles and shared classes (`.section`, `.scene`, `.on-ink`, `.visually-hidden`) | `src/styles/global.css` |
| Fonts | `public/fonts/` plus `src/styles/fonts.css`; preloads in `src/layouts/Base.astro` |
| Tests | `tests/<feature-area>.spec.ts`, one file per feature area |
| Client script for one feature | `src/scripts/<feature>.ts`, imported from that feature's component |

### Rules that keep parallel work from colliding

- Work inside your own component and your own test file. `src/pages/index.astro`, `Frame.astro`, `Base.astro` and `global.css` already wire everything up; change them only when there is no other way, and keep the change to a line or two.
- Style a component in its own `<style>` block. Add to `global.css` only what several Sections share.
- Never write a raw colour. Use the custom properties in `tokens.css` (`--field`, `--field-hi`, `--field-lo`, `--ink`, `--paper`) and add a token there if you need a new one. Green Mode is `data-mode="green"` on `<html>` and works by overriding those tokens, so SVG fills and strokes must use `var(--token)` or `currentColor` too.
- Each Section is a `<section class="section" aria-label={…label}>` landmark; the labels are `Introduction`, `Work`, `About`, `Contact`. Content placed in a Section sits above its Scene automatically.
- Scenes stay `aria-hidden="true"` and `pointer-events: none`; a Toy re-enables pointer events on its own element only.
- Animate only `transform` and `opacity`, and switch motion off under `prefers-reduced-motion: reduce`.
- `HEY!` is the only `h1`. Section headings are `h2`.
- Fixed elements must clear the Frame: content starts below `var(--frame-top)` and inside `var(--frame-w)`.
- `tests/absence.spec.ts` (no phone number, no `/lab` or Services link, no private files, no third-party requests) must stay green.
- `.env`, `resume.pdf` and `pic.webp` exist only in the main checkout and are git-ignored. Never commit or publish them, or anything in `public/` copied from them unchanged.
