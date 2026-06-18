export const DEFAULT_PROJECTS = [
  {
    id: 'alpha',
    title: 'Jigz Wallet UI',
    description: 'A conversion-focused crypto wallet redesign for mobile.',
    tags: ['Design', 'Dev'],
  },
  {
    id: 'beta',
    title: 'Signals Dashboard',
    description: 'Real-time market signal dashboard with custom filters.',
    tags: ['Dev'],
  },
  {
    id: 'gamma',
    title: 'Launch Landing Kit',
    description: 'A reusable launch-page system for token campaigns.',
    tags: ['Design'],
  },
  {
    id: 'delta',
    title: 'Portfolio OS',
    description: 'Desktop-style portfolio experience with draggable windows.',
    tags: ['Design', 'Dev'],
  },
]

export const DEFAULT_ABOUT = {
  bio: "I'm Jigz, a designer and developer focused on building digital experiences that feel polished, intentional, and memorable. I care equally about visual detail and technical execution.",
  skills: [
    'UI/UX Design Systems',
    'Frontend Architecture (React)',
    'Animation & Interaction Design',
    'Brand and Visual Direction',
  ],
  tools: [
    'Figma, Framer, Adobe Suite',
    'React, Vite, Context API',
    'GitHub, Notion, VS Code',
    'After Effects, Blender (light use)',
  ],
  hobbies:
    "I enjoy exploring design trends, analyzing product flows, and building concept UIs. Outside work, I'm into music curation, gaming, and testing new creative tools.",
}

export const DEFAULT_CONTACT = {
  name: 'Jigz',
  role: 'Designer & Developer',
  socials: [
    { id: 'x', label: '@jigz_crypto', href: 'https://x.com/jigz_crypto' },
    { id: 'telegram', label: '@jigz_crypto', href: 'https://t.me/jigz_crypto' },
    { id: 'discord', label: 'Discord', href: 'https://discord.com/' },
  ],
  vcard: [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'FN:Jigz',
    'TITLE:Designer & Developer',
    'URL:https://x.com/jigz_crypto',
    'URL:https://t.me/jigz_crypto',
    'URL:https://discord.com/',
    'END:VCARD',
  ].join('\n'),
}
