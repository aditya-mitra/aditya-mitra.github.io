# Portfolio site: single-page portfolio for Aditya Mitra

Status: ready-for-agent

## Problem Statement

Aditya Mitra has no personal site. People who want to know who he is, where he has worked and how to reach him have only a PDF resume and a LinkedIn profile. He wants a single-page portfolio with the structure and feel of daveholloway.uk (a bold, illustrated, animated, playful one-pager) but about him, fast enough to score 95+ in Lighthouse, and hosted for free on GitHub Pages.

The repository is empty apart from the Avatar (`pic.webp`), the resume (`resume.pdf`, git-ignored), `GLOSSARY.md` and agent configuration. No site code exists.

## Solution

A static one-page site served at `/` on `https://aditya-mitra.github.io/`. It is rebuilt from scratch in the structure and feel of the reference site, using none of the reference's assets, code or copy.

A visitor arrives, sees a short terminal-style Intro, and lands on the Hero, where the Character greets them. Scrolling takes them through four Sections in order (Hero, Work, About, Contact), each with its own animated Scene themed on Aditya's career, and each with something to play with. A Mode Toggle flips the whole page into Green Mode. The page is wrapped in the Frame throughout.

Vocabulary in this spec follows `GLOSSARY.md`.

## User Stories

### Arriving

1. As a first-time visitor, I want a short animated Intro before the page appears, so that the site makes a memorable first impression.
2. As a first-time visitor, I want the Intro to finish in about two seconds, so that I am not kept waiting.
3. As a returning visitor in the same session, I want the Intro skipped, so that I get straight to the content.
4. As a visitor who prefers reduced motion, I want the Intro skipped and the page shown immediately, so that I am not subjected to motion I asked not to see.
5. As a visitor on a slow connection, I want the Hero content to be in the page from the first paint, underneath the Intro, so that the page is ready the moment the Intro clears.
6. As a visitor with JavaScript disabled, I want the full content of the page to be readable with no Intro covering it, so that I am not locked out.

### The Frame

7. As a visitor, I want a black border around the viewport and a fixed top bar, so that the page has the framed, poster-like look of the reference.
8. As a visitor, I want the Monogram in the top bar, so that I always know whose site this is.
9. As a visitor, I want a "Let's talk" cell in the top bar at all times, so that I can start an email from anywhere on the page.
10. As a visitor, I want the top bar to carry no section links, so that it stays minimal.
11. As a visitor, I want the Monogram to take me back to the top of the page, so that I can return to the Hero quickly.

### Hero

12. As a visitor, I want a large "HEY!" greeting with a short introduction to Aditya, so that I learn who he is in one glance.
13. As a visitor, I want to see the Character, a flat-vector likeness of Aditya, so that the site feels personal.
14. As a visitor on desktop, I want the Character and the cloud layers to shift with my cursor, so that the Hero responds to me.
15. As a visitor doing nothing, I want the clouds to drift and the Character to bob gently, so that the page feels alive when idle.
16. As a visitor on mobile, I want the Character above the greeting in a stacked layout, so that both are legible on a narrow screen.

### Work

17. As a recruiter, I want to see every employer Aditya has worked for, newest first, so that I can follow his career.
18. As a recruiter, I want each Work Card to show the company, his role, the dates, a one-line highlight and Tags, so that I can judge relevance quickly.
19. As a visitor, I want each Work Card to carry a large three-letter Code, so that the cards have the bold look of the reference.
20. As a visitor, I want previous and next controls on the Work carousel, so that I can move between Work Cards.
21. As a visitor, I want a counter such as "2/6", so that I know where I am in the set.
22. As a visitor on a touch device, I want to swipe between Work Cards, so that the carousel feels native.
23. As a keyboard user, I want to operate the carousel with the keyboard, so that I can read every Work Card without a mouse.
24. As a visitor, I want a "View work" button on each Work Card that opens the company or project's public site in a new tab, so that I can learn more without losing my place.
25. As a visitor, I want a giant "WORK" heading that moves at a different rate from the Scene as I scroll, so that the Section has depth.
26. As a visitor, I want the Work Scene to show the Character at a desk with small agent-bots carrying tasks around, so that the Scene reflects what Aditya builds.
27. As a visitor doing nothing, I want the Work Scene to keep moving on a loop, so that it feels alive.
28. As a visitor with JavaScript disabled, I want all six Work Cards readable in the page, so that the content does not depend on the carousel.

### About

29. As a visitor, I want a short bio of Aditya, so that I understand his focus and background.
30. As a visitor, I want a Roster of the companies and open-source ecosystems he has worked with, so that I can see the breadth of his experience.
31. As a visitor, I want a Ticker of Honours scrolling beside a scoreboard, so that his recognitions are shown in the playful style of the reference.
32. As a visitor, I want a scroll-driven transition that zooms through a grid tunnel into the About Scene, so that entering the Section feels like an event.
33. As a visitor, I want the About Scene to be a wireframe 3D room, so that it reflects his XR and 3D-engine work.
34. As a visitor, I want something in the About Scene I can drag around, so that I have a Toy to play with.
35. As a visitor who prefers reduced motion, I want the Ticker and the tunnel transition to be still, so that the Section stays comfortable to read.

### Contact

36. As a visitor, I want a curved "READY TO SHIP?" headline, so that the Section echoes the reference's playful sign-off.
37. As a visitor, I want Aditya's email address as the main call to action, so that I can contact him.
38. As a visitor, I want links to his LinkedIn and GitHub profiles, so that I can reach him where I prefer.
39. As a visitor, I want the Contact Scene to be a large mechanical keyboard whose keys I can press, so that I have a Toy to play with.
40. As a visitor, I want my key presses to type out on screen, so that the Toy gives feedback.
41. As a visitor, I want a footer with the Monogram and a copyright line, so that the page has a clear end.
42. As Aditya, I want no phone number anywhere on the site, so that my number is not public.
43. As Aditya, I want a "Book a video call" link to appear only once I have supplied a booking URL, so that there is never a dead link.

### Green Mode

44. As a visitor, I want a Mode Toggle fixed at the bottom of the viewport, so that I can switch looks at any time.
45. As a visitor, I want Green Mode to turn the whole page monochrome green, so that the switch is dramatic.
46. As a visitor, I want the Character to change expression in Green Mode, so that the switch feels like a reward.
47. As a visitor on mobile, I want the Mode Toggle to move into the top bar, so that it does not cover content.
48. As a screen-reader user, I want the Mode Toggle announced as a toggle with its current state, so that I know what it does.

### Interaction and motion in general

49. As a visitor, I want hover and press feedback on every interactive element, so that the page feels responsive.
50. As a visitor, I want Sections to animate into view as I scroll, so that the page unfolds.
51. As a visitor, I want native scrolling, so that scrolling behaves as it does everywhere else on my device.
52. As a visitor who prefers reduced motion, I want idle loops, parallax and scroll-linked animation turned off, so that the page is calm.
53. As a visitor on a low-powered phone, I want Toys to load only when I scroll near them, so that the page stays fast.
54. As a visitor who never touches a Toy, I want to lose nothing, so that the content never depends on play.

### Quality

55. As a visitor on mobile, I want the page to load fast, so that I do not leave before it appears.
56. As Aditya, I want Lighthouse scores of 95 or higher for Performance, Accessibility, Best Practices and SEO on the mobile preset, so that the site meets the bar I set.
57. As a keyboard user, I want a visible focus indicator and a logical tab order, so that I can navigate the whole page.
58. As a screen-reader user, I want one `h1`, a sensible heading order and labelled landmarks, so that I can navigate by structure.
59. As a screen-reader user, I want decorative Scenes hidden from assistive technology, so that I hear only content.
60. As someone sharing the link, I want a title, description and share image, so that the link previews well.
61. As a search engine, I want structured data describing Aditya as a person, so that the site is indexed correctly.

### Ownership

62. As Aditya, I want all copy, Work Cards, Roster, Honours and contact links held in one content source, so that I can edit the site without touching layout.
63. As Aditya, I want the site to deploy to GitHub Pages automatically when I push to `main`, so that publishing takes no manual steps.
64. As Aditya, I want my resume PDF and API key kept out of the repository and the published site, so that private details stay private.
65. As Aditya, I want bun as the package manager, so that the project matches my tooling.

## Implementation Decisions

### Stack

- Astro, static output, no UI framework. Plain CSS.
- bun is the package manager and script runner.
- Motion (motion.dev, vanilla API) for sequenced, scroll-linked and spring animation: the Intro, Section reveals, the tunnel transition, the Work carousel. CSS animation for idle loops (clouds, bob, Ticker, agent-bots). Only `transform` and `opacity` are animated.
- Native scrolling. No smooth-scroll library, no GSAP, no Rive.
- Fonts are self-hosted: Gasoek One for the display greeting and Codes, Alumni Sans for headings and labels, and a free or system face for body text. Latin subset only, with `font-display: swap` and preloading of what the Hero needs.

### Page structure

- One page at `/`. Section order: Hero, Work, About, Contact, then the footer.
- The Frame is a black border around the viewport plus a fixed top bar with the Monogram on the left and the "Let's talk" cell on the right. The cell is a `mailto:` link. There are no section links.
- Every Section has one Scene. Scenes are hand-written inline SVG so that each part can be animated separately, and are hidden from assistive technology.
- Layout is fluid, with type and borders sized by `clamp()` as in the reference. Mobile stacks the Hero (Character above greeting) and moves the Mode Toggle into the top bar.

### Intro

- Terminal style, about 2.2 seconds: a black screen with a blinking block cursor types `> aditya --mitra`; the glyphs collapse into the Monogram; the Monogram flashes blue-violet, green, white; the black clears in horizontal bands from top to bottom; the Hero greeting box lands last.
- Plays once per browser session. Skipped on later loads in the session and when the visitor prefers reduced motion.
- The Hero is rendered in the page from the first paint; the Intro is an overlay. With JavaScript disabled the overlay must not appear.

### Hero

- Greeting: "HEY!". Intro text: "You've arrived at the portfolio of **Aditya Mitra** – a founding engineer building AI agents, multi-agent systems and developer tools in the open. Have a look at where I've worked and a few things I've built." No location.
- The Character is a generated flat-vector likeness drawn from the Avatar: short dark quiff, thin moustache, green sweatshirt with cream sleeves. No glasses and no backpack. It is a transparent cutout with a second expression for Green Mode, served as responsive modern image formats with explicit dimensions.
- Cursor parallax between the cloud layers and the Character on pointer devices; an idle bob and drifting clouds always (unless reduced motion). There is no eye tracking.

### Work

- Six Work Cards, newest first:

| Code | Company | Role | Dates |
| --- | --- | --- | --- |
| `FRM` | Frontman AI | Founding Engineer | June 2026 – Present |
| `CTN` | Continue | Software Engineer | July 2025 – May 2026 |
| `NAP` | Napster / Ethereal Engine | Software Engineer | July 2023 – June 2025 |
| `QCM` | Qualcomm | Engineering Intern | January 2023 – June 2023 |
| `LMC` | LimeChat | Software Engineer | June 2022 – December 2022 |
| `A4B` | AI4Bharat | Research Fellow | May 2022 – August 2022 |

- Each Work Card has a one-line highlight and Tags taken from the resume, a "View work" button that opens the company or project's public site in a new tab, and an "n/6" counter. The implementer looks up the correct public URLs.
- The carousel has previous and next buttons, supports swipe and keyboard, and degrades to a readable list of all six cards without JavaScript.
- Scene: the Character at a desk with small agent-bots carrying tasks, on an idle loop. A giant "WORK" heading has scroll parallax.

### About

- A card with a bio rewritten from the resume's profile summary, and the Roster: Frontman AI, Continue, Napster, Ethereal Engine, Qualcomm, LimeChat, AI4Bharat, Rocket.Chat.
- A scoreboard with the Ticker of Honours: Meta XROS Fellow 2023 (Top 100 of 10,000+), Google Summer of Code 2021, Continue core maintainer, 20+ model providers integrated, B.Tech Computer Science (KIIT).
- Scene: a scroll-linked grid tunnel that zooms into a wireframe 3D room. Toy: a draggable object in the room.

### Contact

- A curved "READY TO SHIP?" headline.
- Links: email `temporaray.ot831@aleeas.com` (spelled exactly so), LinkedIn `linkedin.com/in/aditya--mitra`, GitHub `github.com/aditya-mitra`.
- No phone number. "Book a video call" is rendered only when a booking URL is set in the content source; it is unset for now.
- Scene and Toy: a large mechanical keyboard with pressable keys that type out a message on screen.
- Footer: the Monogram and a copyright line, on black.

### Green Mode

- The base look is one flat saturated blue-violet field with black type and a black Frame. The exact hue is the implementer's choice and must not be the reference's hex.
- The Mode Toggle sits at the bottom centre on desktop and in the top bar on mobile. It is a real toggle button with its state exposed.
- Green Mode recolours the whole page to a monochrome green taken from the Avatar's shirt and swaps the Character's expression. It is driven by one attribute on the root element and CSS custom properties.

### Toys

- One Toy per Scene where agreed (About, Contact), loaded lazily when the Section nears the viewport. No content depends on a Toy.

### Content source

- One content module holds all copy, the Work Cards, the Roster, the Honours, the contact links and the optional booking URL. Layout reads from it; nothing is hard-coded in markup.

### Identity and metadata

- A new "AM" Monogram, drawn as SVG, used in the Frame, the Intro, the footer and the favicon.
- The Avatar is used for the share image.
- Title, description, canonical URL, Open Graph tags and Person structured data.

### Delivery

- Deployed as a user site at `https://aditya-mitra.github.io/` with base path `/`, by a GitHub Actions workflow that builds with bun and publishes to Pages on push to `main`.
- The agent commits locally on `main`. Aditya pushes. The agent does not create remote repositories or push.
- `.env` and `resume.pdf` are git-ignored and never published.

## Testing Decisions

A good test here exercises the site only as a visitor or an auditing tool would: through the built page in a real browser. It asserts on what is visible and operable, never on component structure, class names or animation internals.

There is one seam: **the production build, served locally and driven through a real browser.** The repository has no existing code and so no prior art or existing seams; this seam is new and is the only one.

Through that seam:

- **Browser behaviour**, with Playwright at a mobile and a desktop viewport:
  - All four Sections render in order with the agreed content: the greeting and intro text, six Work Cards with their Codes, the Roster, the Honours in the Ticker, the three contact links.
  - The Intro plays on first arrival, is absent on a second load in the same session, and is absent under reduced motion. The Hero is present in the page while the Intro is showing.
  - The Mode Toggle turns Green Mode on and off and reports its state.
  - The Work carousel moves forward and back by button and by keyboard, and the counter follows.
  - Each "View work" link and each contact link has the right destination; external links open in a new tab.
  - Absence checks: no phone number, no section links in the Frame, no link to `/lab` or to a Services section, no "Book a video call" while the booking URL is unset.
  - With JavaScript disabled, all content is readable and nothing covers it.
- **Lighthouse**, mobile preset, against the same served build: Performance, Accessibility, Best Practices and SEO each 95 or higher.

Not tested automatically: how animations look and feel, and the internals of Scenes and Toys. Those are judged by eye from browser screenshots and recordings during the build, compared against captures of the reference.

## Out of Scope

- Any route other than `/`: no `/lab`, no case-study pages, no sitemap page.
- A Services section.
- The reference's assets, code, copy, exact colours or paid body font.
- A phone number, and a public copy of the resume.
- The booking link, until a URL is supplied.
- A light/dark theme beyond Green Mode.
- Smooth-scroll hijacking, eye tracking on the Character, and Rive or WebGL animation.
- A CMS, analytics, a contact form, or any server-side code.
- A custom domain.
- Creating the GitHub repository or pushing to it.

## Further Notes

- **Reference feel**, observed in a real browser at desktop and mobile sizes. The implementer should look at the reference the same way before building, since feel is the main requirement:
  - Load: a white screen, the logo mark drawing in bar by bar and cycling colour, then a black panel wiping away in columns to reveal the hero, with the greeting box fading in last.
  - Idle: clouds drift, the hero character blinks and follows the cursor, the Work scene character loops a small action.
  - Scroll: a giant section heading with parallax, a grid-tunnel zoom into the About scene, a curved headline leading into Contact.
  - Interaction: side arrows slide carousel cards, a bottom toggle recolours the whole site and changes the character's expression, and each lower scene has something playable.
- The three reference scenes are its owner's hobbies. Aditya's Scenes are themed on his career instead, by his choice.
- A GitHub repository named `aditya-mitra/aditya-mitra.github.io` already exists and is public. Its current contents have not been inspected; Aditya decides what happens to them when he pushes.
- The `gh` CLI on this machine is logged in as a different account from `aditya-mitra`.
- An OpenRouter key is available in `.env` (variable `OPENROUTER_KEY`) for generating the Character. One candidate image was generated during design and has not been reviewed.
- `.scratch/` is committed, so this spec becomes public when the repository is pushed.
- Aditya asked for a browser-based look at the reference and for the implementer to use their own judgment on the build, with load, idle and interaction feel as the priority.
