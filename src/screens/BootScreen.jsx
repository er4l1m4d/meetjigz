import { useEffect, useState } from 'react'
import styles from './BootScreen.module.css'

const BOOT_LINES = [
  'Initializing Jigz OS...',
  'Loading system files... OK',
  'Mounting portfolio... OK',
  'Establishing connection... OK',
  'Welcome.',
]

const LINE_INTERVAL_MS = 1100
const BOOT_END_PAUSE_MS = 1200
const LINE_FADE_OUT_MS = 220
const TOTAL_BOOT_TIME_MS = BOOT_LINES.length * LINE_INTERVAL_MS

function BootScreen({ isExiting = false, onComplete, onExitComplete }) {
  const [currentLineIndex, setCurrentLineIndex] = useState(-1)
  const [isLineVisible, setIsLineVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let isMounted = true
    const bootStartTime = Date.now()

    const lineShowSchedule = BOOT_LINES.map((_, index) =>
      window.setTimeout(() => {
        if (!isMounted) {
          return
        }

        setCurrentLineIndex(index)
        setIsLineVisible(true)
      }, (index + 1) * LINE_INTERVAL_MS),
    )

    const lineFadeOutSchedule = BOOT_LINES.slice(0, -1).map((_, index) =>
      window.setTimeout(() => {
        if (!isMounted) {
          return
        }

        setIsLineVisible(false)
      }, (index + 2) * LINE_INTERVAL_MS - LINE_FADE_OUT_MS),
    )

    const progressTicker = window.setInterval(() => {
      if (!isMounted) {
        return
      }

      const elapsedTime = Date.now() - bootStartTime
      const nextProgress = Math.min((elapsedTime / TOTAL_BOOT_TIME_MS) * 100, 100)
      setProgress(nextProgress)
    }, 16)

    const completionTimeout = window.setTimeout(() => {
      if (!isMounted) {
        return
      }

      setProgress(100)

      if (typeof onComplete === 'function') {
        onComplete()
      }
    }, TOTAL_BOOT_TIME_MS + BOOT_END_PAUSE_MS)

    return () => {
      isMounted = false
      lineShowSchedule.forEach((timeoutId) => window.clearTimeout(timeoutId))
      lineFadeOutSchedule.forEach((timeoutId) => window.clearTimeout(timeoutId))
      window.clearInterval(progressTicker)
      window.clearTimeout(completionTimeout)
    }
  }, [onComplete])

  return (
    <section
      className={`${styles.screen} ${isExiting ? styles.isExiting : ''}`}
      aria-label="Boot sequence"
      onTransitionEnd={(event) => {
        if (!isExiting || event.propertyName !== 'opacity') {
          return
        }

        if (typeof onExitComplete === 'function') {
          onExitComplete()
        }
      }}
    >
      <div className={styles.content}>
        <div className={styles.terminal}>
          <p className={`${styles.line} ${isLineVisible ? styles.isVisible : ''}`}>
            {currentLineIndex >= 0 ? BOOT_LINES[currentLineIndex] : '\u00A0'}
          </p>
        </div>

        <div className={styles.progress} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
      </div>
    </section>
  )
}

export default BootScreen
