import { Link } from 'react-router-dom'
import Reveal from '../animations/Reveal'
import { fadeIn } from '../animations/variants'
import styles from './CaseStudyNav.module.css'

function CaseStudyNav({ prev, next }) {
  if (!prev && !next) return null

  return (
    <Reveal variant={fadeIn}>
      <nav className={styles.nav}>
        {prev ? (
          <Link to={`/project/${prev.id}`} className={`${styles.link} ${styles.prev}`}>
            <span className={styles.arrow}>←</span>
            <span className={styles.linkContent}>
              <span className={styles.linkLabel}>previous</span>
              <span className={styles.linkTitle}>{prev.title}</span>
            </span>
          </Link>
        ) : <div />}

        {next ? (
          <Link to={`/project/${next.id}`} className={`${styles.link} ${styles.next}`}>
            <span className={styles.linkContent}>
              <span className={styles.linkLabel}>next</span>
              <span className={styles.linkTitle}>{next.title}</span>
            </span>
            <span className={styles.arrow}>→</span>
          </Link>
        ) : <div />}
      </nav>
    </Reveal>
  )
}

export default CaseStudyNav
