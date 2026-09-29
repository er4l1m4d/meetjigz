import Reveal from '../animations/Reveal'
import { fadeIn } from '../animations/variants'
import { normalizeExternalHref } from '../../lib/externalHref.js'
import styles from './ProjectLinks.module.css'

function ProjectLinks({ links }) {
  const realLinks = (links || [])
    .map((link) => ({ ...link, href: normalizeExternalHref(link?.href) }))
    .filter((link) => link.href)
  if (realLinks.length === 0) return null

  return (
    <Reveal variant={fadeIn}>
      <div className={styles.links}>
        {realLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={styles.link}
            target="_blank"
            rel="noreferrer noopener"
          >
            {link.label} ↗
          </a>
        ))}
      </div>
    </Reveal>
  )
}

export default ProjectLinks
