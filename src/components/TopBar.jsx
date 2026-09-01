import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './TopBar.module.css'

function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  const scrollTo = (id) => {
    setMenuOpen(false)
    if (!isHome) {
      window.location.assign(`/#${id}`)
      return
    }
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 60
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <nav className={`${styles.nav} ${!isHome ? styles.innerPage : ''}`}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link to="/" className={styles.name}>
            JIGZ<span className={styles.brandDot}>.</span>
          </Link>
        </div>

        <div className={styles.right}>
          <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
            <li>
              <button type="button" className={styles.link} onClick={() => scrollTo('about')}>
                about
              </button>
            </li>
            <li>
              <button type="button" className={styles.link} onClick={() => scrollTo('stack')}>
                stack
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
          </ul>

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
