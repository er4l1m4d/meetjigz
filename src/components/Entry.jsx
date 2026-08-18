import { Link } from 'react-router-dom'
import styles from './Entry.module.css'

function StatusBadge({ status }) {
  if (!status) return null

  const label = status === 'live' ? 'LIVE' : status === 'in-progress' ? 'IN PROGRESS' : 'SHADOW'
  const dotClass = status === 'live'
    ? styles.dotLive
    : status === 'in-progress'
      ? styles.dotProgress
      : styles.dotShadow

  return (
    <span className={styles.badge}>
      <span className={`${styles.dot} ${dotClass}`} />
      {label}
    </span>
  )
}

function DesignBadge() {
  return (
    <span className={styles.badge}>
      DESIGN
    </span>
  )
}

function Entry({ index, title, status, kind, caseStudyLink, children }) {
  const paddedIndex = String(index).padStart(2, '0')

  return (
    <article className={styles.entry}>
      {kind !== 'about' && (
        <span className={styles.ghostNumeral} aria-hidden="true">{paddedIndex}</span>
      )}

      <div className={styles.divider} />

      <header className={styles.header}>
        <div className={styles.titleRow}>
          <h2 className={styles.title}>{title}</h2>
          {kind === 'design' ? <DesignBadge /> : <StatusBadge status={status} />}
        </div>
      </header>

      <div className={styles.content}>
        {children}
        {caseStudyLink && (
          <Link to={`/project/${caseStudyLink}`} className={styles.caseStudyLink}>
            read case study →
          </Link>
        )}
      </div>
    </article>
  )
}

export default Entry
