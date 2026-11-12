# Personal Portfolio

Aditya Mitra's single-page portfolio: one scrolling page that introduces him, shows where he has worked, and gives a way to reach him.

## Language

### Page structure

**Frame**:
The black border around the viewport together with the fixed top bar holding the Monogram, the Section Links (desktop only) and the Let's Talk cell.
_Avoid_: Header, navbar

**Section Links**:
The Work, About and Contact cells beside Let's Talk in the top bar, each jumping to its Section. Desktop only.
_Avoid_: Nav, menu

**Section**:
One of the four full-width parts of the page, in order: Hero, Work, About, Contact.
_Avoid_: Page, route, panel

**Scene**:
The illustrated backdrop of a Section, themed on Aditya's career. Every Section has exactly one.
_Avoid_: Background, illustration, artwork

**Toy**:
An optional interactive object inside a Scene that a visitor can play with; the page's content never depends on it.
_Avoid_: Mini-game, widget, easter egg

**Intro**:
The short animated sequence shown before the Hero on a visitor's first arrival in a session.
_Avoid_: Loader, loading sequence, splash (nothing is being loaded)

**Green Mode**:
The alternate look of the whole page, monochrome green, switched by the Mode Toggle.
_Avoid_: Theme, dark mode, gold mode

**Mode Toggle**:
The control that switches Green Mode on and off.
_Avoid_: Theme switch

### Identity

**Monogram**:
The "AM" mark that stands for Aditya in the Frame, the Intro and the footer.
_Avoid_: Logo, icon

**Character**:
The flat-vector illustrated likeness of Aditya that appears in Scenes.
_Avoid_: Avatar (the Avatar is the source picture the Character is drawn from), portrait, mascot

**Avatar**:
The original 3D-rendered picture of Aditya, used as the reference for the Character and as the site's share image.

### Content

**Work Card**:
One employer in the Work Section: a three-letter Code, the company, Aditya's role, dates, a highlight and Tags.
_Avoid_: Project, case study, client, slide

**Code**:
The three-letter abbreviation that identifies a Work Card, e.g. `CTN` for Continue.

**Tag**:
A short label on a Work Card naming a kind of work or technology.
_Avoid_: Skill, badge, chip

**Roster**:
The list of companies and open-source ecosystems Aditya has worked with, shown in the About Section.
_Avoid_: Clients, experience list

**Ticker**:
The scrolling line of Passions beside the scoreboard in the About Section.
_Avoid_: Marquee, awards bar

**Passion**:
A playful title shown in the Ticker, e.g. Open source wizard or Serial bug fixer.
_Avoid_: Honour, award, achievement
