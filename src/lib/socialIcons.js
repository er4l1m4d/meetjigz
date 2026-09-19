import {
  At,
  BehanceLogo,
  ChatCircle,
  CodepenLogo,
  DevToLogo,
  DiscordLogo,
  DribbbleLogo,
  Envelope,
  FacebookLogo,
  FigmaLogo,
  GithubLogo,
  GitlabLogo,
  Globe,
  InstagramLogo,
  Link,
  LinkedinLogo,
  MastodonLogo,
  MediumLogo,
  PaperPlaneTilt,
  RedditLogo,
  Rss,
  TelegramLogo,
  ThreadsLogo,
  TiktokLogo,
  TwitchLogo,
  TwitterLogo,
  WhatsappLogo,
  XLogo,
  YoutubeLogo,
} from '@phosphor-icons/react'

// Canonical social/contact icon palette. `key` is what gets stored on
// `social.icon`; Footer renders strictly from this map (no id guessing).
export const SOCIAL_ICONS = [
  { key: 'x', label: 'X', Icon: XLogo, aliases: ['x', 'twitter', 'tweet'] },
  { key: 'twitter', label: 'Twitter', Icon: TwitterLogo, aliases: ['twitter', 'tweet', 'x'] },
  { key: 'github', label: 'GitHub', Icon: GithubLogo, aliases: ['github', 'gh', 'code'] },
  { key: 'telegram', label: 'Telegram', Icon: TelegramLogo, aliases: ['telegram', 'tg'] },
  { key: 'discord', label: 'Discord', Icon: DiscordLogo, aliases: ['discord'] },
  { key: 'linkedin', label: 'LinkedIn', Icon: LinkedinLogo, aliases: ['linkedin', 'in'] },
  { key: 'instagram', label: 'Instagram', Icon: InstagramLogo, aliases: ['instagram', 'ig'] },
  { key: 'dribbble', label: 'Dribbble', Icon: DribbbleLogo, aliases: ['dribbble', 'design'] },
  { key: 'behance', label: 'Behance', Icon: BehanceLogo, aliases: ['behance', 'design', 'portfolio'] },
  { key: 'youtube', label: 'YouTube', Icon: YoutubeLogo, aliases: ['youtube', 'video'] },
  { key: 'twitch', label: 'Twitch', Icon: TwitchLogo, aliases: ['twitch', 'stream', 'video'] },
  { key: 'tiktok', label: 'TikTok', Icon: TiktokLogo, aliases: ['tiktok', 'video', 'shorts'] },
  { key: 'medium', label: 'Medium', Icon: MediumLogo, aliases: ['medium', 'blog', 'writing'] },
  { key: 'devto', label: 'DEV', Icon: DevToLogo, aliases: ['dev', 'devto', 'blog', 'writing'] },
  { key: 'reddit', label: 'Reddit', Icon: RedditLogo, aliases: ['reddit', 'forum'] },
  { key: 'mastodon', label: 'Mastodon', Icon: MastodonLogo, aliases: ['mastodon', 'fediverse'] },
  { key: 'whatsapp', label: 'WhatsApp', Icon: WhatsappLogo, aliases: ['whatsapp', 'chat', 'message'] },
  { key: 'facebook', label: 'Facebook', Icon: FacebookLogo, aliases: ['facebook', 'fb', 'meta'] },
  { key: 'threads', label: 'Threads', Icon: ThreadsLogo, aliases: ['threads', 'meta'] },
  { key: 'gitlab', label: 'GitLab', Icon: GitlabLogo, aliases: ['gitlab', 'code'] },
  { key: 'codepen', label: 'CodePen', Icon: CodepenLogo, aliases: ['codepen', 'code', 'pen'] },
  { key: 'figma', label: 'Figma', Icon: FigmaLogo, aliases: ['figma', 'design'] },
  { key: 'website', label: 'Website', Icon: Globe, aliases: ['website', 'site', 'web', 'globe', 'homepage'] },
  { key: 'email', label: 'Email', Icon: Envelope, aliases: ['email', 'mail', 'envelope', 'contact'] },
  { key: 'link', label: 'Link', Icon: Link, aliases: ['link', 'url'] },
  { key: 'rss', label: 'RSS', Icon: Rss, aliases: ['rss', 'feed', 'blog'] },
  { key: 'chat', label: 'Chat', Icon: ChatCircle, aliases: ['chat', 'message', 'talk'] },
  { key: 'at', label: 'Handle', Icon: At, aliases: ['at', 'handle', 'mention', 'social'] },
  { key: 'newsletter', label: 'Newsletter', Icon: PaperPlaneTilt, aliases: ['newsletter', 'subscribe', 'send', 'plane'] },
]

const byKey = Object.fromEntries(SOCIAL_ICONS.map((entry) => [entry.key, entry]))

export function findSocialIcon(key) {
  if (!key) return null
  return byKey[key] || null
}
