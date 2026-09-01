import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.bottom}>
          <div className={styles.brand}>JIGZ</div>
          <p className={styles.copyright}>&copy; 2026 Damilare Ogo-Oluwade</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
