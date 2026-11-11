# 04: Work Cards and carousel

**What to build:** A visitor reaches the Work Section and moves through six Work Cards, newest first, by previous/next buttons, swipe or keyboard, with an n/6 counter. Each card shows its Code, company, role, dates, highlight, Tags and a "View work" link. Without JavaScript all six cards are readable. Covers stories 17-24, 28 and the Work decisions.

**Blocked by:** 01

**Status:** resolved

Spec: `.scratch/portfolio-site/spec.md`. Vocabulary: `GLOSSARY.md`.

- [x] Six Work Cards from the content source with the Codes, roles and dates in the spec; highlights and Tags from the resume
- [x] "View work" opens the correct public site for each company or project in a new tab (URLs looked up and verified)
- [x] Carousel moves by buttons, swipe and keyboard; counter follows; slide animation uses Motion
- [x] Without JavaScript the cards degrade to a readable list of all six
- [x] Playwright: six cards and Codes present; forward/back by button and by keyboard with counter; link destinations and new-tab behaviour; no-JS readability
