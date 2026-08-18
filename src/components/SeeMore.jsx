import { useState } from 'react'
import styles from './SeeMore.module.css'

function SeeMore({ children }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={styles.seeMore}>
      <div className={`${styles.content} ${expanded ? styles.expanded : ''}`}>
        <div className={styles.inner}>
          {children}
        </div>
      </div>
      <button
        type="button"
        className={styles.btn}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? 'see less' : 'see more'}
      </button>
    </div>
  )
}

export default SeeMore
