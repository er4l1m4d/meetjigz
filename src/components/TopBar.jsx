import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext.jsx'
import styles from './TopBar.module.css'

function TopBar() {
  const { toggleTheme } = useTheme()

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      className={styles.nav}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
    >
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

        <motion.button
          type="button"
          className={styles.hireBtn}
          onClick={() => scrollTo('contact')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.15 }}
        >
          let's build
        </motion.button>

        <button type="button" className={styles.menuBtn} onClick={toggleTheme} aria-label="Toggle theme">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </motion.nav>
  )
}

export default TopBar
