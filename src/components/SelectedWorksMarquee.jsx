import SelectedWorkCard from './SelectedWorkCard.jsx'
import styles from './SelectedWorksMarquee.module.css'

function cloneArray(arr, n) {
  return [...Array(n)].flatMap(() => arr)
}

export default function SelectedWorksMarquee({ entries }) {
  const duplicated = cloneArray(entries, 2)

  return (
    <div className={styles.marqueeRoot}>
      <div className={styles.marqueeTrack}>
        {duplicated.map((entry, i) => (
          <div
            key={`${entry.id}-${i}`}
            className={styles.marqueeCard}
            aria-hidden={i >= entries.length}
          >
            <SelectedWorkCard entry={entry} />
          </div>
        ))}
      </div>
      <div className={styles.edgeLeft} aria-hidden="true" />
      <div className={styles.edgeRight} aria-hidden="true" />
    </div>
  )
}
