# 03: Green Mode and the Mode Toggle

**What to build:** A visitor presses the Mode Toggle and the whole page turns monochrome green, with the Character changing expression; pressing again restores the base look. Covers stories 44-48 and the Green Mode decisions.

**Blocked by:** 01, 02

**Status:** ready-for-agent

Spec: `.scratch/portfolio-site/spec.md`. Vocabulary: `GLOSSARY.md`.

- [ ] Mode Toggle is a real toggle button exposing its pressed state; fixed bottom centre on desktop, in the top bar on mobile
- [ ] Green Mode is driven by one attribute on the root element and CSS custom properties; green is taken from the Avatar's shirt
- [ ] Every Section, the Frame and the footer recolour; Character swaps to its Green Mode expression
- [ ] Playwright: the toggle turns Green Mode on and off and reports its state, at both viewports
