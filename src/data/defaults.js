export const FEATURED_ENTRIES = [
  {
    id: 'about',
    kind: 'about',
    title: 'About',
    bio: 'I build digital experiences that live at the intersection of design and technology. Focused on clean interfaces, thoughtful interactions, and products that feel effortless.',
    skills: ['React', 'TypeScript', 'Node.js', 'Figma', 'Motion Design', 'System Design'],
    tools: ['VS Code', 'Figma', 'Git', 'Vercel', 'Linear', 'Notion'],
    hobbies: 'Photography, mechanical keyboards, and exploring new coffee shops.',
  },
  {
    id: 'ciphra',
    kind: 'build',
    title: 'Ciphra',
    status: 'live',
    description: 'Built the data layer first, UI second — forced every visualization to prove itself against real API responses before a single pixel shipped.',
    tags: ['React', 'TypeScript', 'D3.js', 'Node.js'],
    href: '#',
    graphic: 'ciphra-chip',
  },
  {
    id: 'design-1',
    kind: 'design',
    title: 'Brand Identity — Nebula',
    brief: 'Visual identity system for a fintech startup. Needed to feel technical without being cold — the kind of brand that makes spreadsheets feel exciting.',
    images: [
      { src: '/images/placeholder.svg', alt: 'Logo variations on dark and light backgrounds' },
    ],
    tools: ['Figma', 'Illustrator'],
    caseStudy: null,
  },
  {
    id: 'verge',
    kind: 'build',
    title: 'Verge',
    status: 'in-progress',
    description: 'Chose paper-trading over backtesting — real market data, real execution logic, zero financial risk. The gate bar counts live positions.',
    tags: ['Next.js', 'Supabase', 'WebSocket'],
    href: '#',
    graphic: 'verge-gate',
  },
  {
    id: 'design-2',
    kind: 'design',
    title: 'Dashboard UI — Flux',
    brief: 'Redesigned a trading dashboard from 12 panels to 4. The constraint was density without chaos — every pixel had to justify its existence.',
    images: [
      { src: '/images/placeholder.svg', alt: 'Dashboard overview with dark theme' },
    ],
    tools: ['Figma'],
    caseStudy: null,
  },
  {
    id: 'design-3',
    kind: 'design',
    title: 'Mobile App — Orbit',
    brief: 'Crypto portfolio tracker that doesn\'t make you feel like you\'re piloting a spacecraft. Simple hierarchy, clear actions, no jargon.',
    images: [
      { src: '/images/placeholder.svg', alt: 'Mobile app screens showing portfolio view' },
    ],
    tools: ['Figma', 'Protopie'],
    caseStudy: null,
  },
]

export const ARCHIVE_ENTRIES = [
  {
    id: 'archive-1',
    kind: 'build',
    title: 'Pulse',
    status: 'live',
    description: 'Health tracking app that makes complex data feel simple and actionable.',
    tags: ['React Native', 'Node.js', 'PostgreSQL'],
    href: '#',
    graphic: null,
  },
  {
    id: 'archive-2',
    kind: 'design',
    title: 'Icon Set — Prism',
    brief: 'Custom icon set for a developer tools platform. 200+ icons, consistent 24px grid, optimized for small sizes.',
    images: [
      { src: '/images/placeholder.svg', alt: 'Icon grid showing various categories' },
    ],
    tools: ['Illustrator'],
    caseStudy: null,
  },
]

export const DEFAULT_CONTACT = {
  name: 'Jigz',
  role: 'Full-Stack Developer',
  email: 'hello@jigz.dev',
  socials: [
    { id: 'x', label: 'X / Twitter', href: 'https://x.com/jigz_crypto' },
    { id: 'telegram', label: 'Telegram', href: 'https://t.me/jigz_crypto' },
    { id: 'discord', label: 'Discord', href: 'https://discord.com/' },
  ],
}
