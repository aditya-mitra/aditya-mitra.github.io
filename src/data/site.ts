// The content source: every word the page says lives here.
// Components read from this module; nothing is hard-coded in markup.
// Vocabulary follows GLOSSARY.md.

export interface WorkCard {
  /** Three-letter Code shown large on the card. */
  code: string;
  company: string;
  role: string;
  dates: string;
  /** One line, taken from the resume. */
  highlight: string;
  tags: string[];
  /** The project's GitHub repository; opens in a new tab. */
  url: string;
}

export interface ContactLink {
  label: string;
  /** Text shown for the link. */
  text: string;
  href: string;
  /** External links open in a new tab; mailto does not. */
  external: boolean;
}

const email = 'temporaray.ot831@aleeas.com'; // spelled exactly so

export const site = {
  url: 'https://aditya-mitra.github.io/',
  lang: 'en',

  person: {
    name: 'Aditya Mitra',
    firstName: 'Aditya',
    initials: 'AM',
    jobTitle: 'Founding Engineer',
    email,
  },

  meta: {
    title: 'Aditya Mitra – Founding engineer building AI agents',
    description:
      'Portfolio of Aditya Mitra, a founding engineer building AI agents, multi-agent systems and developer tools in the open.',
    // The card shown when the link is shared. Composed from the Avatar by
    // `bun run share-image`; the raw Avatar never enters the repository.
    shareImage: {
      path: '/share.png',
      width: 1200,
      height: 630,
      alt: 'Aditya Mitra, founding engineer building AI agents, beside his avatar',
      tagline: 'Founding engineer building AI agents',
      host: 'aditya-mitra.github.io',
    },
  },

  frame: {
    monogramLabel: 'Aditya Mitra – back to top',
    letsTalk: { text: "Let's talk", href: `mailto:${email}` },
    sectionLinks: {
      label: 'Sections',
      links: [
        { text: 'Work', href: '#work' },
        { text: 'About', href: '#about' },
        { text: 'Contact', href: '#contact' },
      ],
    },
    skipLink: 'Skip to content',
    // The Mode Toggle shows `text`; screen readers hear `text` + `hidden`.
    modeToggle: { text: 'Green', hidden: ' Mode' },
  },

  modeToggle: {
    label: 'Green Mode',
    shortLabel: 'Green',
  },

  intro: {
    command: '> aditya --mitra',
  },

  hero: {
    label: 'Introduction',
    greeting: 'HEY!',
    // Rendered as: before + <strong>name</strong> + after.
    intro: {
      before: "You've arrived at the portfolio of ",
      name: 'Aditya Mitra',
      after:
        " – a founding engineer building AI agents, multi-agent systems and developer tools in the open. Have a look at where I've worked and a few things I've built.",
    },
  },

  work: {
    label: 'Work',
    heading: 'Work',
    viewWork: 'View work',
    previous: 'Previous Work Card',
    next: 'Next Work Card',
    cardsLabel: 'Work Cards',
    tagsLabel: 'Tags',
    // Newest first.
    cards: [
      {
        code: 'FRM',
        company: 'Frontman AI',
        role: 'Founding Engineer',
        dates: 'June 2026 – Present',
        highlight:
          'Leading engineering of an open-source, browser-based AI agent, from system design and backend to agent-driven browser automation.',
        tags: ['AI Agents', 'Browser Automation', 'System Design', 'Open Source'],
        url: 'https://github.com/frontman-ai/frontman',
      },
      {
        code: 'CTN',
        company: 'Continue',
        role: 'Software Engineer',
        dates: 'July 2025 – May 2026',
        highlight:
          'Core maintainer of the open-source Continue VS Code extension and CLI agent; built a multi-agent subagent framework with parallel execution and cross-agent communication.',
        tags: ['Multi-Agent Systems', 'LLM Integration', 'VS Code Extension', 'CLI Agent', 'TypeScript'],
        url: 'https://github.com/continuedev/continue',
      },
      {
        code: 'NAP',
        company: 'Napster / Ethereal Engine',
        role: 'Software Engineer',
        dates: 'July 2023 – June 2025',
        highlight:
          'Built core frontend, backend and platform features for the Ethereal Engine 3D environment: a mobile-ready 3D viewer, the studio file browser, Stripe billing and the shared design system.',
        tags: ['3D Engine', 'Design System', 'Tailwind CSS', 'CI/CD', 'Stripe'],
        url: 'https://github.com/ir-engine/ir-engine',
      },
    ] satisfies WorkCard[],
  },

  about: {
    label: 'About',
    heading: 'About',
    // Rewritten from the resume's profile summary.
    bio: [
      "I'm an engineer who builds agentic AI: LLM-powered products, multi-agent systems and the developer tools around them. Lately that means autonomous agent frameworks with parallel task execution, cross-agent communication and workflow orchestration.",
      'I work end to end, from backend architecture and API integrations to frontend, CI/CD and application security, and I do most of it in the open, in ecosystems such as Continue, Rocket.Chat and Ethereal Engine.',
    ],
    rosterHeading: 'Worked with',
    roster: [
      'Frontman AI',
      'Continue',
      'Napster',
      'Ethereal Engine',
      'Qualcomm',
      'LimeChat',
      'AI4Bharat',
      'Rocket.Chat',
    ],
    honoursHeading: 'Honours',
    honours: [
      'Meta XROS Fellow 2023 (Top 100 of 10,000+)',
      'Google Summer of Code 2021',
      'Continue core maintainer',
      '20+ model providers integrated',
      'B.Tech Computer Science (KIIT)',
    ],
  },

  contact: {
    label: 'Contact',
    heading: 'Ready to ship?',
    links: {
      email: { label: 'Email', text: email, href: `mailto:${email}`, external: false },
      linkedin: {
        label: 'LinkedIn',
        text: 'linkedin.com/in/aditya--mitra',
        href: 'https://www.linkedin.com/in/aditya--mitra/',
        external: true,
      },
      github: {
        label: 'GitHub',
        text: 'github.com/aditya-mitra',
        href: 'https://github.com/aditya-mitra',
        external: true,
      },
    } satisfies Record<string, ContactLink>,
    // "Book a video call" is rendered only when this is set.
    bookingUrl: undefined as string | undefined,
    bookingText: 'Book a video call',
    newTab: '(opens in a new tab)',
    // The keyboard Toy types this out by itself when the Section first comes into view.
    keyboardMessage: "let's ship it",
  },

  footer: {
    copyright: `© ${new Date().getFullYear()} Aditya Mitra`,
  },
};

export type Site = typeof site;
