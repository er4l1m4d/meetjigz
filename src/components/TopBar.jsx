import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext.jsx'
import styles from './TopBar.module.css'

function TopBar() {
  const { toggleTheme } = useTheme()
  const location = useLocation()
  const isArchive = location.pathname === '/archive'
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollTo = (id) => {
    setMenuOpen(false)
    if (isArchive) {
      window.location.href = `/#${id}`
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link to="/" className={styles.name}>
            Jigz
          </Link>
          <span className={styles.separator}>·</span>
          <span className={styles.role}>Full-Stack Developer</span>
          <span className={styles.statusDot} aria-label="Available for work" />
        </div>

        <div className={styles.right}>
          <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
            <li>
              <button type="button" className={styles.link} onClick={() => scrollTo('about')}>
                about
              </button>
            </li>
            <li>
              <button type="button" className={styles.link} onClick={() => scrollTo('works')}>
                works
              </button>
            </li>
            <li>
              <button type="button" className={styles.link} onClick={() => scrollTo('contact')}>
                contact
              </button>
            </li>
            <li>
              <Link to="/archive" className={styles.link} onClick={() => setMenuOpen(false)}>archive</Link>
            </li>
          </ul>

          <button
            type="button"
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M8 1V2.5M8 13.5V15M1 8H2.5M13.5 8H15M3.05 3.05L4.11 4.11M11.89 11.89L12.95 12.95M12.95 3.05L11.89 4.11M4.11 11.89L3.05 12.95" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          <button
            type="button"
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen : ''}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen : ''}`} />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default TopBar
