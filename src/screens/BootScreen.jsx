import { useEffect, useState } from 'react'
import styles from './BootScreen.module.css'

const BOOT_DURATION_MS = 2000

function BootScreen({ isExiting = false, onComplete, onExitComplete }) {
  const [progress, setProgress] = useState(0)
  const [showBar, setShowBar] = useState(false)

  useEffect(() => {
    let isMounted = true
    const startTime = Date.now()

    const barTimeout = window.setTimeout(() => {
      if (isMounted) setShowBar(true)
    }, 200)

    const ticker = window.setInterval(() => {
      if (!isMounted) return
      const elapsed = Date.now() - startTime
      setProgress(Math.min((elapsed / BOOT_DURATION_MS) * 100, 100))
    }, 16)

    const done = window.setTimeout(() => {
      if (!isMounted) return
      setProgress(100)
      onComplete?.()
    }, BOOT_DURATION_MS)

    return () => {
      isMounted = false
      clearTimeout(barTimeout)
      clearInterval(ticker)
      clearTimeout(done)
    }
  }, [onComplete])

  return (
    <section
      className={`${styles.screen} ${isExiting ? styles.isExiting : ''}`}
      aria-label="Loading"
      onTransitionEnd={(e) => {
        if (isExiting && e.propertyName === 'opacity') onExitComplete?.()
      }}
    >
      <div className={styles.content}>
        <div
          className={`${styles.progress} ${showBar ? styles.isVisible : ''}`}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
        >
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
      </div>
    </section>
  )
}

export default BootScreen
