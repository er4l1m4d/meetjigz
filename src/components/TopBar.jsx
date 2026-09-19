import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './TopBar.module.css'

const DEFAULT_NAV_LINKS = [
  { id: 'about', label: 'about' },
  { id: 'stack', label: 'stack' },
  { id: 'works', label: 'works' },
  { id: 'contact', label: 'contact' },
]

function TopBar({ navLinks }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const links = navLinks || DEFAULT_NAV_LINKS

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

          <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
            {links.map((item) => (
              <li key={item.id}>
                <button type="button" className={styles.link} onClick={() => scrollTo(item.id)}>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default TopBar
