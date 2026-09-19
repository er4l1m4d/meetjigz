export const FEATURED_ENTRIES = [
  {
    id: 'ciphra',
    kind: 'build',
    title: 'Ciphra',
    status: 'live',
    description: 'Built the data layer first, UI second. Forced every visualization to prove itself against real API responses before a single pixel shipped.',
    tags: ['React', 'TypeScript', 'D3.js', 'Node.js'],
    href: '#',
    graphic: 'ciphra-chip',
    thumbnail: { src: '/images/placeholder.svg', alt: 'Ciphra data visualization dashboard' },
    logo: { src: '/images/logos/ciphra.png', alt: 'Ciphra logo' },
    year: '2025',
    client: 'Personal',
    duration: '4 months',
    order: 1,
    caseStudy: {
      heroImage: { src: '/images/placeholder.svg', alt: 'Ciphra hero screenshot' },
      sections: {
        context: '[Placeholder: Describe the landscape, market, or situation that led to this project.]',
        problem: '[Placeholder: What specific problem needed solving? Who was affected?]',
        role: '[Placeholder: Your specific responsibilities, team context, scope.]',
        thinking: '[Placeholder: Design strategy, technical approach, key decisions.]',
        build: '[Placeholder: Architecture, tech stack choices, implementation details.]',
        challenges: '[Placeholder: What went wrong? What was harder than expected? How did you adapt?]',
        result: '[Placeholder: Outcomes, metrics, lessons learned, impact.]',
      },
      evidence: [
        { src: '/images/placeholder.svg', alt: 'Ciphra screenshot 1', caption: '[Placeholder: caption]' },
      ],
      links: [
        { label: 'Live Site', href: '#' },
        { label: 'GitHub', href: '#' },
      ],
    },
  },
  {
    id: 'verge',
    kind: 'build',
    title: 'Verge',
    status: 'in-progress',
    description: 'Chose paper-trading over backtesting: real market data, real execution logic, zero financial risk. The gate bar counts live positions.',
    tags: ['Next.js', 'Supabase', 'WebSocket'],
    href: '#',
    graphic: 'verge-gate',
    thumbnail: { src: '/images/placeholder.svg', alt: 'Verge prediction market dashboard' },
    logo: { src: '/images/logos/verge.png', alt: 'Verge logo' },
    year: '2025',
    client: 'Personal',
    duration: 'Ongoing',
    order: 3,
    caseStudy: {
      heroImage: { src: '/images/placeholder.svg', alt: 'Verge hero screenshot' },
      sections: {
        context: '[Placeholder: The prediction market landscape and why it matters.]',
        problem: '[Placeholder: Market data from different sources did not align reliably.]',
        role: '[Placeholder: Full-stack ownership: data pipeline, execution engine, UI.]',
        thinking: '[Placeholder: Why paper-trading over backtesting. Why real-time matters.]',
        build: '[Placeholder: Source normalization layer, WebSocket pipeline, gate bar visualization.]',
        challenges: '[Placeholder: Timestamp/strike discrepancies between providers.]',
        result: '[Placeholder: What works, what failed, what you learned.]',
      },
      evidence: [
        { src: '/images/placeholder.svg', alt: 'Verge dashboard', caption: '[Placeholder: dashboard overview]' },
        { src: '/images/placeholder.svg', alt: 'Verge pipeline', caption: '[Placeholder: data pipeline]' },
      ],
      links: [
        { label: 'Live Demo', href: '#' },
        { label: 'GitHub', href: '#' },
      ],
    },
  },
  {
    id: 'design-2',
    kind: 'design',
    title: 'Flux Dashboard UI',
    brief: 'Redesigned a trading dashboard from 12 panels to 4. The constraint was density without chaos: every pixel had to justify its existence.',
    images: [
      { src: '/images/placeholder.svg', alt: 'Dashboard overview with dark theme' },
    ],
    tools: ['Figma'],
    thumbnail: { src: '/images/placeholder.svg', alt: 'Flux dashboard redesign' },
    logo: null,
    year: '2024',
    client: 'Flux',
    duration: '3 weeks',
    order: 4,
    caseStudy: null,
  },
  {
    id: 'design-3',
    kind: 'design',
    title: 'Orbit Mobile App',
    brief: 'Crypto portfolio tracker that doesn\'t make you feel like you\'re piloting a spacecraft. Simple hierarchy, clear actions, no jargon.',
    images: [
      { src: '/images/placeholder.svg', alt: 'Mobile app screens showing portfolio view' },
    ],
    tools: ['Figma', 'Protopie'],
    thumbnail: { src: '/images/placeholder.svg', alt: 'Orbit mobile app' },
    logo: null,
    year: '2024',
    client: 'Orbit',
    duration: '5 weeks',
    order: 5,
    caseStudy: null,
  },
]

export const DEFAULT_HERO = {
  firstName: 'Oluwadamilare',
  lastName: 'Ogo-Oluwade',
  role: 'Web Designer & Developer',
  tagline: 'I build digital products where technology, systems, and interface meet.',
  revealText: 'Who is he?',
  portrait: {
    src: '/images/portrait.png',
    alt: 'Oluwadamilare Ogo-Oluwade, designer and developer',
  },
  ctas: [
    { id: 'work', label: 'View Work', target: 'works' },
    { id: 'contact', label: 'Start a project', target: 'contact' },
  ],
  currentBuild: {
    text: 'Currently building',
    project: 'Verge',
    description: 'prediction market intelligence & paper trading',
  },
}

export const DEFAULT_ABOUT = {
  bio: 'I build digital experiences that live at the intersection of design and technology. Focused on clean interfaces, thoughtful interactions, and products that feel effortless.',
  interests: 'Photography, mechanical keyboards, and exploring new coffee shops.',
  availableFor: ['Full-time roles', 'Freelance projects', 'Open source collaboration'],
  eyebrow: '// Intro',
  statement: "I'm a versatile designer who partners with founders to turn ideas into real products. I focus on clear interfaces, sharp decisions, and fast execution.",
  ctaText: 'See my Work',
}

export const DEFAULT_SKILLS = {
  heading: 'Design meets development.',
  subtext: 'A focused toolkit for turning ambiguous product ideas into clear, usable experiences.',
  categories: [
    {
      id: 'languages',
      label: 'Languages',
      items: [
        { name: 'TypeScript', level: 9, projectIds: ['ciphra', 'verge'] },
        { name: 'JavaScript', level: 9, projectIds: ['ciphra', 'verge'] },
        { name: 'Python', level: 6, projectIds: [] },
      ],
    },
    {
      id: 'frameworks',
      label: 'Frameworks & Libraries',
      items: [
        { name: 'React', level: 9, projectIds: ['ciphra'] },
        { name: 'Next.js', level: 9, projectIds: ['verge'] },
        { name: 'Node.js', level: 9, projectIds: ['ciphra'] },
        { name: 'D3.js', level: 6, projectIds: ['ciphra'] },
        { name: 'Framer Motion', level: 9, projectIds: [] },
      ],
    },
    {
      id: 'design',
      label: 'Design',
      items: [
        { name: 'Figma', level: 9, projectIds: ['design-1', 'design-2', 'design-3'] },
        { name: 'Illustrator', level: 6, projectIds: ['design-1'] },
        { name: 'Prototyping', level: 9, projectIds: ['design-3'] },
      ],
    },
    {
      id: 'tools',
      label: 'Tools & Platforms',
      items: [
        { name: 'Git', level: 9, projectIds: [] },
        { name: 'Vercel', level: 9, projectIds: ['ciphra', 'verge'] },
        { name: 'PostgreSQL', level: 9, projectIds: ['ciphra'] },
        { name: 'Linear', level: 9, projectIds: [] },
      ],
    },
  ],
}

export const DEFAULT_CONTACT = {
  name: 'Jigz',
  role: 'Full-Stack Developer',
  email: 'hello@jigz.dev',
  socials: [
    { id: 'x', label: 'X / Twitter', href: 'https://x.com/jigz_crypto', icon: 'x' },
    { id: 'telegram', label: 'Telegram', href: 'https://t.me/jigz_crypto', icon: 'telegram' },
    { id: 'discord', label: 'Discord', href: 'https://discord.com/', icon: 'discord' },
  ],
}

export const DEFAULT_SETTINGS = {
  navLinks: [
    { id: 'about', label: 'about' },
    { id: 'stack', label: 'stack' },
    { id: 'works', label: 'works' },
    { id: 'contact', label: 'contact' },
  ],
  footerNavLinks: [
    { id: 'about', label: 'About' },
    { id: 'stack', label: 'Stack' },
    { id: 'works', label: 'Works' },
    { id: 'contact', label: 'Contact' },
  ],
  copyright: {
    year: '2026',
    name: 'Damilare Ogo-Oluwade',
    credit: 'designed & built by me',
  },
  works: {
    heading: 'Selected Work',
    subtext: 'Products and identities shaped from first idea to final interface.',
  },
  contactForm: {
    headline: 'Have a project?',
    subhead: 'We would love to help.',
    title: 'Start a project',
    subtitle: "Fill in the form below and I'll be in touch within 24 hours.",
    interestTags: ['UI/UX design', 'Website', 'Branding', 'Design system', 'Other'],
  },
}
