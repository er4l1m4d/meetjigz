import Reveal from '../animations/Reveal'
import { fadeIn } from '../animations/variants'
import styles from './ProjectLinks.module.css'

function ProjectLinks({ links }) {
  const realLinks = (links || []).filter(
    (link) => link?.href && link.href !== '#' && link.href.trim() !== '',
  )
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
