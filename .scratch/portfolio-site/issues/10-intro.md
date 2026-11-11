# 10: Intro

**What to build:** On first arrival in a session a visitor sees the terminal-style Intro for about 2.2 seconds, then the Hero. It is skipped on later loads in the session, under reduced motion, and never appears without JavaScript. Covers stories 1-6 and the Intro decisions.

**Blocked by:** 01

**Status:** resolved

Spec: `.scratch/portfolio-site/spec.md`. Vocabulary: `GLOSSARY.md`.

- [x] Sequence as specified: typed `> aditya --mitra` with block cursor, glyphs collapse into the Monogram, colour flash, black clears in horizontal bands, Hero greeting box lands last; built with Motion
- [x] The Hero is in the page from first paint beneath the overlay
- [x] Plays once per browser session; skipped under reduced motion; overlay absent with JavaScript disabled; no flash of uncovered Hero before the Intro starts
- [x] Playwright: Intro present on first arrival with Hero in the page, absent on second load in the session, absent under reduced motion, absent with JS disabled; existing tests remain stable
