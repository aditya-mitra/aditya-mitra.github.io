# 02: Character and Hero Scene

**What to build:** The Hero shows the Character, a flat-vector likeness drawn from the Avatar, in front of layered clouds. On pointer devices the Character and cloud layers shift with the cursor; when idle the clouds drift and the Character bobs. On mobile the Character sits above the greeting. Covers stories 13-16 and the Hero decisions.

**Blocked by:** 01

**Status:** ready-for-agent

Spec: `.scratch/portfolio-site/spec.md`. Vocabulary: `GLOSSARY.md`.

- [ ] Character generated from the Avatar (OpenRouter key in the main checkout's .env): short dark quiff, thin moustache, green sweatshirt with cream sleeves, no glasses, no backpack; transparent cutout
- [ ] A second Character expression for Green Mode is generated and committed alongside, ready for ticket 03 to swap in
- [ ] Character served as responsive modern image formats with explicit dimensions; no layout shift
- [ ] Hero Scene is inline SVG, hidden from assistive technology; clouds drift and Character bobs via CSS (transform/opacity only)
- [ ] Cursor parallax between cloud layers and Character on pointer devices only; no eye tracking
- [ ] Idle motion and parallax are off under reduced motion
- [ ] Mobile stacks Character above the greeting; judged by eye from screenshots at both viewports
