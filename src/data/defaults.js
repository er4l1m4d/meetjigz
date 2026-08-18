export const FEATURED_ENTRIES = [
  {
    id: 'ciphra',
    kind: 'build',
    title: 'Ciphra',
    status: 'live',
    description: 'Built the data layer first, UI second — forced every visualization to prove itself against real API responses before a single pixel shipped.',
    tags: ['React', 'TypeScript', 'D3.js', 'Node.js'],
    href: '#',
    graphic: 'ciphra-chip',
    thumbnail: { src: '/images/placeholder.svg', alt: 'Ciphra data visualization dashboard' },
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
    id: 'design-1',
    kind: 'design',
    title: 'Brand Identity — Nebula',
    brief: 'Visual identity system for a fintech startup. Needed to feel technical without being cold — the kind of brand that makes spreadsheets feel exciting.',
    images: [
      { src: '/images/placeholder.svg', alt: 'Logo variations on dark and light backgrounds' },
    ],
    tools: ['Figma', 'Illustrator'],
    thumbnail: { src: '/images/placeholder.svg', alt: 'Nebula brand identity' },
    year: '2024',
    client: 'Nebula',
    duration: '6 weeks',
    order: 2,
    caseStudy: {
      heroImage: { src: '/images/placeholder.svg', alt: 'Nebula brand hero' },
      sections: {
        context: '[Placeholder]',
        problem: '[Placeholder]',
        role: '[Placeholder]',
        thinking: '[Placeholder]',
        build: '[Placeholder: Design system, brand guidelines, deliverables.]',
        challenges: '[Placeholder]',
        result: '[Placeholder]',
      },
      evidence: [
        { src: '/images/placeholder.svg', alt: 'Brand overview', caption: '[Placeholder]' },
      ],
      links: [
        { label: 'Brand Guidelines', href: '#' },
      ],
    },
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
    thumbnail: { src: '/images/placeholder.svg', alt: 'Verge prediction market dashboard' },
    year: '2025',
    client: 'Personal',
    duration: 'Ongoing',
    order: 3,
    caseStudy: {
      heroImage: { src: '/images/placeholder.svg', alt: 'Verge hero screenshot' },
      sections: {
        context: '[Placeholder: The prediction market landscape and why it matters.]',
        problem: '[Placeholder: Market data from different sources did not align reliably.]',
        role: '[Placeholder: Full-stack ownership — data pipeline, execution engine, UI.]',
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
    title: 'Dashboard UI — Flux',
    brief: 'Redesigned a trading dashboard from 12 panels to 4. The constraint was density without chaos — every pixel had to justify its existence.',
    images: [
      { src: '/images/placeholder.svg', alt: 'Dashboard overview with dark theme' },
    ],
    tools: ['Figma'],
    thumbnail: { src: '/images/placeholder.svg', alt: 'Flux dashboard redesign' },
    year: '2024',
    client: 'Flux',
    duration: '3 weeks',
    order: 4,
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
    thumbnail: { src: '/images/placeholder.svg', alt: 'Orbit mobile app' },
    year: '2024',
    client: 'Orbit',
    duration: '5 weeks',
    order: 5,
    caseStudy: null,
  },
]

export const DEFAULT_HERO = {
  name: 'Damilare Ogo-Oluwade',
  role: 'Designer + Developer',
  tagline: 'I build digital products where technology, systems, and interface meet.',
  ctas: [
    { id: 'work', label: 'View Work', target: 'works' },
    { id: 'contact', label: 'Contact', target: 'contact' },
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
}

export const DEFAULT_SKILLS = {
  categories: [
    {
      id: 'languages',
      label: 'Languages',
      items: [
        { name: 'TypeScript', proficiency: 'daily-driver', projectIds: ['ciphra', 'verge'] },
        { name: 'JavaScript', proficiency: 'daily-driver', projectIds: ['ciphra', 'verge'] },
        { name: 'Python', proficiency: 'comfortable', projectIds: [] },
      ],
    },
    {
      id: 'frameworks',
      label: 'Frameworks & Libraries',
      items: [
        { name: 'React', proficiency: 'daily-driver', projectIds: ['ciphra'] },
        { name: 'Next.js', proficiency: 'daily-driver', projectIds: ['verge'] },
        { name: 'Node.js', proficiency: 'daily-driver', projectIds: ['ciphra'] },
        { name: 'D3.js', proficiency: 'comfortable', projectIds: ['ciphra'] },
        { name: 'Framer Motion', proficiency: 'daily-driver', projectIds: [] },
      ],
    },
    {
      id: 'design',
      label: 'Design',
      items: [
        { name: 'Figma', proficiency: 'daily-driver', projectIds: ['design-1', 'design-2', 'design-3'] },
        { name: 'Illustrator', proficiency: 'comfortable', projectIds: ['design-1'] },
        { name: 'Prototyping', proficiency: 'daily-driver', projectIds: ['design-3'] },
      ],
    },
    {
      id: 'tools',
      label: 'Tools & Platforms',
      items: [
        { name: 'Git', proficiency: 'daily-driver', projectIds: [] },
        { name: 'Vercel', proficiency: 'daily-driver', projectIds: ['ciphra', 'verge'] },
        { name: 'PostgreSQL', proficiency: 'daily-driver', projectIds: ['ciphra'] },
        { name: 'Linear', proficiency: 'daily-driver', projectIds: [] },
      ],
    },
  ],
}

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
