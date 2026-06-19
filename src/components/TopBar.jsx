import { useTheme } from '../context/ThemeContext.jsx'
import styles from './TopBar.module.css'

function TopBar() {
  const { toggleTheme } = useTheme()

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <a className={styles.brand} href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          Jigz
        </a>

        <ul className={styles.links}>
          <li>
            <button type="button" className={styles.link} onClick={() => scrollTo('about')}>
              About
            </button>
          </li>
          <li>
            <button type="button" className={`${styles.link} ${styles.isActive}`} onClick={() => scrollTo('works')}>
              Works
            </button>
          </li>
          <li>
            <button type="button" className={styles.link} onClick={() => scrollTo('contact')}>
              Contact
            </button>
          </li>
        </ul>

        <button type="button" className={styles.hireBtn} onClick={() => scrollTo('contact')}>
          Hire Me
        </button>

        <button type="button" className={styles.menuBtn} onClick={toggleTheme} aria-label="Toggle theme">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </nav>
  )
}

export default TopBar
