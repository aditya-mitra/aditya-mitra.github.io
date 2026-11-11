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
  /** Public site of the company or project; opens in a new tab. */
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
  },

  frame: {
    monogramLabel: 'Aditya Mitra – back to top',
    letsTalk: { text: "Let's talk", href: `mailto:${email}` },
    skipLink: 'Skip to content',
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
        url: 'https://frontman.sh/',
      },
      {
        code: 'CTN',
        company: 'Continue',
        role: 'Software Engineer',
        dates: 'July 2025 – May 2026',
        highlight:
          'Core maintainer of the open-source Continue VS Code extension and CLI agent; built a multi-agent subagent framework with parallel execution and cross-agent communication.',
        tags: ['Multi-Agent Systems', 'LLM Integration', 'VS Code Extension', 'CLI Agent', 'TypeScript'],
        url: 'https://www.continue.dev/',
      },
      {
        code: 'NAP',
        company: 'Napster / Ethereal Engine',
        role: 'Software Engineer',
        dates: 'July 2023 – June 2025',
        highlight:
          'Built core frontend, backend and platform features for the Ethereal Engine 3D environment: a mobile-ready 3D viewer, the studio file browser, Stripe billing and the shared design system.',
        tags: ['3D Engine', 'Design System', 'Tailwind CSS', 'CI/CD', 'Stripe'],
        url: 'https://www.napster.com/',
      },
      {
        code: 'QCM',
        company: 'Qualcomm',
        role: 'Engineering Intern',
        dates: 'January 2023 – June 2023',
        highlight:
          'Delivered internal analytics dashboards used by 5+ departments and automated raw-data ingestion into MongoDB.',
        tags: ['Flask', 'MongoDB', 'Angular', 'Analytics'],
        url: 'https://www.qualcomm.com/',
      },
      {
        code: 'LMC',
        company: 'LimeChat',
        role: 'Software Engineer',
        dates: 'June 2022 – December 2022',
        highlight:
          'Built the WordPress plugin connecting WooCommerce stores to LimeChat, onboarding 6 new clients, and cut chatbot flow setup effort by 65%.',
        tags: ['WordPress', 'WooCommerce', 'AI Chatbots', 'API Integration'],
        url: 'https://www.limechat.ai/',
      },
      {
        code: 'A4B',
        company: 'AI4Bharat',
        role: 'Research Fellow',
        dates: 'May 2022 – August 2022',
        highlight:
          'Trained transformer-based transliteration models across 8 Indic language pairs and maintained an open-source annotation platform used by about 200 language experts daily.',
        tags: ['Transformers', 'Indic Transliteration', 'Python', 'Open Source'],
        url: 'https://ai4bharat.iitm.ac.in/',
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
  },

  footer: {
    copyright: `© ${new Date().getFullYear()} Aditya Mitra`,
  },
};

export type Site = typeof site;
