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
          jigz
        </a>

        <ul className={styles.links}>
          <li>
            <button type="button" className={styles.link} onClick={() => scrollTo('about')}>
              my works
            </button>
          </li>
          <li>
            <button type="button" className={`${styles.link} ${styles.isActive}`} onClick={() => scrollTo('works')}>
              about me
            </button>
          </li>
          <li>
            <button type="button" className={styles.link} onClick={() => scrollTo('contact')}>
              contact
            </button>
          </li>
        </ul>

        <button type="button" className={styles.hireBtn} onClick={() => scrollTo('contact')}>
          let's build
        </button>

        <button type="button" className={styles.menuBtn} onClick={toggleTheme} aria-label="Toggle theme">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </nav>
  )
}

export default TopBar
