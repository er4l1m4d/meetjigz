import styles from './ProjectVisual.module.css'

function DashboardVisual({ title, accent = 'lime' }) {
  return (
    <div className={`${styles.visual} ${styles.dashboard}`} aria-hidden="true">
      <div className={styles.appBar}>
        <span className={styles.appMark}>{title.slice(0, 1)}</span>
        <span>{title}</span>
        <span className={styles.live}>live</span>
      </div>
      <div className={styles.dashboardBody}>
        <div className={styles.sideRail}>
          <span /><span /><span /><span />
        </div>
        <div className={styles.chartPanel}>
          <div className={styles.metricRow}>
            <strong>42.8</strong>
            <small>signal score</small>
          </div>
          <svg className={styles.chart} viewBox="0 0 420 150" preserveAspectRatio="none">
            <path d="M0 130 C48 115 64 125 98 86 C131 48 160 98 199 69 C239 39 272 62 305 34 C345 2 365 25 420 5" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
          </svg>
          <div className={styles.chartLines}><span /><span /><span /></div>
        </div>
        <div className={`${styles.dataPanel} ${styles[accent]}`}>
          <small>active model</small>
          <strong>REAL-TIME</strong>
          <div className={styles.miniBars}><span /><span /><span /><span /><span /></div>
        </div>
      </div>
    </div>
  )
}

function BrandVisual({ title }) {
  return (
    <div className={`${styles.visual} ${styles.brandBoard}`} aria-hidden="true">
      <div className={styles.brandWord}>{title.split(' ')[0]}</div>
      <div className={styles.orbit}>
        <span /><span /><span />
        <strong>N</strong>
      </div>
      <div className={styles.swatches}><i /><i /><i /><i /></div>
      <p>IDENTITY / SYSTEM / MOTION</p>
    </div>
  )
}

function MobileVisual({ title }) {
  return (
    <div className={`${styles.visual} ${styles.mobileBoard}`} aria-hidden="true">
      <div className={styles.phoneBack}>
        <span>{title}</span>
        <div className={styles.phoneChart} />
      </div>
      <div className={styles.phoneFront}>
        <span className={styles.phoneNotch} />
        <small>Portfolio</small>
        <strong>$24,860</strong>
        <div className={styles.phoneGraph} />
        <div className={styles.phoneRows}><i /><i /><i /></div>
      </div>
    </div>
  )
}

function ProjectVisual({ entry, compact = false }) {
  const className = `${styles.frame} ${compact ? styles.compact : ''}`
  if (entry.kind === 'design' && entry.id === 'design-1') {
    return <div className={className}><BrandVisual title={entry.title} /></div>
  }
  if (entry.kind === 'design') {
    return <div className={className}><MobileVisual title={entry.title} /></div>
  }
  return <div className={className}><DashboardVisual title={entry.title} accent={entry.id === 'verge' ? 'yellow' : 'lime'} /></div>
}

export default ProjectVisual
