import styles from './CiphraChip.module.css'

function CiphraChip({ className }) {
  return (
    <div className={`${styles.chip} ${className || ''}`}>
      <svg viewBox="0 0 320 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
        {/* Chip body */}
        <rect x="80" y="16" width="160" height="48" rx="4" className={styles.body} />

        {/* Pins left */}
        <line x1="40" y1="28" x2="80" y2="28" className={styles.pin} />
        <line x1="40" y1="40" x2="80" y2="40" className={styles.pin} />
        <line x1="40" y1="52" x2="80" y2="52" className={styles.pin} />

        {/* Pins right */}
        <line x1="240" y1="28" x2="280" y2="28" className={styles.pin} />
        <line x1="240" y1="40" x2="280" y2="40" className={styles.pin} />
        <line x1="240" y1="52" x2="280" y2="52" className={styles.pin} />

        {/* Internal traces */}
        <line x1="100" y1="32" x2="140" y2="32" className={styles.trace} />
        <line x1="140" y1="32" x2="140" y2="48" className={styles.trace} />
        <line x1="140" y1="48" x2="180" y2="48" className={styles.trace} />
        <line x1="180" y1="48" x2="180" y2="36" className={styles.trace} />
        <line x1="180" y1="36" x2="220" y2="36" className={styles.trace} />

        {/* Core dot */}
        <circle cx="160" cy="40" r="6" className={styles.core} />

        {/* Label */}
        <text x="160" y="74" textAnchor="middle" className={styles.label}>CIPHRA</text>
      </svg>
    </div>
  )
}

export default CiphraChip
