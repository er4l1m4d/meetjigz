import { useEffect, useState } from 'react'
import { MagnifyingGlass, Moon, Sun } from '@phosphor-icons/react'
import { useTheme } from '../context/ThemeContext.jsx'
import styles from './TopBar.module.css'

function formatDesktopTime(date) {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  return formatter.format(date).replace(/,/g, '')
}

function TopBar({ onOpenSpotlight }) {
  const { isDark, toggleTheme } = useTheme()
  const [timeLabel, setTimeLabel] = useState(() => formatDesktopTime(new Date()))

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTimeLabel(formatDesktopTime(new Date()))
    }, 1000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [])

  return (
    <header className={`${styles.topBar} glass`} aria-label="Desktop top bar">
      <div className={styles.topBarLeft}>
        <span className={`${styles.dot} ${styles.dotRed}`} />
        <span className={`${styles.dot} ${styles.dotYellow}`} />
        <span className={`${styles.dot} ${styles.dotGreen}`} />
      </div>

      <div className={styles.centerLeft}>
        <button type="button" className={styles.btn} aria-label="Open search" onClick={onOpenSpotlight}>
          <MagnifyingGlass size={16} weight="bold" />
        </button>
      </div>

      <div className={styles.centerRight}>
        <button type="button" className={styles.btn} onClick={toggleTheme} aria-label="Toggle theme">
          {isDark ? <Sun size={16} weight="bold" /> : <Moon size={16} weight="bold" />}
        </button>
      </div>

      <div className={styles.time} aria-live="polite">
        {timeLabel}
      </div>
    </header>
  )
}

export default TopBar
