import styles from './VergeGate.module.css'

function VergeGate({ count = 0, className }) {
  const bars = Array.from({ length: 8 }, (_, i) => i)

  return (
    <div className={`${styles.gate} ${className || ''}`}>
      <svg viewBox="0 0 320 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
        {/* Gate frame */}
        <rect x="20" y="8" width="280" height="36" rx="2" className={styles.frame} />

        {/* Gate bars */}
        {bars.map((i) => {
          const x = 40 + i * 32
          const isActive = i < count
          return (
            <rect
              key={i}
              x={x}
              y="14"
              width="16"
              height="24"
              rx="1"
              className={`${styles.bar} ${isActive ? styles.barActive : ''}`}
            />
          )
        })}

        {/* Label */}
        <text x="160" y="56" textAnchor="middle" className={styles.label}>
          VERGE — {count} positions
        </text>
      </svg>
    </div>
  )
}

export default VergeGate
