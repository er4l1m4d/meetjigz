import styles from './ProjectVisual.module.css'

function SignalBoard({ title, accent = 'lime' }) {
  return (
    <div className={`${styles.visual} ${styles.signal} ${styles[accent]}`} aria-hidden="true">
      <span className={styles.ghostInitial}>{title.charAt(0)}</span>
      <span className={styles.rings} />
      <svg className={styles.wave} viewBox="0 0 420 150" preserveAspectRatio="none">
        <path d="M0 130 C48 115 64 125 98 86 C131 48 160 98 199 69 C239 39 272 62 305 34 C345 2 365 25 420 5" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
      </svg>
      <span className={styles.orb} />
    </div>
  )
}

function BrandBoard({ title }) {
  return (
    <div className={`${styles.visual} ${styles.brandBoard}`} aria-hidden="true">
      <div className={styles.brandWord}>{title.split(' ')[0]}</div>
      <div className={styles.orbit}>
        <span /><span /><span />
        <strong>{title.charAt(0)}</strong>
      </div>
      <div className={styles.swatches}><i /><i /><i /><i /></div>
    </div>
  )
}

function PrismBoard() {
  return (
    <div className={`${styles.visual} ${styles.prismBoard}`} aria-hidden="true">
      <div className={styles.tileBack} />
      <div className={styles.tileFront} />
    </div>
  )
}

function ProjectVisual({ entry, compact = false }) {
  const className = `${styles.frame} ${compact ? styles.compact : ''}`
  if (entry.kind === 'design' && entry.id === 'design-1') {
    return <div className={className}><BrandBoard title={entry.title} /></div>
  }
  if (entry.kind === 'design') {
    return <div className={className}><PrismBoard /></div>
  }
  return <div className={className}><SignalBoard title={entry.title} accent={entry.id === 'verge' ? 'yellow' : 'lime'} /></div>
}

export default ProjectVisual
