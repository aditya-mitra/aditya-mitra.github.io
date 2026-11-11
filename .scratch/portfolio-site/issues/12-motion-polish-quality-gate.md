# 12: Motion polish and quality gate

**What to build:** The finished page unfolds as a visitor scrolls, every interactive element answers hover and press, it stays calm under reduced motion, and it meets the quality bar. Covers stories 49, 50, 52, 55-59 and the Testing decisions.

**Blocked by:** 02, 03, 04, 05, 06, 07, 08, 09, 10, 11

**Status:** ready-for-agent

Spec: `.scratch/portfolio-site/spec.md`. Vocabulary: `GLOSSARY.md`.

- [ ] Sections animate into view on scroll (Motion); hover and press feedback on every interactive element
- [ ] Under reduced motion, idle loops, parallax and scroll-linked animation are all off across the page
- [ ] One h1, sensible heading order, labelled landmarks, all Scenes hidden from assistive technology, visible focus and logical tab order across the whole page
- [ ] With JavaScript disabled, all content is readable and nothing covers it
- [ ] Lighthouse mobile preset: Performance, Accessibility, Best Practices and SEO each 95 or higher, enforced by the script
- [ ] Full Playwright suite green at both viewports; whole-page feel reviewed by eye against the reference captures and rough edges fixed
