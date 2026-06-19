import { Moon, Sun } from '@phosphor-icons/react'
import { useTheme } from '../context/ThemeContext.jsx'
import styles from './TopBar.module.css'

function TopBar() {
  const { isDark, toggleTheme } = useTheme()

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <span className={styles.brand}>Jigz</span>

      <ul className={styles.links}>
        <li>
          <button type="button" className={styles.link} onClick={() => scrollTo('projects')}>
            Projects
          </button>
        </li>
        <li>
          <button type="button" className={styles.link} onClick={() => scrollTo('about')}>
            About
          </button>
        </li>
        <li>
          <button type="button" className={styles.link} onClick={() => scrollTo('contact')}>
            Contact
          </button>
        </li>
        <li>
          <button type="button" className={styles.themeBtn} onClick={toggleTheme} aria-label="Toggle theme">
            {isDark ? <Sun size={14} weight="fill" /> : <Moon size={14} weight="fill" />}
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default TopBar
