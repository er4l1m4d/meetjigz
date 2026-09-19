// Heavy catalog: react-icons brand glyphs. Always load this module through
// dynamic import() so it stays in its own async chunk, out of the main bundle.
import {
  SiTypescript, SiJavascript, SiPython, SiGo, SiRust, SiC, SiCplusplus, SiSharp,
  SiSwift, SiKotlin, SiDart, SiHtml5, SiCss,
  SiReact, SiNextdotjs, SiVuedotjs, SiSvelte, SiAngular, SiAstro, SiRemix,
  SiNodedotjs, SiExpress, SiNestjs, SiDeno, SiBun, SiFlutter, SiElectron,
  SiD3, SiThreedotjs, SiFramer, SiGsap, SiTailwindcss, SiShadcnui, SiRadixui,
  SiChakraui, SiMantine, SiBootstrap, SiAntdesign, SiRedux, SiReactquery,
  SiGraphql,
  SiVite, SiJest, SiVitest, SiBabel, SiWebpack, SiEslint, SiPrettier, SiStorybook,
  SiFigma, SiSketch, SiBlender, SiUnity, SiUnrealengine,
  SiGit, SiGithub, SiGitlab, SiBitbucket,
  SiVercel, SiNetlify, SiCloudflare, SiRender, SiRailway, SiNeon,
  SiDocker, SiKubernetes, SiTerraform, SiGooglecloud,
  SiPostgresql, SiMysql, SiSqlite, SiMongodb, SiRedis, SiSupabase, SiFirebase,
  SiPrisma, SiDrizzle, SiElasticsearch, SiRabbitmq,
  SiSanity, SiContentful, SiExpo, SiStripe,
  SiLinear, SiNotion, SiJira, SiObsidian, SiDiscord, SiTelegram, SiX, SiThreads,
  SiAnthropic, SiHuggingface, SiLangchain,
} from 'react-icons/si'
import { DiIllustrator, DiPhotoshop, DiAws, DiHeroku } from 'react-icons/di'
import { normalizeName } from './skillIcons.js'

export const SKILL_ICONS = [
  { key: 'typescript', label: 'TypeScript', aliases: ['ts'], Icon: SiTypescript },
  { key: 'javascript', label: 'JavaScript', aliases: ['js', 'ecmascript', 'es6'], Icon: SiJavascript },
  { key: 'python', label: 'Python', aliases: ['py', 'python3'], Icon: SiPython },
  { key: 'go', label: 'Go', aliases: ['golang'], Icon: SiGo },
  { key: 'rust', label: 'Rust', aliases: [], Icon: SiRust },
  { key: 'c', label: 'C', aliases: [], Icon: SiC },
  { key: 'cpp', label: 'C++', aliases: ['cplusplus'], Icon: SiCplusplus },
  { key: 'csharp', label: 'C#', aliases: ['cs'], Icon: SiSharp },
  { key: 'swift', label: 'Swift', aliases: [], Icon: SiSwift },
  { key: 'kotlin', label: 'Kotlin', aliases: [], Icon: SiKotlin },
  { key: 'dart', label: 'Dart', aliases: [], Icon: SiDart },
  { key: 'html', label: 'HTML', aliases: ['html5'], Icon: SiHtml5 },
  { key: 'css', label: 'CSS', aliases: ['css3'], Icon: SiCss },
  { key: 'react', label: 'React', aliases: ['reactjs'], Icon: SiReact },
  { key: 'nextjs', label: 'Next.js', aliases: ['next'], Icon: SiNextdotjs },
  { key: 'vue', label: 'Vue', aliases: ['vuejs', 'vuedotjs'], Icon: SiVuedotjs },
  { key: 'svelte', label: 'Svelte', aliases: ['sveltekit'], Icon: SiSvelte },
  { key: 'angular', label: 'Angular', aliases: [], Icon: SiAngular },
  { key: 'astro', label: 'Astro', aliases: [], Icon: SiAstro },
  { key: 'remix', label: 'Remix', aliases: [], Icon: SiRemix },
  { key: 'nodejs', label: 'Node.js', aliases: ['node'], Icon: SiNodedotjs },
  { key: 'express', label: 'Express', aliases: ['expressjs'], Icon: SiExpress },
  { key: 'nestjs', label: 'NestJS', aliases: ['nest'], Icon: SiNestjs },
  { key: 'deno', label: 'Deno', aliases: [], Icon: SiDeno },
  { key: 'bun', label: 'Bun', aliases: [], Icon: SiBun },
  { key: 'flutter', label: 'Flutter', aliases: [], Icon: SiFlutter },
  { key: 'electron', label: 'Electron', aliases: [], Icon: SiElectron },
  { key: 'd3', label: 'D3.js', aliases: ['d3js', 'd3dotjs'], Icon: SiD3 },
  { key: 'threejs', label: 'Three.js', aliases: ['three', 'threedotjs'], Icon: SiThreedotjs },
  { key: 'framer', label: 'Framer Motion', aliases: ['framermotion', 'motion'], Icon: SiFramer },
  { key: 'gsap', label: 'GSAP', aliases: [], Icon: SiGsap },
  { key: 'tailwind', label: 'Tailwind CSS', aliases: ['tailwindcss'], Icon: SiTailwindcss },
  { key: 'shadcn', label: 'shadcn/ui', aliases: ['shadcnui'], Icon: SiShadcnui },
  { key: 'radix', label: 'Radix UI', aliases: ['radixui'], Icon: SiRadixui },
  { key: 'chakra', label: 'Chakra UI', aliases: ['chakraui'], Icon: SiChakraui },
  { key: 'mantine', label: 'Mantine', aliases: [], Icon: SiMantine },
  { key: 'bootstrap', label: 'Bootstrap', aliases: [], Icon: SiBootstrap },
  { key: 'antd', label: 'Ant Design', aliases: ['antdesign'], Icon: SiAntdesign },
  { key: 'redux', label: 'Redux', aliases: [], Icon: SiRedux },
  { key: 'reactquery', label: 'React Query', aliases: ['tanstackquery', 'tanstack'], Icon: SiReactquery },
  { key: 'graphql', label: 'GraphQL', aliases: ['gql'], Icon: SiGraphql },
  { key: 'vite', label: 'Vite', aliases: [], Icon: SiVite },
  { key: 'jest', label: 'Jest', aliases: [], Icon: SiJest },
  { key: 'vitest', label: 'Vitest', aliases: [], Icon: SiVitest },
  { key: 'babel', label: 'Babel', aliases: [], Icon: SiBabel },
  { key: 'webpack', label: 'Webpack', aliases: [], Icon: SiWebpack },
  { key: 'eslint', label: 'ESLint', aliases: [], Icon: SiEslint },
  { key: 'prettier', label: 'Prettier', aliases: [], Icon: SiPrettier },
  { key: 'storybook', label: 'Storybook', aliases: [], Icon: SiStorybook },
  { key: 'figma', label: 'Figma', aliases: ['figjam'], Icon: SiFigma },
  { key: 'sketch', label: 'Sketch', aliases: [], Icon: SiSketch },
  { key: 'illustrator', label: 'Illustrator', aliases: ['adobeillustrator', 'ai'], Icon: DiIllustrator },
  { key: 'photoshop', label: 'Photoshop', aliases: ['adobephotoshop', 'ps'], Icon: DiPhotoshop },
  { key: 'blender', label: 'Blender', aliases: [], Icon: SiBlender },
  { key: 'unity', label: 'Unity', aliases: [], Icon: SiUnity },
  { key: 'unreal', label: 'Unreal Engine', aliases: ['unrealengine'], Icon: SiUnrealengine },
  { key: 'git', label: 'Git', aliases: [], Icon: SiGit },
  { key: 'github', label: 'GitHub', aliases: [], Icon: SiGithub },
  { key: 'gitlab', label: 'GitLab', aliases: [], Icon: SiGitlab },
  { key: 'bitbucket', label: 'Bitbucket', aliases: [], Icon: SiBitbucket },
  { key: 'vercel', label: 'Vercel', aliases: [], Icon: SiVercel },
  { key: 'netlify', label: 'Netlify', aliases: [], Icon: SiNetlify },
  { key: 'cloudflare', label: 'Cloudflare', aliases: ['cf'], Icon: SiCloudflare },
  { key: 'render', label: 'Render', aliases: [], Icon: SiRender },
  { key: 'railway', label: 'Railway', aliases: [], Icon: SiRailway },
  { key: 'neon', label: 'Neon', aliases: ['neondatabase'], Icon: SiNeon },
  { key: 'heroku', label: 'Heroku', aliases: [], Icon: DiHeroku },
  { key: 'aws', label: 'AWS', aliases: ['amazonwebservice', 'amazon'], Icon: DiAws },
  { key: 'gcp', label: 'Google Cloud', aliases: ['googlecloud', 'googlecloudplatform'], Icon: SiGooglecloud },
  { key: 'docker', label: 'Docker', aliases: [], Icon: SiDocker },
  { key: 'kubernetes', label: 'Kubernetes', aliases: ['k8s'], Icon: SiKubernetes },
  { key: 'terraform', label: 'Terraform', aliases: [], Icon: SiTerraform },
  { key: 'postgresql', label: 'PostgreSQL', aliases: ['postgres', 'psql'], Icon: SiPostgresql },
  { key: 'mysql', label: 'MySQL', aliases: [], Icon: SiMysql },
  { key: 'sqlite', label: 'SQLite', aliases: [], Icon: SiSqlite },
  { key: 'mongodb', label: 'MongoDB', aliases: ['mongo'], Icon: SiMongodb },
  { key: 'redis', label: 'Redis', aliases: [], Icon: SiRedis },
  { key: 'supabase', label: 'Supabase', aliases: [], Icon: SiSupabase },
  { key: 'firebase', label: 'Firebase', aliases: [], Icon: SiFirebase },
  { key: 'prisma', label: 'Prisma', aliases: [], Icon: SiPrisma },
  { key: 'drizzle', label: 'Drizzle', aliases: ['drizzleorm'], Icon: SiDrizzle },
  { key: 'elasticsearch', label: 'Elasticsearch', aliases: ['elastic'], Icon: SiElasticsearch },
  { key: 'rabbitmq', label: 'RabbitMQ', aliases: ['rabbit'], Icon: SiRabbitmq },
  { key: 'sanity', label: 'Sanity', aliases: [], Icon: SiSanity },
  { key: 'contentful', label: 'Contentful', aliases: [], Icon: SiContentful },
  { key: 'expo', label: 'Expo', aliases: [], Icon: SiExpo },
  { key: 'stripe', label: 'Stripe', aliases: [], Icon: SiStripe },
  { key: 'linear', label: 'Linear', aliases: [], Icon: SiLinear },
  { key: 'notion', label: 'Notion', aliases: [], Icon: SiNotion },
  { key: 'jira', label: 'Jira', aliases: [], Icon: SiJira },
  { key: 'obsidian', label: 'Obsidian', aliases: [], Icon: SiObsidian },
  { key: 'discord', label: 'Discord', aliases: [], Icon: SiDiscord },
  { key: 'telegram', label: 'Telegram', aliases: ['tg'], Icon: SiTelegram },
  { key: 'x', label: 'X / Twitter', aliases: ['twitter'], Icon: SiX },
  { key: 'threads', label: 'Threads', aliases: [], Icon: SiThreads },
  { key: 'anthropic', label: 'Anthropic', aliases: ['claude'], Icon: SiAnthropic },
  { key: 'huggingface', label: 'Hugging Face', aliases: ['hf'], Icon: SiHuggingface },
  { key: 'langchain', label: 'LangChain', aliases: [], Icon: SiLangchain },
]

const LOOKUP = new Map()
for (const entry of SKILL_ICONS) {
  LOOKUP.set(entry.key, entry)
  for (const alias of entry.aliases) {
    const n = normalizeName(alias)
    if (!LOOKUP.has(n)) LOOKUP.set(n, entry)
  }
}

export function findSkillIcon(key) {
  return LOOKUP.get(normalizeName(key)) || null
}

export function resolveSkillIcon(skill) {
  if (skill.icon) {
    const explicit = findSkillIcon(skill.icon)
    if (explicit) return explicit.Icon
  }
  const auto = LOOKUP.get(normalizeName(skill.name))
  return auto ? auto.Icon : null
}
